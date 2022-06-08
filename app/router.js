/*
 * @Author: MuYuCat
 * @Date: 2022-04-15 15:24:37
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 16:42:43
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
  // 用户 users
  router.post('/users/login', controller.user.login);
  router.get('/users/getUserInfo', jwt, controller.user.getUserInfo);

  // 文章 article
  router.post('/article/add', jwt, controller.article.add);
  router.get('/article/findArticle', jwt, controller.article.findArticle);

};
