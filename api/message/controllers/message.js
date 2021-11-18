'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // saveMsg: async (ctx) => {
  //   // console.log(ctx.request.body);
  //   // console.log(ctx.params);
  //   // console.log(ctx.query);
  //   if (!ctx.query.sender || !ctx.query.imageProfileBase64) {
  //     ctx.send({ result: 'ERROR', message: 'Validation Error' });
  //     return;
  //   }
  //   const res = await strapi.connections.default.raw(
  //     `
  //     INSERT INTO messages (
  //       sender,
  //       imageProfileBase64
  //     )
  //     VALUES(
  //       :sender,
  //       :imageProfileBase64
  //     )
  //   `,
  //     {
  //       sender: ctx.query.sender,
  //       imageProfileBase64: ctx.query.imageProfileBase64,
  //     }
  //   );
  //   if (res[0].affectedRows === 1) {
  //     ctx.send({ result: 'SUCCESS', message: 'Successfully Inserted' });
  //   } else {
  //     ctx.send({ result: 'ERROR', message: 'DB Error' });
  //   }
  // },
};
