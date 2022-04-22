/*
 * @Author: MuYuCat
 * @Date: 2022-04-18 09:34:03
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 13:46:02
 * @Description: file content
 */
'use strict'

const BaseService = require('./base')

class UsersService extends BaseService {
  // 登陆页面
  async login(option) {
    const { ctx, app } = this;
    const userInfo =  await this._findOne('User', option);
    if (userInfo) {
      const token = app.jwt.sign({
        id: userInfo.id,
        username: userInfo.username,
        password: userInfo.password,
      }, app.config.jwt.secret, { expiresIn: '12h' });
      return {token: token};
    }
    ctx.throw(403, '账号或密码错误');
  }
  // 校验token
  async getUserInfo(token) {
    const { ctx } = this;
    // 解密token
    const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
    return await this._findById('User', decoded.id);
  }


  //查询所有数据
  async findAll() {
    let data = await this._findAll('User')
    let total = await this._count('User')
    return { total, data }
  }

  //根据ID查询数据
  async findById(id) {
    return await this._findById('User', id)
  }

  //新增数据
  async add(json) {
    return await this._add('User', json)
  }

  //编辑数据
  async edit() {
    let data = await this._edit('User', json)
    if (!data) return 'Id传入有误'
    return data
  }

  //删除数据
  async del(id) {
    let data = await this._delete('users', id)
    if (!data) return 'Id传入有误'
    return data
  }
}

module.exports = UsersService
