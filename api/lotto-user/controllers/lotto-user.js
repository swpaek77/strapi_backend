const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const crypto = require('crypto');
const AUTH_KEY = 'SW_GENIUS_GOD_LEVEL_19910703_LOVE';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  GetToken: async (ctx) => {
    // const { data, files } = parseMultipartData(ctx);

    // console.log(data);
    // console.log(files);

    // ctx.request.body to get your params.
    // ctx.params to get url params
    // ctx.query to get url queries

    try {
      console.log(ctx.request.body);
      console.log(ctx.params);
      console.log(ctx.query);

      const ReqBody = ctx.request.body;

      if (!ReqBody.UniqueId || !ReqBody.UniqueIdCrypto || !ReqBody.FCMToken || !ReqBody.Device) {
        ctx.send({ result: 'ERROR' });
        return;
      }

      const hash = crypto
        .createHash('sha256')
        .update(ReqBody.UniqueId + AUTH_KEY)
        .digest('hex');

      console.log(hash);

      if (ReqBody.UniqueIdCrypto !== hash) {
        ctx.send({ result: 'AUTH_ERROR' });
        return;
      }

      ReqBody.isNotice = ReqBody.isNotice ? 1 : 0;

      const res = await strapi.connections.default.raw(
        `
        INSERT INTO lotto_users (
          UniqueId, 
          FCMToken, 
          LastAccess,
          Device,
          isNotice
        )
        VALUES(
          :UniqueId, 
          :FCMToken, 
          NOW(),
          :Device,
          :isNotice
        ) 
        ON DUPLICATE KEY 
        UPDATE    
          FCMToken = :FCMToken, 
          LastAccess = NOW(),
          Device = :Device,
          isNotice = :isNotice
      `,
        {
          UniqueId: ReqBody.UniqueId,
          FCMToken: ReqBody.FCMToken,
          Device: ReqBody.Device,
          isNotice: ReqBody.isNotice,
        }
      );

      console.log(res[0]);

      ctx.send({ result: 'SUCCESS' });
    } catch (err) {
      ctx.send({ result: 'CRITICAL_ERROR' });
    }
  },
};
