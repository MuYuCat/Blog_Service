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

  // 统计ECharts参数信息
  async getEChartsCount() {
    const {
      ctx,
      service
    } = this
    let {
      type
    } = ctx.request.body
    let result = await service.backHome.getEChartsCount(type)
    this.success(result);
  }

  // 最新公告
  async getAnno() {
    const {
      service
    } = this
    let result = await service.backHome.getAnno()
    this.success(result);
  }

  // 本月ToDo
  async getToDo() {
    const {
      service,
      ctx
    } = this
    let {
      time
    } = ctx.request.body
    let result = await service.backHome.getToDo(time)
    this.success(result);
  }

}

module.exports = BackHomeController

