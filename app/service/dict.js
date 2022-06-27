'use strict'

const BaseService = require('./base')

class DictService extends BaseService {

  // 新增tags dict
  async addTags(data) {
    const {
      ctx,
      app
    } = this;
    console.log('add dict', data);
    try {
      let addTagsInfo = await app.mysql.query(
        `INSERT INTO dictParam(tagsName) VALUES
        (?)`,
        [data.dictName]);
      if (addTagsInfo) {
        return '发布成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '发布失败');
    }
  }

  // 获取 tags dict
  async getTags() {
    const {
      ctx,
      app
    } = this;
    try {
      const rows = await app.mysql.query(`SELECT tagsName as dictName FROM dictParam`);
      console.log(rows)
      if (rows) {
        return {
          rows
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 删除 tags dict
  async delTags(data) {
    const {
      ctx,
      app
    } = this;
    try {
      const delTagsInfo = await app.mysql.query(`DELETE FROM dictParam WHERE tagsName = '${data.dictName}'`);
      if (delTagsInfo) {
        return '删除成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '删除失败');
    }
  }

    // 获取 author dict
    async getAuthors() {
      const {
        ctx,
        app
      } = this;
      try {
        const rows = await app.mysql.query(`SELECT DISTINCT author as dictLabel FROM article`);
        console.log(rows)
        if (rows) {
          return {
            rows
          };
        }
      } catch (err) {
        console.log(err);
        ctx.throw(500, '查询失败');
      }
    }
}

module.exports = DictService
