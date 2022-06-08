'use strict'

const BaseController = require('./base');
const moment = require('moment');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ArticleController extends BaseController {

  // 新增文章
  async add() {
    const { ctx, service } = this
    let { title, content, tags, url, type, status, author } = ctx.request.body
    let result = await service.article.add({
      id: new Date().valueOf(),
      title,
      content,
      tags: tags || null,
      url: url || null,
      type: type || null,
      author,
      status: status || '0',
      created_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      updated_at: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      deleted_at: null,
    })
    this.success(result)
  }

  // 查询所有文章
  async findArticle() {
    const { ctx, service } = this
    let { title, author, tags, status, beginTime, endTime } = ctx.request.query
    const selectTime = beginTime && endTime
    ?
      `created_at BETWEEN '${moment(beginTime).format('YYYY-MM-DD')}' AND '${moment(endTime).add(1, 'days').format('YYYY-MM-DD')}'`
    :
      'created_at IS NOT NULL'
    const where = {
      title: title || 'id IS NOT NULL',
      author: author || 'author IS NOT NULL',
      tags: tags || 'tags IS NOT NULL',
      status: (status && status !== 'all') ? status : 'status IS NOT NULL',
      selectTime
    }

    let result = await service.article.findArticle(where)
    this.success(result);
  }

}

module.exports = ArticleController
