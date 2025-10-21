export default {
  routes: [
    {
      method: 'GET',
      path: '/adventures',
      handler: 'adventure.find',
    },
    {
      method: 'GET',
      path: '/adventures/:documentId',
      handler: 'adventure.findOne',
    },
    {
      method: 'POST',
      path: '/adventures',
      handler: 'adventure.create',
    },
    {
      method: 'PUT',
      path: '/adventures/:documentId',
      handler: 'adventure.update',
    },
    {
      method: 'DELETE',
      path: '/adventures/:documentId',
      handler: 'adventure.delete',
    },
  ],
};
