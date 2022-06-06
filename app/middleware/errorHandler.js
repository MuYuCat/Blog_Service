/*
 * @Author: MuYuCat
 * @Date: 2022-04-06 07:54:32
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 11:20:28
 * @Description: file content
 */
'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log(err);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = 200;
      ctx.status = status;

      if (err.status === 422) {
        let code = err.code;
        let message = err.message;
        if (err.errors.length === 1){
          message = err.errors[0].err[0]|| `${err.errors[0].desc} ${err.message}`;
        } else{
          let errMsg = [];
          for (const message of err.errors){
            errMsg.push(message.err[0] || `${message.desc} ${err.message}`);
          }
          message = errMsg;
        }
        ctx.status = 409;
        ctx.body = {
          code: code,
          msg: message,
          data: null,
        };
        return;
      }
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: err.status,
        msg: error,
        data: null,
      };
    }
  };
};

