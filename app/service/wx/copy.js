'use strict'

const BaseService = require('../base')

class TaskService extends BaseService {

  // 新增活动
  async add(data) {
    const {
      ctx,
      app
    } = this;
    try {

      let addInfo = await app.mysql.query(
        `INSERT INTO wxTask VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.userId,
        data.taskName,
        data.taskId,
        data.dateType,
        data.beginTime,
        data.endTime,
        data.dateArr,
        data.selectDate,
        data.taskMsg,
        data.created_at,
        data.updated_at,
        ]);
      if (addInfo) {
        return '创建成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '创建失败');
    }
  }
}
module.exports = TaskService
