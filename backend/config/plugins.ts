export default {
  'users-permissions': {
    enabled: true,
  },
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250mb
      // Windows'ta Sharp EPERM sorununu çözmek için responsive formatları devre dışı bırak
      breakpoints: {},
    },
  },
};
