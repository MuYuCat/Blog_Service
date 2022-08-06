'use strict'

const BaseController = require('../base');
const moment = require('moment');

class wxLoginController extends BaseController {

  // 获取openid
  async getSession() {
    const ctx = this.ctx;
    let {
      code
    } = ctx.request.body
    console.log('url', `https://api.weixin.qq.com/sns/jscode2session?appid=wx6a9b40f48a1759da&secret=aca47dc06eecbef7fac3805547a1953a&js_code=${code}&grant_type=authorization_code`);
    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=wx6a9b40f48a1759da&secret=aca47dc06eecbef7fac3805547a1953a&js_code=${code}&grant_type=authorization_code`);
    console.log('result', result, result.data);
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }

    // 新增wx用户
    async add() {
      const {
        ctx,
        service
      } = this
      let {
        id
      } = ctx.request.body
      let result = await service.wx.login.add({
        id,
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      })
      this.success(result)
    }

    // 基于id查询用户信息
    async findById() {
      const {
        ctx,
        service
      } = this
      let {
        id
      } = ctx.request.body
      const where = {
        id: `openid = '${id}'`
      }

      let result = await service.wx.login.findById(where)
      this.success(result);
    }

}

module.exports = wxLoginController
