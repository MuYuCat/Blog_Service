'use strict'

const BaseController = require('./base');
const moment = require('moment');

class DictController extends BaseController {

  // 新增tags字典值
  async addTags() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      dictName: {
        type: 'string',
        required: true
      },
    });
    let {
      dictName
    } = ctx.request.body
    let result = await service.dict.addTags({
      dictName: dictName
    })
    this.success(result)
  }

  // 查询tags dict
  async getTags() {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getTags()
    this.success(result);
  }

  // 删除tags dict
  async delTags() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      dictName: {
        type: 'string',
        required: true
      }
    });
    let {
      dictName
    } = ctx.request.body
    let result = await service.dict.delTags({
      dictName: dictName,
    })
    this.success(result);
  }
}

module.exports = DictController
