'use strict'

const BaseService = require('./base');

class BackSetService extends BaseService {

  // 新增公告
  async addNewAnno(data) {
    const {
      ctx,
      app
    } = this;
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO anno VALUES (? ,?, ?, ?)`,[data.id,data.content,data.author,data.created_at]);
      if (addInfo) {
        return '发布成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '发布失败');
    }
  }
}

module.exports = BackSetService
