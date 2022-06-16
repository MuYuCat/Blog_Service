'use strict'

const BaseService = require('./base')

class UsersService extends BaseService {

  // 登陆页面
  async login(option) {
    const {
      ctx,
      app
    } = this;
    try {
      const userInfo = await app.mysql.query('SELECT * FROM users WHERE password = ? AND username = ?', [option.password, option.username]);
      if (userInfo) {
        const token = app.jwt.sign({
          id: userInfo.id,
          username: userInfo.username,
          password: userInfo.password,
        }, app.config.jwt.secret, {
          noTimestamp: true,
          expiresIn: '12h'
        });
        return {
          token: token
        };
      }
    } catch (err) {
      console.log(err);
      ctx.throw(403, '账号或密码错误');
    }
  }

  // 获取用户信息
  async getUserInfo(token) {
    const {
      ctx,
      app
    } = this;
    // 解密token
    try {
      const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      console.log(decoded.id)
      if (decoded.id) {
        const userInfo = await app.mysql.query('SELECT age,avatar_url,created_at,deleted_at,id,sex,updated_at,username FROM users WHERE id = ?', [decoded.id]);
        if (userInfo) {
          return {
            userInfo: userInfo[0]
          };
        }
      } else {
        ctx.throw(403, '获取用户信息失败');
      }
    } catch (err) {
      console.log(err);
      ctx.throw(403, err.message || '账户不存在');
    }
  }
}

module.exports = UsersService
