/**
 * Format date for URL-friendly slug (DD-MM-YYYY)
 */
function formatDateForSlug(dateInput) {
  if (!dateInput) return null;

  try {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
}

/**
 * Generate slug from adventure slug and start date
 */
function generateSlug(adventureSlug, startDate) {
  let slug = '';

  // Use adventure slug directly (already in slug format)
  if (adventureSlug) {
    slug = adventureSlug;
  }

  if (startDate) {
    // Format date for URL (DD-MM-YYYY)
    const dateStr = formatDateForSlug(startDate);
    if (dateStr) {
      slug = slug ? `${slug}-${dateStr}` : `tour-${dateStr}`;
    }
  }

  return slug || `tour-${Date.now()}`;
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    console.log('=== TOUR LIFECYCLE: beforeCreate ===');
    console.log('Data received:', JSON.stringify(data, null, 2));

    // Always generate slug if empty
    if (!data.slug) {
      try {
        let adventureSlug = null;

        // Get adventure slug if adventure is selected
        if (data.adventure) {
          console.log('Adventure detected:', data.adventure);

          // Handle connect format from Strapi v5
          const adventureId = data.adventure.connect?.[0]?.id ||
                            data.adventure.connect?.[0] ||
                            data.adventure;

          console.log('Adventure ID:', adventureId);

          if (adventureId) {
            // Get adventure slug
            let adventure = await strapi.documents('api::adventure.adventure').findOne({
              documentId: adventureId,
              fields: ['slug']
            });

            adventureSlug = adventure?.slug;
            console.log('Adventure slug found:', adventureSlug);
          }
        }

        // Generate the slug using adventure slug and start date
        data.slug = generateSlug(adventureSlug, data.startDate);
        console.log('Generated slug:', data.slug);

      } catch (error) {
        console.error('Error in beforeCreate:', error);
        // Fallback: use timestamp-based slug
        data.slug = `tour-${Date.now()}`;
      }
    }

    console.log('Final slug:', data.slug);
    console.log('=== END beforeCreate ===\n');
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    console.log('=== TOUR LIFECYCLE: beforeUpdate ===');
    console.log('Data received:', JSON.stringify(data, null, 2));

    // Only generate if slug is explicitly empty
    if (data.slug === null || data.slug === '') {
      try {
        let adventureSlug = null;

        if (data.adventure) {
          const adventureId = data.adventure.connect?.[0]?.id ||
                            data.adventure.connect?.[0] ||
                            data.adventure;

          if (adventureId) {
            let adventure = await strapi.documents('api::adventure.adventure').findOne({
              documentId: adventureId,
              fields: ['slug']
            });

            adventureSlug = adventure?.slug;
          }
        }

        data.slug = generateSlug(adventureSlug, data.startDate);
        console.log('Generated slug:', data.slug);

      } catch (error) {
        console.error('Error in beforeUpdate:', error);
        data.slug = `tour-${Date.now()}`;
      }
    }

    console.log('=== END beforeUpdate ===\n');
  },
};
