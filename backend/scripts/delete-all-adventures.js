const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

async function deleteAllAdventures() {
  try {
    console.log('Fetching all adventures...');
    const response = await axios.get(`${STRAPI_URL}/api/adventures`);
    const adventures = response.data.data;

    console.log(`Found ${adventures.length} adventures to delete\n`);

    for (const adventure of adventures) {
      try {
        console.log(`Deleting: ${adventure.title}`);
        await axios.delete(`${STRAPI_URL}/api/adventures/${adventure.documentId}`);
        console.log(`✓ Deleted: ${adventure.title}`);
      } catch (error) {
        console.error(`✗ Failed to delete ${adventure.title}:`, error.message);
      }
    }

    console.log('\n=================================');
    console.log('All adventures deleted!');
    console.log('=================================\n');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteAllAdventures();
