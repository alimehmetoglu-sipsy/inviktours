export default {
  routes: [
    {
      method: 'GET',
      path: '/home',
      handler: 'home.find',
    },
    {
      method: 'PUT',
      path: '/home',
      handler: 'home.update',
    },
  ],
};
