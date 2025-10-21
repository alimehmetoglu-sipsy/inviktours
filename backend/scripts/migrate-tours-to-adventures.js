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

function transformContentSection(section) {
  if (!section || !section.__component) {
    return null;
  }

  const newComponent = COMPONENT_MAP[section.__component];
  if (!newComponent) {
    console.warn(`Unknown component type: ${section.__component}`);
    return null;
  }

  // Create a clean copy without Strapi metadata
  const transformed = {
    __component: newComponent,
    ...section,
  };

  // Remove Strapi-specific fields
  delete transformed.id;
  delete transformed.createdAt;
  delete transformed.updatedAt;

  // Transform nested components (cards, items, etc.)
  if (transformed.cards && Array.isArray(transformed.cards)) {
    transformed.cards = transformed.cards.map(card => {
      const cleanCard = { ...card };
      delete cleanCard.id;
      delete cleanCard.createdAt;
      delete cleanCard.updatedAt;
      return cleanCard;
    });
  }

  if (transformed.items && Array.isArray(transformed.items)) {
    transformed.items = transformed.items.map(item => {
      const cleanItem = { ...item };
      delete cleanItem.id;
      delete cleanItem.createdAt;
      delete cleanItem.updatedAt;
      return cleanItem;
    });
  }

  if (transformed.images && Array.isArray(transformed.images)) {
    transformed.images = transformed.images.map(img => {
      const cleanImg = { image: img.image?.id, alt: img.alt };
      return cleanImg;
    });
  }

  if (transformed.includedItems && Array.isArray(transformed.includedItems)) {
    transformed.includedItems = transformed.includedItems.map(item => {
      const cleanItem = { ...item };
      delete cleanItem.id;
      delete cleanItem.createdAt;
      delete cleanItem.updatedAt;
      return cleanItem;
    });
  }

  if (transformed.excludedItems && Array.isArray(transformed.excludedItems)) {
    transformed.excludedItems = transformed.excludedItems.map(item => {
      const cleanItem = { ...item };
      delete cleanItem.id;
      delete cleanItem.createdAt;
      delete cleanItem.updatedAt;
      return cleanItem;
    });
  }

  // Handle media fields (backgroundImage, heroVideo)
  if (transformed.backgroundImage?.id) {
    transformed.backgroundImage = transformed.backgroundImage.id;
  }
  if (transformed.heroVideo?.id) {
    transformed.heroVideo = transformed.heroVideo.id;
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
