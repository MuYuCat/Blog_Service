'use strict'

const BaseService = require('./base');

class ArticleService extends BaseService {

  // 新增文章
  async add(data) {
    const {
      ctx,
      app
    } = this;
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO article VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.id,
          data.title,
          data.content,
          data.html,
          data.tags,
          data.url,
          data.status,
          data.author,
          data.created_at,
          data.updated_at,
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
    const conn = await app.mysql.beginTransaction();
    try {
      const rows = await conn.query(
        `SELECT * FROM article WHERE
          concat(${params.title}
            AND ${params.author}
            AND ${params.tags}
            AND ${params.status}
            AND ${params.selectTime}) ORDER BY updated_at DESC LIMIT ${params.pageSize} OFFSET ${(params.pageNum - 1) * params.pageSize} `);
      const totalRows = await conn.query(
        `SELECT COUNT(*) AS SUM FROM article WHERE
          concat(${params.title}
            AND ${params.author}
            AND ${params.tags}
            AND ${params.status}
            AND ${params.selectTime}) ORDER BY updated_at DESC`);
      await conn.commit();
      rows.map((item) => {
        item.tags = item.tags.split(",");
      })
      let total = totalRows[0].SUM;
      if (rows) {
        return {
          total,
          rows
        };
      }
    } catch (err) {
      await conn.rollback();
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
  async editSwitch(params) {
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

  // 编辑文章
  async edit(params) {
    const {
      ctx,
      app
    } = this;
    console.log('editArticle', params);
    try {
      const res = await app.mysql.query(
        'UPDATE article SET title=?,content=?,html=?,tags=?,url=?,status=?,introduction=?,updated_at=? WHERE id=?', [
          params.title, params.content, params.html, params.tags, params.url, params.status, params.introduction, params.updated_at, params.id
        ]);
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

  // 查询blog文章
  async findBlog(page) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      const rows = await conn.query(
        `SELECT id, title, tags, updated_at, introduction FROM article WHERE status = ? ORDER BY updated_at DESC LIMIT ? OFFSET ?`, [1, 10, (+page - 1) * 10]);
      const totalRows = await conn.query(`SELECT COUNT(*) AS SUM FROM article WHERE status = ?`, [1]);
      await conn.commit();
      console.log(rows)
      rows.map((item) => {
        item.tags = item.tags.split(",");
      })
      let total = totalRows[0].SUM;
      if (rows) {
        return {
          total,
          rows,
        };
      }
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }
}

module.exports = ArticleService
