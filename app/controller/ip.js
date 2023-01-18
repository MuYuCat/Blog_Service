'use strict'

const BaseController = require('./base');

class IpController extends BaseController {

  // 获取ip地址
  async getIp() {
    const {
      service
    } = this
    const result = await service.ip.getIp();
    this.success(result);
  }
}

module.exports = IpController
