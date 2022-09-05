'use strict'

const BaseService = require('../base')

class wxLoginService extends BaseService {

  // 新增文章
  async add(data) {
    const {
      ctx,
      app
    } = this;
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO wxUser VALUES (? ,?, ?)`,
        [data.id,
        data.created_at,
        data.updated_at
        ]);
      if (addInfo) {
        return '登陆成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(501, '登陆失败');
    }
  }

    // 基于id查询用户信息
    async findById(params) {
      const {
        ctx,
        app
      } = this;
      try {
        const rows = await app.mysql.query(
          `SELECT * FROM wxUser WHERE
            concat(${params.id})`);
        console.log(rows);
        if (rows.length === 0) {
          ctx.throw(501, '查询失败');
        } else {
          return {
            rows
          };
        }
      } catch (err) {
        console.log(err);
        ctx.throw(501, '查询失败');
      }
    }
}

module.exports = wxLoginService
