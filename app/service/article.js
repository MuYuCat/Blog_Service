'use strict'

const BaseService = require('./base')

class ArticleService extends BaseService {

  // 新增文章
  async add(data) {
    const { ctx, app } = this;
    console.log('add article', data);
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO article VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          null]);
      if (addInfo) {
        return '发布成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '发布失败');
    }
  }

  // 查询所有文章
  async findArticle(params) {
    const { ctx, app } = this;
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
      let total = rows.length || 0;
      if (rows) {
        return { total, rows };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 根据ID查询文章
  async findById(article_id) {
    return await this._findById('Article', article_id)
  }


  // 编辑文章
  async edit() {
    let data = await this._edit('Article', json)
    if (!data) return 'Id传入有误'
    return data
  }

  // 删除文章
  async del(article_id) {
    let data = await this._delete('Article', article_id)
    if (!data) return 'Id传入有误'
    return data
  }
}

module.exports = ArticleService
