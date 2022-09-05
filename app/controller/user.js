'use strict'

const BaseController = require('./base');
const md5 = require('md5');

class UserController extends BaseController {

  // 用户登陆
  async login() {
    const { ctx, service } = this;
    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { username, password } = ctx.request.body;
    const md5pwd = md5(password + 'secret');
    const where = {
      password: md5pwd,
      username: username,
    };
    const result = await service.user.login(where);
    this.success(result, '登陆成功');
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, service } = this;
    const token = ctx.header.authorization;
    const userInfo = await service.user.getUserInfo(token)
    this.success(userInfo);
  }
}

module.exports = UserController
