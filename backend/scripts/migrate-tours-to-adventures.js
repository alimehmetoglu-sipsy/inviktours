/**
 * Migration script to copy all tours to adventures
 * This script fetches all tours and creates corresponding adventures
 */

const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Component name mappings from tour to adventure
const COMPONENT_MAP = {
  'tour.hero-section': 'adventure.hero-section',
  'tour.info-cards-section': 'adventure.info-cards-section',
  'tour.timeline-section': 'adventure.timeline-section',
  'tour.gallery-section': 'adventure.gallery-section',
  'tour.pricing-section': 'adventure.pricing-section',
  'tour.contact-form-section': 'adventure.contact-form-section',
};

async function fetchTours() {
  try {
    console.log('Fetching all tours...');
    const response = await axios.get(`${STRAPI_URL}/api/tours`, {
      params: {
        populate: {
          contentSections: {
            on: {
              'tour.hero-section': {
                populate: ['backgroundImage', 'heroVideo'],
              },
              'tour.info-cards-section': {
                populate: ['cards'],
              },
              'tour.timeline-section': {
                populate: ['items'],
              },
              'tour.gallery-section': {
                populate: {
                  images: {
                    populate: ['image'],
                  },
                },
              },
              'tour.pricing-section': {
                populate: ['includedItems', 'excludedItems'],
              },
              'tour.contact-form-section': {
                populate: '*',
              },
            },
          },
        },
      },
    });

    console.log(`Found ${response.data.data.length} tours`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tours:', error.message);
    throw error;
  }
}

function cleanObject(obj) {
  const cleaned = { ...obj };
  delete cleaned.id;
  delete cleaned.createdAt;
  delete cleaned.updatedAt;
  delete cleaned.publishedAt;
  return cleaned;
}

function transformContentSection(section) {
  if (!section || !section.__component) {
    return null;
  }

  const newComponent = COMPONENT_MAP[section.__component];
  if (!newComponent) {
    console.warn(`Unknown component type: ${section.__component}`);
    return null;
  }

  // Start with component type
  const transformed = {
    __component: newComponent,
  };

  // Handle different component types
  switch (section.__component) {
    case 'tour.hero-section':
      transformed.title = section.title;
      transformed.subtitle = section.subtitle;
      transformed.buttonText = section.buttonText;
      if (section.backgroundImage?.id) {
        transformed.backgroundImage = section.backgroundImage.id;
      }
      if (section.heroVideo?.id) {
        transformed.heroVideo = section.heroVideo.id;
      }
      break;

    case 'tour.info-cards-section':
      if (section.cards && Array.isArray(section.cards)) {
        transformed.cards = section.cards.map(card => ({
          icon: card.icon,
          label: card.label,
          value: card.value,
        }));
      }
      break;

    case 'tour.timeline-section':
      transformed.title = section.title;
      if (section.items && Array.isArray(section.items)) {
        transformed.items = section.items.map(item => ({
          icon: item.icon,
          day: item.day,
          description: item.description,
        }));
      }
      break;

    case 'tour.gallery-section':
      transformed.title = section.title;
      if (section.images && Array.isArray(section.images)) {
        transformed.images = section.images.map(img => ({
          image: img.image?.id || img.image,
          alt: img.alt,
        }));
      }
      break;

    case 'tour.pricing-section':
      transformed.title = section.title;
      transformed.includedTitle = section.includedTitle;
      transformed.excludedTitle = section.excludedTitle;
      transformed.price = section.price;
      transformed.currency = section.currency;
      transformed.priceLabel = section.priceLabel;
      transformed.buttonText = section.buttonText;

      if (section.includedItems && Array.isArray(section.includedItems)) {
        transformed.includedItems = section.includedItems.map(item => ({
          text: item.text,
          isIncluded: item.isIncluded,
        }));
      }

      if (section.excludedItems && Array.isArray(section.excludedItems)) {
        transformed.excludedItems = section.excludedItems.map(item => ({
          text: item.text,
          isIncluded: item.isIncluded,
        }));
      }
      break;

    case 'tour.contact-form-section':
      transformed.title = section.title;
      transformed.nameLabel = section.nameLabel;
      transformed.emailLabel = section.emailLabel;
      transformed.phoneLabel = section.phoneLabel;
      transformed.messageLabel = section.messageLabel;
      transformed.buttonText = section.buttonText;
      break;

    default:
      console.warn(`Unhandled component type: ${section.__component}`);
      return null;
  }

  return transformed;
}

async function createAdventure(tour) {
  try {
    console.log(`\nCreating adventure: ${tour.title}`);

    // Transform content sections
    const transformedSections = tour.contentSections
      ?.map(section => transformContentSection(section))
      .filter(section => section !== null) || [];

    const adventureData = {
      data: {
        title: tour.title,
        slug: tour.slug,
        subtitle: tour.subtitle,
        contentSections: transformedSections,
        publishedAt: new Date().toISOString(), // Publish immediately
      },
    };

    const response = await axios.post(
      `${STRAPI_URL}/api/adventures`,
      adventureData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`✓ Successfully created adventure: ${tour.title}`);
    return response.data;
  } catch (error) {
    console.error(`✗ Error creating adventure "${tour.title}":`, error.response?.data || error.message);
    if (error.response?.data?.error?.details) {
      console.error('Details:', JSON.stringify(error.response.data.error.details, null, 2));
    }
    throw error;
  }
}

async function migrate() {
  try {
    console.log('Starting migration from tours to adventures...\n');

    // Fetch all tours
    const tours = await fetchTours();

    if (tours.length === 0) {
      console.log('No tours found to migrate.');
      return;
    }

    // Create adventures from tours
    let successCount = 0;
    let errorCount = 0;

    for (const tour of tours) {
      try {
        await createAdventure(tour);
        successCount++;
      } catch (error) {
        errorCount++;
        // Continue with next tour even if one fails
      }
    }

    console.log('\n=================================');
    console.log('Migration completed!');
    console.log(`✓ Successfully created: ${successCount} adventures`);
    if (errorCount > 0) {
      console.log(`✗ Failed: ${errorCount} adventures`);
    }
    console.log('=================================\n');

  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrate();
