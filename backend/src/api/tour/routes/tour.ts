export default {
  routes: [
    {
      method: 'GET',
      path: '/tours',
      handler: 'tour.find',
    },
    {
      method: 'GET',
      path: '/tours/:documentId',
      handler: 'tour.findOne',
    },
    {
      method: 'POST',
      path: '/tours',
      handler: 'tour.create',
    },
    {
      method: 'PUT',
      path: '/tours/:documentId',
      handler: 'tour.update',
    },
    {
      method: 'DELETE',
      path: '/tours/:documentId',
      handler: 'tour.delete',
    },
  ],
};
