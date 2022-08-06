'use strict'

const BaseService = require('../base')

class TaskService extends BaseService {

  // 新增活动
  async add(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query(
        `INSERT INTO wxTask VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.userId,
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
        ]
      );
      data.taskList.map(async (task) => {
        console.log('task', task);
        try {
          await conn.query(
            `INSERT INTO wxTaskItem VALUES
            (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              task.userId,
              task.parentsId,
              task.taskId,
              task.taskName,
              task.dateType,
              task.beginTime,
              task.endTime,
              task.dateArr,
              task.selectDate,
              task.taskMsg,
              task.created_at,
              task.updated_at,
            ]
          );
          // await conn.commit();
        } catch(err) {
          console.log(err);
          // 错误事务回滚
          await conn.rollback();
          // 返回错误信息
          ctx.throw(500, '创建失败');
          throw err;
        }
      })
      // 提交事务
      await conn.commit();
      return '创建成功';
    } catch (err) {
      // 错误事务回滚
      await conn.rollback();
      // 返回错误信息
      console.log(err);
      ctx.throw(500, '创建失败');
    }
  }
}
module.exports = TaskService
