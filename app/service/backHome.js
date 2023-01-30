'use strict'

const BaseService = require('./base');
const moment = require('moment');

class BackHomeService extends BaseService {

  // 统计Index参数
  async getIndexCount() {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const logCount = await conn.query(`SELECT COUNT(*) AS SUM FROM log WHERE log_type = 'visit'`);
      const logToday = await conn.query(`SELECT COUNT(*) AS SUM FROM log WHERE stamp BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59') AND log_type = 'visit'`);
      const articleCount = await conn.query(`SELECT COUNT(*) AS SUM FROM article WHERE id IS NOT NULL`);
      const articleToday = await conn.query(`SELECT COUNT(*) AS SUM FROM article WHERE created_at BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')`);
      const materialCount = await conn.query(`SELECT COUNT(*) AS SUM FROM material WHERE id IS NOT NULL`);
      const materialToday = await conn.query(`SELECT COUNT(*) AS SUM FROM material WHERE created_at BETWEEN CONCAT(CURDATE(), ' 00:00:00') AND CONCAT(CURDATE(), ' 23:59:59')`);
      await conn.commit();
      console.log(logCount, logToday,articleCount,articleToday,materialCount, materialToday )
      return {
        log: {
          count: logCount[0].SUM,
          todayCount: logToday[0].SUM
        },
        article: {
          count: articleCount[0].SUM,
          todayCount: articleToday[0].SUM
        },
        material: {
          count: materialCount[0].SUM,
          todayCount: materialToday[0].SUM
        },
      };
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 统计ECharts参数
  async getEChartsCount(type) {
    const {
      ctx,
      app
    } = this;
    console.log('type', type)
    let res;
    try {
      if (type === '访问量') {
        res = await app.mysql.query(`SELECT DATE_FORMAT(stamp, '%Y-%m-%d') time,COUNT(*) count FROM log WHERE stamp BETWEEN '2022-05-20 00:00:00' AND CONCAT(CURDATE(), ' 23:59:59') GROUP BY time `);
        console.log('访问量', res)
      } else if (type === '文章数') {
        res = await app.mysql.query(`SELECT DATE_FORMAT(created_at, '%Y-%m-%d') time,COUNT(*) count FROM article WHERE created_at BETWEEN '2022-05-20 00:00:00' AND CONCAT(CURDATE(), ' 23:59:59') GROUP BY time `);
        console.log('文章数', res)
      } else if (type === '素材数') {
        res = await app.mysql.query(`SELECT DATE_FORMAT(created_at, '%Y-%m-%d') time,COUNT(*) count FROM material WHERE created_at BETWEEN '2022-05-20 00:00:00' AND CONCAT(CURDATE(), ' 23:59:59') GROUP BY time `);
        console.log('素材数', res)
      } else if (type === '项目数') {
        res = [];
      }
      const finalData = [];
      res.map((item) => {
        finalData.push([+moment(item.time).valueOf(), item.count])
      })
      return finalData
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 获取最新公告
  async getAnno() {
    const {
      ctx,
      app
    } = this;
    try {
      const anno = await app.mysql.query(`SELECT * FROM anno WHERE id IS NOT NULL ORDER BY created_at DESC LIMIT 0,1`);
      console.log('anno', anno)
      return anno
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
}

module.exports = BackHomeService
