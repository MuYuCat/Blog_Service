'use strict'

const BaseController = require('./base');

class ArticleController extends BaseController {

  // 新增文章
  async add() {
    const { ctx, service } = this
    let { title, content, tags, status } = ctx.request.body
    let result = await service.article.add({
      id: new Date().valueOf(),
      title,
      content,
      tags,
      status: status || 'public'
    })
    this.success(result)
  }

  // 查询所有文章
  async findAll() {
    const { ctx, service } = this
    let result = await service.article.findAll()
    this.success(result);
  }

  // // 修改文章
  // async edit() {
  //   const { ctx, service } = this
  //   let { id, username, nickname, avatar, sex, age } = ctx.request.body
  //   let result = await service.user.edit({ id, username, nickname, avatar, sex, age })
  //   this.success(result)
  // }

  // // 删除文章
  // async del() {
  //   const { ctx, service } = this
  //   let id = ctx.params.id
  //   let result = await service.user.del(id)
  //   this.success(result)
  // }

  // // 根据文章ID查文章
  // async findById() {
  //   const { ctx, service } = this
  //   let id = ctx.params.id
  //   let result = await service.user.findById(id)
  //   this.success(result, 'OK')
  // }
}

module.exports = ArticleController
