'use strict'

const BaseController = require('./base');

class BackHomeController extends BaseController {

  // 统计Index参数信息
  async getIndexCount() {
    const {
      service
    } = this
    let result = await service.backHome.getIndexCount()
    this.success(result);
  }

}

module.exports = BackHomeController

