/*
 * @Author: MuYuCat
 * @Date: 2022-04-15 17:13:13
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 16:59:34
 * @Description: file content
 */
'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data = null, msg = 'success', code = 200) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code,
      msg,
      data,
    };
  };
  sendSuccess() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = null;
  }
}

module.exports = BaseController;
