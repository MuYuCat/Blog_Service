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
  router.get('/article/findId', controller.article.findById);
  router.post('/article/del', jwt, controller.article.del);
  router.post('/article/edit', jwt, controller.article.edit);
  router.get('/article/findBlog', controller.article.findBlog);

  // 字典 dict
  router.post('/dict/addTags', jwt, controller.dict.addTags);
  router.get('/dict/getTags', jwt, controller.dict.getTags);
  router.post('/dict/delTags', jwt, controller.dict.delTags);
  router.get('/dict/getAuthors', jwt, controller.dict.getAuthors);
  router.post('/dict/addMaterialTags', jwt, controller.dict.addMaterialTags);
  router.get('/dict/getMaterialTags', jwt, controller.dict.getMaterialTags);
  router.post('/dict/editMaterialTags', jwt, controller.dict.editMaterialTags);
  router.post('/dict/delMaterialTags', jwt, controller.dict.delMaterialTags);
  router.post('/dict/addSubMaterialTags', jwt, controller.dict.addSubMaterialTags);
  router.get('/dict/getAllMaterialTags', controller.dict.getAllMaterialTags);
  router.post('/dict/getMaterialById', jwt, controller.dict.getMaterialById);
  router.post('/dict/updateSubMaterialTags', jwt, controller.dict.updateSubMaterialTags);
  router.post('/dict/delSubMaterial', jwt, controller.dict.delSubMaterial);
  // tags 排序 新版
  router.post('/tag/dragMaterialTagRank', jwt, controller.dict.dragMaterialTagRank);
  router.post('/tag/dragMaterialSubTagRank', jwt, controller.dict.dragMaterialSubTagRank);
  // tags 排序 旧版
  router.get('/dict/getMaterialTagsRank', jwt, controller.dict.getMaterialTagsRank);
  router.post('/dict/changeMaterialTags', jwt, controller.dict.changeMaterialTags);
  router.post('/dict/getSubMaterialTagsRank', jwt, controller.dict.getSubMaterialTagsRank);
  router.post('/dict/changeSubMaterialTags', jwt, controller.dict.changeSubMaterialTags);

  // 埋点日志 log
  router.post('/log/send', controller.log.send);
  // 获取ip
  router.get('/getIp', controller.ip.getIp);

  // wx小程序
  // user登陆 wxUser
  router.post('/wxLogin/getSession', controller.wx.login.getSession);
  router.post('/wxLogin/add', controller.wx.login.add);
  router.post('/wxLogin/find', controller.wx.login.findById);
  // 活动 wxTask
  router.post('/wxTask/add', controller.wx.task.add);
  router.post('/wxTask/edit', controller.wx.task.edit);
  router.post('/wxTask/findByUserId',controller.wx.task.findByUserId);
  router.post('/wxTask/stop',controller.wx.task.stop);
  router.post('/wxTask/delect',controller.wx.task.delect);
  router.post('/wxTask/update',controller.wx.task.update);

  // 工作台
  router.get('/backHome/getIndexCount', controller.backHome.getIndexCount);
  router.post('/backHome/getEChartsCount', controller.backHome.getEChartsCount);
  router.get('/backHome/getAnno', controller.backHome.getAnno);

  // 系统设置
  router.post('/backSet/addNewAnno', controller.blogSet.addNewAnno);

};
