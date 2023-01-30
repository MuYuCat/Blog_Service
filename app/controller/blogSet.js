'use strict'

const BaseController = require('./base');
const moment = require('moment');

class BlogSetController extends BaseController {

  // 新建公告
  async addNewAnno() {
    const {
      ctx,
      service
    } = this
    let {
      content,
      author
    } = ctx.request.body
    let result = await service.blogSet.addNewAnno({
      id: new Date().valueOf(),
      content,
      author: author || '未知',
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result);
  }

}

module.exports = BlogSetController

