'use strict'

const BaseService = require('./base')

class ArticleService extends BaseService {

  // 新增文章
  async add(json) {
    const { ctx, app } = this;
    const addInfo =  await this._add('Article', json);
    if (addInfo) {
      return '发布成功';
    }
    ctx.throw(500, '发布失败');
  }

  // 查询所有文章
  async findAll() {
    let rows = await this._findAll('Article')
    let total = await this._count('Article')
    if (rows && total) {
      return { total, rows };
    }
    ctx.throw(401, '发布失败');
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
