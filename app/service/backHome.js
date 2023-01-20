'use strict'

const BaseService = require('./base');
const moment = require('moment');

const firstDate = moment().format("YYYY-MM-DD") + ' 00:00:00';
const laseDate = moment().format("YYYY-MM-DD") + ' 23:59:59';

class BackHomeService extends BaseService {

  // 统计Index参数
  async getIndexCount() {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const logCount = await conn.query(`SELECT COUNT(*) AS SUM FROM log`);
      const logToday = await conn.query(`SELECT COUNT(*) AS SUM FROM log WHERE stamp BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')`);
      const articleCount = await conn.query(`SELECT COUNT(*) AS SUM FROM article WHERE id IS NOT NULL`);
      const articleToday = await conn.query(`SELECT COUNT(*) AS SUM FROM article WHERE created_at BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')`);
      const materialCount = await conn.query(`SELECT COUNT(*) AS SUM FROM material WHERE id IS NOT NULL`);
      const materialToday = await conn.query(`SELECT COUNT(*) AS SUM FROM material WHERE created_at BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')`);
      await conn.commit();
      console.log(logCount, logToday,articleCount,articleToday,materialCount, materialToday )
      return {
        log: {
          count: logCount[0]?.SUM,
          todayCount: logToday[0]?.SUM
        },
        article: {
          count: articleCount[0]?.SUM,
          todayCount: articleToday[0]?.SUM
        },
        material: {
          count: materialCount[0]?.SUM,
          todayCount: materialToday[0]?.SUM
        },
      };
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }

  }
}

module.exports = BackHomeService
