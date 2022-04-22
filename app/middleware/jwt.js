/*
 * @Author: MuYuCat
 * @Date: 2022-04-21 14:55:32
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 15:10:32
 * @Description: file content
 */

// middleware/jwt.js

// 在 “router 中使用中间件” 中用不到
const whiteList = ['/', '/blog']

module.exports = (options) => {
return async function (ctx, next) {
  //判断接口路径是否在白名单（在 “router 中使用中间件”中不需要验证这一步）
  const isInWhiteList = whiteList.some(item => item == ctx.request.url)
  if (!isInWhiteList) {
      // 拿到前端传过来的 token
      const token = ctx.request.header.authorization
      if (token) {
        //解密token
        const secret = ctx.app.config.jwt.secret
        const decoded = ctx.app.jwt.verify(token, secret) || 'false'
        if (decoded !== 'false') {
          await next()
        } else {
          ctx.throw(403, '无效Token')
        }
      } else {
        ctx.throw(403, '无Token')
      }
    } else {
      await next()
    }
  }
}
