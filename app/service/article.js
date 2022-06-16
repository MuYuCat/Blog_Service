'use strict'

const BaseService = require('./base')

class ArticleService extends BaseService {

  // 新增文章
  async add(data) {
    const {
      ctx,
      app
    } = this;
    console.log('add article', data);
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO article VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.id,
          data.title,
          data.content,
          data.tags,
          data.url,
          data.type,
          data.status,
          data.author,
          data.created_at,
          data.updated_at,
          data.deleted_at,
          data.introduction
        ]);
      if (addInfo) {
        return '发布成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '发布失败');
    }
  }

  // 查询文章
  async find(params) {
    const {
      ctx,
      app
    } = this;
    console.log('findArticle', params);
    try {
      const rows = await app.mysql.query(
        `SELECT * FROM article WHERE
          concat(${params.title}
            AND ${params.author}
            AND ${params.tags}
            AND ${params.status}
            AND ${params.selectTime})`);
      console.log(rows)
      rows.map((item) => {
        item.tags = item.tags.split(",");
      })
      let total = rows.length || 0;
      if (rows) {
        return {
          total,
          rows
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 基于id查询文章
  async findById(params) {
    const {
      ctx,
      app
    } = this;
    console.log('findArticleById', params);
    try {
      const rows = await app.mysql.query(
        `SELECT * FROM article WHERE
          concat(${params.id})`);
      console.log(rows)
      if (rows) {
        rows.map((item) => {
          item.tags = item.tags.split(",");
        })
        const row = rows[0];
        return {
          row
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 编辑文章状态
  async edit(params) {
    const {
      ctx,
      app
    } = this;
    console.log('editArticle', params);
    try {
      const res = await app.mysql.query(
        `UPDATE article SET status='${params.status}', updated_at='${params.updated_at}' WHERE id='${params.id}'`);
      if (res) {
        return '编辑成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '编辑失败');
    }
  }

  // 删除文章
  async del(params) {
    const {
      ctx,
      app
    } = this;
    console.log('delArticle', params);
    try {
      const delArticleInfo = await app.mysql.query(`DELETE FROM article WHERE id = '${params.id}'`);
      if (delArticleInfo) {
        return '删除成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '删除失败');
    }
  }
}

module.exports = ArticleService
