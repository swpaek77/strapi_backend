module.exports = ({ env }) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'smtp.gmail.com', //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      username: 'aaapro00011@gmail.com',
      password: process.env.STRAPI_PASSWORD,
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'swpaek77@gmail.com',
      replyTo: 'swpaek77@gmail.com',
      defaultFrom: 'PSWOO <swpaek77@gmail.com>',
      defaultReplyTo: 'PSWOO <swpaek77@gmail.com>',
    },
  },
});
