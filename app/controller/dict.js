'use strict'

const BaseController = require('./base');
const moment = require('moment');

class DictController extends BaseController {

// 文章dict
  // 新增文章tags字典值
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
  // 查询文章tags dict
  async getTags() {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getTags()
    this.success(result);
  }
  // 删除文章tags dict
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
  // 查询author dict
  async getAuthors() {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getAuthors()
    this.success(result);
  }

// 资源
  // 新增资源tags字典值
  async addMaterialTags() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      tag: {
        type: 'string',
        required: true
      },
      rank: {
        type: 'number',
        required: true
      },
    });
    let {
      tag,
      rank
    } = ctx.request.body
    let result = await service.dict.addMaterialTags({ tag, rank })
    this.success(result)
  }
  // 查询tag
  async getMaterialTags() {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getMaterialTags()
    this.success(result);
  }
  // 编辑tag
  async editMaterialTags() {
    const {
      ctx,
      service
    } = this
    let {
      tag,
      newTag
    } = ctx.request.body
    let result = await service.dict.editMaterialTags({tag, newTag})
    this.success(result);
  }
  // 删除tag
  async delMaterialTags() {
    const {
      ctx,
      service
    } = this
    let {
      tag,
      rank
    } = ctx.request.body
    let result = await service.dict.delMaterialTags({tag, rank})
    this.success(result);
  }
  // 新增subTags
  async addSubMaterialTags() {
    const {
      ctx,
      service
    } = this
    let {
      title,
      tag,
      url,
      author,
      status,
      introduction
    } = ctx.request.body
    let result = await service.dict.addSubMaterialTags({
      id: new Date().valueOf(),
      rank: null,
      tag,
      title,
      introduction: introduction || '暂无简介',
      url: url || '',
      status: status || 0,
      author: author || '未知',
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result)
  }
  // 查询所有tag
  async getAllMaterialTags() {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getAllMaterialTags()
    this.success(result);
  }
  // 通过id查询子素材
  async getMaterialById() {
    const {
      ctx,
      service
    } = this
    let {
      id
    } = ctx.request.body
    let result = await service.dict.getMaterialById({id})
    this.success(result);
  }
  // 编辑subTags
  async updateSubMaterialTags() {
    const {
      ctx,
      service
    } = this
    let {
      id,
      title,
      tag,
      url,
      author,
      status,
      introduction,
      rank
    } = ctx.request.body
    let result = await service.dict.updateSubMaterialTags({
      id,
      tag,
      title,
      introduction: introduction || '暂无简介',
      url: url || '',
      status: status || 0,
      author: author || '未知',
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      rank,
    })
    this.success(result)
  }
  // 删除subTags
  async delSubMaterial() {
    const {
      ctx,
      service
    } = this
    let {
      id
    } = ctx.request.body
    let result = await service.dict.delSubMaterial({id})
    this.success(result);
  }

  // tags排序 新版
  // tags排序
  async dragMaterialTagRank() {
    const {
      ctx,
      service
    } = this
    let {
      changeList
    } = ctx.request.body
    let result = await service.dict.dragMaterialTagRank({changeList})
    this.success(result);
  }
  // subTags排序
  async dragMaterialSubTagRank() {
    const {
      ctx,
      service
    } = this
    let {
      changeList
    } = ctx.request.body
    let result = await service.dict.dragMaterialSubTagRank({changeList})
    this.success(result);
  }

  // tags排序 旧版
  // 查询tags排序
  async getMaterialTagsRank(data) {
    const {
      ctx,
      service
    } = this
    let result = await service.dict.getMaterialTagsRank()
    this.success(result);
  }
  // 修改tags排序
  async changeMaterialTags(data) {
    const {
      ctx,
      service
    } = this
    let {
      tagList
    } = ctx.request.body
    let result = await service.dict.changeMaterialTags({tagList})
    this.success(result);
  }
  // 查询subTags排序
  async getSubMaterialTagsRank(data) {
    const {
      ctx,
      service
    } = this
    let {
      id
    } = ctx.request.body
    let result = await service.dict.getSubMaterialTagsRank({id})
    this.success(result);
  }
  // 修改subTags排序
  async changeSubMaterialTags(data) {
    const {
      ctx,
      service
    } = this
    let {
      tagList
    } = ctx.request.body
    let result = await service.dict.changeSubMaterialTags({tagList})
    this.success(result);
  }
}

module.exports = DictController
