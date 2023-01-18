'use strict'

const BaseService = require('./base');

class IpService extends BaseService {

  // 查询ip
  async getIp() {
    const {
      ctx,
      app
    } = this;
    try {
      const ip = require('ip');
      const ipAdd = await ip.address();
      return {
        ip: ipAdd|| ''
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '获取ip失败');
    }
  }
}

module.exports = IpService
