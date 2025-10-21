const axios = require('axios');
const qs = require('qs');

const slug = 'gurcistan-incileri-tiflis-kazbegi-batumi';

const query = qs.stringify({
  filters: {
    slug: {
      $eq: slug
    }
  },
  populate: {
    contentSections: {
      on: {
        'tour.hero-section': {
          populate: ['backgroundImage', 'heroVideo']
        },
        'tour.info-cards-section': {
          populate: ['cards']
        },
        'tour.timeline-section': {
          populate: ['items']
        },
        'tour.gallery-section': {
          populate: {
            images: {
              populate: ['image']
            }
          }
        },
        'tour.pricing-section': {
          populate: ['includedItems', 'excludedItems']
        },
        'tour.contact-form-section': {
          populate: '*'
        }
      }
    }
  }
}, { encodeValuesOnly: true });

axios.get(`http://localhost:1337/api/tours?${query}`)
  .then(res => {
    const data = res.data.data[0];
    console.log('Tour content sections:');
    console.log(JSON.stringify(data.contentSections, null, 2));
  })
  .catch(err => console.error('Error:', err.message));
