/*
 * @Author: MuYuCat
 * @Date: 2022-04-15 15:24:37
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 14:53:02
 * @Description: Router
 */
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  router.get('/', controller.home.index);
  // 用户登录、获取用户信息
  router.post('/users/login', controller.user.login);
  router.get('/users/getUserInfo', controller.user.getUserInfo);

  router.get('/users/findAll', jwt, controller.user.findAll);
  router.get('/users/findById/:id', jwt, controller.user.findById);
  router.post('/users/add', jwt, controller.user.add);
  router.put('/users/edit', jwt, controller.user.edit);
  router.delete('/users/del/:id', jwt, controller.user.del);
};
