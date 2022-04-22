/*
 * @Author: MuYuCat
 * @Date: 2022-04-15 17:13:35
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 16:58:44
 * @Description: file content
 */
'use strict'

const BaseController = require('./base');
const md5 = require('md5');

class UserController extends BaseController {
  // 登陆页面
  async login() {
    const { ctx, service } = this;
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { username, password } = ctx.request.body;
    const md5pwd = md5(password + 'secret');
    const where = {where: {
      password: md5pwd,
      username: username,
    },};
    const result = await service.user.login(where);
    this.success(result, '登陆成功');
  }
  // 获取用户信息
  async getUserInfo() {
    const { ctx, service } = this;
    console.log(ctx.request.query);
    const token = ctx.header.authorization;
    const userInfo = await service.user.getUserInfo(token)
    this.success(userInfo);
  }
  //查询所有数据
  async findAll() {
    const { ctx, service } = this
    let result = await service.user.findAll()
    this.success(result);
  }

  //根据ID查数据
  async findById() {
    const { ctx, service } = this
    let id = ctx.params.id
    let result = await service.user.findById(id)
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
    this.success(result)
  }

  //修改数据
  async edit() {
    const { ctx, service } = this
    let { id, username, nickname, avatar, sex, age } = ctx.request.body
    let result = await service.user.edit({ id, username, nickname, avatar, sex, age })
    this.success(result)
  }

  //修改数据
  async del() {
    const { ctx, service } = this
    let id = ctx.params.id
    let result = await service.user.del(id)
    this.success(result)
  }
}

module.exports = UserController
