'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index);
  router.get('/users/findAll', controller.user.findAll);
  router.get('/users/findById/:id', controller.user.findById);
  router.post('/users/add', controller.user.add);
  router.put('/users/edit', controller.user.edit);
  router.delete('/users/del/:id', controller.user.del);
};
