'use strict'

const Service = require('egg').Service

class BaseService extends Service {
  async _findOne(modelName, where) {
    const { ctx, app } = this;
    try{
      const result = ctx.model[modelName].findOne(where);
      return result;
    } catch (error) {
      ctx.throw(500, 'Server error');
    }
  }
  //查询数据
  async _findAll(modelName, option) {
    const { ctx, app } = this
    const result = await ctx.model[modelName].findAll(option);
    return result
  }

  //查询数据总数
  async _count(modelName) {
    const { ctx } = this
    try {
      return await ctx.model[modelName].count()
    } catch (error) {
      ctx.throw(500, 'Server error');
    }
  }

  //根据ID查询数据
  async _findById(modelName, id) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(id)
      return result
    } catch (error) {
      ctx.throw(500, 'Server error');
    }
  }

  //新增数据
  async _add(modelName, json) {
    const { ctx } = this
    try {
      await ctx.model[modelName].create(json)
      return '新增成功'
    } catch (error) {
      console.log(error);
      ctx.throw(500, 'Server error');
    }
  }

  //编辑数据
  async _edit(modelName, json) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(json.id)
      if (!result) return false
      await result.update({ ...json })
      return true
    } catch (error) {
      ctx.throw(500, 'Server error');
    }
  }

  //删除数据
  async _delete(modelName, key) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(key)
      if (!result) return false
      await result.destroy()
      return true
    } catch (error) {
      ctx.throw(500, 'Server error');
    }
  }
}

module.exports = BaseService
