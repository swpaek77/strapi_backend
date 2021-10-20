'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  GetArea: async (ctx) => {
    // console.log(ctx.params);
    // console.log(ctx.request.body);
    console.log(ctx.query);

    let { lat, lng } = ctx.query;

    // var temp = await strapi.query('lotto-seller').find({ RTLRID: '24800053' });
    // console.log(temp);
    // console.log(
    //     strapi.query('lotto-seller').orm
    // );

    // lat
    // 35.20012069589234
    // 128.5657445155084
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    const Range = 0.03;
    const Adjust = 0.0;

    // console.log(
    //     await strapi.query('lotto-seller').model
    // );

    // const result = await strapi
    //     .query('lotto-seller')
    //     // .model.query(qb => {
    //     .model.query(qb => {
    //         // qb.where('RTLRID', '24800053');

    //         // qb.innerJoin('lotto_histories', 'RTLRID', '=', 'RTLRID');
    //         // qb.join('lotto_histories', 'lotto-sellers.RTLRID', '=', 'lotto_histories.RTLRID');

    //         qb.where('LATITUDE', '>=' ,  lat + Adjust - Range);
    //         qb.where('LATITUDE', '<=' ,  lat + Adjust + Range);
    //         qb.where('LONGITUDE', '>=' , lng + Adjust - Range);
    //         qb.where('LONGITUDE', '<=' , lng + Adjust + Range);
    //     })
    //     // .fetch();
    //     .fetchAll();

    // const fields = result.toJSON();

    // console.log(
    //     (
    //     await strapi
    //         .query('lotto-history')
    //         // .model.query(qb => {
    //         .model.query(qb => {
    //             // console.log(qb);

    //             // qb.select(strapi.connections.default.raw(`
    //             //     a.RTLRID
    //             //     , b.FIRMNM
    //             //     , b.BPLCDORODTLADRES
    //             //     , a.WIN_TYPE
    //             //     , count(a.RTLRID) as WIN_CNT
    //             // `))
    //             // qb.count('*')
    //             // qb.groupBy('lotto-histories.RTLRID', 'lotto-histories.WIN_TYPE')
    //             qb.groupByRaw(`a.RTLRID, a.WIN_TYPE`)
    //             // qb.orderBy('total_players', 'desc')
    //         })

    //         // .fetch();
    //         .fetchAll()
    //     ).toJSON()
    // );

    // console.log(strapi.connections.default)

    const res = await strapi.connections.default.raw(
      `
            select b.RTLRID 
                , b.FIRMNM 
                , b.BPLCDORODTLADRES 
                , SUM(CASE WHEN a.WIN_TYPE = 1 THEN 1 ELSE 0 END) as WIN_CNT_1
                , SUM(CASE WHEN a.WIN_TYPE = 2 THEN 1 ELSE 0 END) as WIN_CNT_2
                , b.LATITUDE
                , b.LONGITUDE
            from lotto_sellers b
                left outer join 	lotto_histories a
                    on a.RTLRID = b.RTLRID 	
            where 1 = 1
            AND b.LATITUDE >=  :MoreLat
            AND b.LATITUDE <=  :LessLat
            AND b.LONGITUDE >= :MoreLng
            AND b.LONGITUDE <= :LessLng
            group by b.RTLRID 
            order by WIN_CNT_1 desc, WIN_CNT_2 desc
        `,
      {
        MoreLat: lat + Adjust - Range,
        LessLat: lat + Adjust + Range,
        MoreLng: lng + Adjust - Range,
        LessLng: lng + Adjust + Range,
      }
    );

    // console.log(  );

    // ctx.send(
    //     Object.values(JSON.parse(JSON.stringify(res[0])))
    // );
    ctx.send(res[0]);
    // console.log(fields);

    // ctx.send(fields);
  },
};
