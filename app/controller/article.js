'use strict'

const BaseController = require('./base');
const moment = require('moment');

class ArticleController extends BaseController {

  // 新增文章
  async add() {
    const {
      ctx,
      service
    } = this
    let {
      title,
      content,
      html,
      tags,
      url,
      status,
      author,
      introduction
    } = ctx.request.body
    let result = await service.article.add({
      id: new Date().valueOf(),
      title,
      content,
      html,
      tags: tags.toString() || '',
      url: url || '',
      author,
      status: status || 0,
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      introduction: introduction || '暂无简介'
    })
    this.success(result)
  }

  // 查询文章
  async find() {
    const {
      ctx,
      service
    } = this
    let {
      title,
      author,
      tags,
      status,
      beginTime,
      endTime
    } = ctx.request.query
    const selectTime = beginTime && endTime ?
      `created_at BETWEEN '${moment(beginTime).format('YYYY-MM-DD')}' AND '${moment(endTime).add(1, 'days').format('YYYY-MM-DD')}'` :
      'created_at IS NOT NULL'
    const where = {
      title: (title && `INSTR(title,'${title}')>0`) || 'title IS NOT NULL', // title = '%${title}%'
      author: (author !== '全部' && `author = '${author}'`) || 'author IS NOT NULL',
      tags: (tags !== '全部' && `INSTR(tags,'${tags}')>0`) || 'tags IS NOT NULL',
      status: (status && status !== 'all') ? `status = ${status}` : 'status IS NOT NULL',
      selectTime
    }

    let result = await service.article.find(where)
    this.success(result);
  }

  // 基于id查询文章
  async findById() {
    const {
      ctx,
      service
    } = this
    let {
      id
    } = ctx.request.query
    const where = {
      id: `id = '${id}'`
    }

    let result = await service.article.findById(where)
    this.success(result);
  }

  // 编辑文章状态
  async editSwitch() {
    const {
      ctx,
      service
    } = this
    let {
      id,
      status
    } = ctx.request.body
    const where = {
      id: id,
      status: +status === 0 ? 1 : 0,
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }

    let result = await service.article.editSwitch(where)
    this.success(result);
  }

  // 删除文章
  async del() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      id: {
        type: 'string',
        required: true
      }
    });
    let {
      id
    } = ctx.request.body
    let result = await service.article.del({
      id: id,
    })
    this.success(result);
  }

  // 编辑文章
  async edit() {
    const {
      ctx,
      service
    } = this
    let {
      id,
      title,
      content,
      html,
      tags,
      url,
      status,
      introduction
    } = ctx.request.body
    let result = await service.article.edit({
      id,
      title,
      content,
      html,
      tags: tags.toString() || '',
      url: url || '',
      status: status || 0,
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      introduction: introduction || '暂无简介'
    })
    this.success(result)
  }

}

module.exports = ArticleController
