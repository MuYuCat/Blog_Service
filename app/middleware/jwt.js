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
      if (!!token && token !== 'null') {
        //解密token
        const secret = ctx.app.config.jwt.secret
        try {
          await ctx.app.jwt.verify(token, secret);
        } catch (e) {
          ctx.throw(403, '无效Token')
        }
        await next()
      } else {
        ctx.throw(403, '无Token')
      }
    } else {
      await next()
    }
  }
}
