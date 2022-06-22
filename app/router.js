'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const {
    router,
    controller,
    middleware
  } = app;
  const jwt = middleware.jwt(app.config.jwt);

  router.get('/', controller.home.index);

  // 用户 users
  router.post('/users/login', controller.user.login);
  router.get('/users/getUserInfo', jwt, controller.user.getUserInfo);

  // 文章 article
  router.post('/article/add', jwt, controller.article.add);
  router.get('/article/find', jwt, controller.article.find);
  router.post('/article/switch', jwt, controller.article.editSwitch);
  router.get('/article/findId', jwt, controller.article.findById);
  router.post('/article/del', jwt, controller.article.del);
  router.post('/article/edit', jwt, controller.article.edit);

  // 字典 dict
  router.post('/dict/addTags', jwt, controller.dict.addTags);
  router.get('/dict/getTags', jwt, controller.dict.getTags);
  router.post('/dict/delTags', jwt, controller.dict.delTags);

};
