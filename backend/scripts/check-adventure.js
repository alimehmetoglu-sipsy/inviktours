const axios = require('axios');
const qs = require('qs');

const slug = process.argv[2] || 'gurcistan-incileri-tiflis-kazbegi-batumi';

const query = qs.stringify({
  filters: {
    slug: {
      $eq: slug
    }
  },
  populate: {
    contentSections: {
      on: {
        'adventure.hero-section': {
          populate: ['backgroundImage', 'heroVideo']
        },
        'adventure.info-cards-section': {
          populate: ['cards']
        },
        'adventure.timeline-section': {
          populate: ['items']
        },
        'adventure.gallery-section': {
          populate: {
            images: {
              populate: ['image']
            }
          }
        },
        'adventure.pricing-section': {
          populate: ['includedItems', 'excludedItems']
        },
        'adventure.contact-form-section': {
          populate: '*'
        }
      }
    }
  }
}, { encodeValuesOnly: true });

axios.get(`http://localhost:1337/api/adventures?${query}`)
  .then(res => {
    const data = res.data.data[0];
    if (!data) {
      console.log('Adventure not found!');
      return;
    }

    console.log('Adventure found:', data.title);
    console.log('Slug:', data.slug);
    console.log('Content sections count:', data.contentSections?.length || 0);

    if (data.contentSections) {
      console.log('\nContent sections:');
      data.contentSections.forEach((section, index) => {
        console.log(`  ${index + 1}. ${section.__component}`);
      });
    } else {
      console.log('\nNo content sections found!');
    }

    console.log('\nFull data:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => console.error('Error:', err.message));
