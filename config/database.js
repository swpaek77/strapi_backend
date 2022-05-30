module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', process.env.STRAPI_DATABASE),
        username: env('DATABASE_USERNAME', process.env.STRAPI_USERNAME),
        password: env('DATABASE_PASSWORD', process.env.STRAPI_PASSWORD),
        ssl: env.bool('DATABASE_SSL', false),
        timezone: 'Asia/Seoul',
      },
      options: {},
    },
  },
});
