export default ({ env }) => {
  if (env('DATABASE_CLIENT') === 'postgres') {
    // PostgreSQL Configuration
    return {
      connection: {
        client: 'postgres',
        connection: env('DATABASE_URL') || {
          host: env('DATABASE_HOST', '127.0.0.1'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'inviktours'),
          user: env('DATABASE_USERNAME', 'strapi'),
          password: env('DATABASE_PASSWORD', 'strapipass123'),
          ssl: env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
        debug: false,
        pool: {
          min: 0,
          max: 10,
        },
      },
    };
  }

  // Development - SQLite
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};
