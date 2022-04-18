'use strict'

const BaseController = require('./base')

class UserController extends BaseController {
  //查询所有数据
  async findAll() {
    const { ctx, service } = this
    let result = await service.user.findAll()
    if (result === 'Server error') this.error(0, result)
    this.success(result, 'OK')
  }

  //根据ID查数据
  async findById() {
    const { ctx, service } = this
    let id = ctx.params.id
    let result = await service.user.findById(id)
    if (result === 'Server error') this.error(0, result)
    this.success(result, 'OK')
  }

  //新增数据
  async add() {
    const { ctx, service } = this
    let { username, password, avatar_url, sex, age } = ctx.request.body
    let result = await service.user.add({
      id: new Date().valueOf(),
      username,
      password,
      avatar_url,
      sex,
      age
    })
    if (result === 'Server error') this.error(0, result)
    this.success(1, result)
  }

  //修改数据
  async edit() {
    const { ctx, service } = this
    let { id, username, nickname, avatar, sex, age } = ctx.request.body
    let result = await service.user.edit({ id, username, nickname, avatar, sex, age })
    if (result === 'Server error') this.error(0, result)
    this.success(1, result)
  }

  //修改数据
  async del() {
    const { ctx, service } = this
    let id = ctx.params.id
    let result = await service.user.del(id)
    if (result === 'Server error') this.error(0, result)
    this.success(1, result)
  }
}

module.exports = UserController
