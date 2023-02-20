'use strict'

const BaseController = require('./base');
const moment = require('moment');

class TODOController extends BaseController {

  // 新建TODO
  async add() {
    const {
      ctx,
      service
    } = this
    let {
      title,
      content,
      status,
      author,
      beginTime,
      endTime,
    } = ctx.request.body
    let result = await service.todo.add({
      id: new Date().valueOf(),
      title,
      content,
      status,
      author: author || '未知',
      beginTime,
      endTime,
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result);
  }

  // 查询TODO
  async find() {
    const {
      ctx,
      service
    } = this
    let {
      title,
      author,
      status,
      beginTime,
      endTime,
      pageSize,
      pageNum
    } = ctx.request.query
    console.log('pageSize', pageSize, pageNum)
    const selectTime = beginTime && endTime ?
      `beginTime >= '${moment(beginTime).format('YYYY-MM-DD HH:mm:ss')}' AND endTime <= '${moment(endTime).format('YYYY-MM-DD HH:mm:ss')}'` : 'beginTime IS NOT NULL AND endTime IS NOT NULL'
    const where = {
      title: (title && `INSTR(title,'${title}')>0`) || 'title IS NOT NULL', // title = '%${title}%'
      author: (author && author !== '全部' && `author = '${author}'`) || 'author IS NOT NULL',
      status: (status && status !== 'all') ? `status = ${status}` : 'status IS NOT NULL',
      selectTime,
      pageSize,
      pageNum
    }

    let result = await service.todo.find(where)
    this.success(result);
  }

  // 编辑TODO
  async update() {
    const {
      ctx,
      service
    } = this
    let {
      id,
      title,
      content,
      status,
      author,
      beginTime,
      endTime,
    } = ctx.request.body
    let result = await service.todo.update({
      id,
      title,
      content,
      status,
      author: author || '未知',
      beginTime,
      endTime,
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result);
  }

  // 编辑TODO状态
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

    let result = await service.todo.editSwitch(where)
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
    let result = await service.todo.del({
      id: id,
    })
    this.success(result);
  }

}

module.exports = TODOController

