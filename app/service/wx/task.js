'use strict'

const BaseService = require('../base')
var uuid = require('uuid');

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
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          data.stop_at,
          data.deleted_at,
          data.timeTitle,
          data.status,
          data.progress,
        ]
      );
      data.taskList.map(async (task) => {
        console.log('task', task);
        try {
          await conn.query(
            `INSERT INTO wxTaskItem VALUES
            (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
              task.stop_at,
              task.deleted_at,
              task.status,
              task.progress,
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

  // 基于id查询活动
  async findById(params) {
    const {
      ctx,
      app
    } = this;
    console.log('findTaskById', params);
    const conn = await app.mysql.beginTransaction();
    try {
      const data = await conn.query(
        `SELECT * FROM wxTask WHERE
          concat(${params.id}) ORDER BY created_at DESC`);
      data.map(async (mainTask)=>{
        const where = `parentsId = '${mainTask.taskId}'`
        const taskList = await conn.query(
          `SELECT * FROM wxTaskItem WHERE
            concat(${where}) ORDER BY created_at DESC`);
        console.log(taskList);
        mainTask.taskList = taskList;
      })
      // const taskList = await conn.query(
      //   `SELECT * FROM wxTaskItem WHERE
      //     concat(${params.id})`);
      console.log(data)
      await conn.commit();
      return data;
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 基于id中止活动
  async stop(params) {
    const {
      ctx,
      app
    } = this;
    try {
      const res = await app.mysql.query(
        'UPDATE wxTask SET status=?,updated_at=?,stop_at=?  WHERE taskId=?', [
        params.status, params.updated_at, params.stop_at, params.taskId
      ]);
      return '活动中止成功';
    } catch (err) {
      console.log(err);
      ctx.throw(500, '活动中止失败');;
    }
  }

  // 基于id删除活动
  async delect(params) {
    const {
      ctx,
      app
    } = this;
    try {
      const res = await app.mysql.query(
        'UPDATE wxTask SET status=?,updated_at=?,deleted_at=?  WHERE taskId=?', [
        params.status, params.updated_at, params.deleted_at, params.taskId
      ]);
      return '活动删除成功';
    } catch (err) {
      console.log(err);
      ctx.throw(500, '活动删除失败');;
    }
  }

  // 基于id编辑活动
  async edit(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query(
        'UPDATE wxTask SET taskName=?, dateType=?,beginTime=?,endTime=?,dateArr=?,selectDate=?,taskMsg=?,updated_at=?,timeTitle=?,status=?,progress=? WHERE taskId=?',
        [
          data.taskName,
          data.dateType,
          data.beginTime,
          data.endTime,
          data.dateArr,
          data.selectDate,
          data.taskMsg,
          data.updated_at,
          data.timeTitle,
          data.status,
          data.progress,
          data.taskId,
        ]
      );
      data.taskList.map(async (task) => {
        console.log('task', task);
        if (task.taskId) {
          try {
            await conn.query(
              'UPDATE wxTaskItem SET taskName=?, dateType=?,beginTime=?,endTime=?,dateArr=?,selectDate=?,taskMsg=?,updated_at=?,status=?,progress=? WHERE taskId=?',
              [
                task.taskName,
                task.dateType,
                task.beginTime,
                task.endTime,
                task.dateArr,
                task.selectDate,
                task.taskMsg,
                task.updated_at,
                task.status,
                task.progress,
                task.taskId,
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
        } else {
          const taskId = uuid.v1();
          try {
            await conn.query(
              `INSERT INTO wxTaskItem VALUES
              (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                task.userId,
                task.parentsId,
                taskId,
                task.taskName,
                task.dateType,
                task.beginTime,
                task.endTime,
                task.timeArr && task.timeArr.join(',') || '',
                task.selectDate,
                task.taskMsg,
                task.created_at,
                task.updated_at,
                task.stop_at,
                task.deleted_at,
                task.status,
                task.progress,
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

  // 基于id更新活动
  async update(data) {
    const {
      ctx,
      app
    } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query(
        'UPDATE wxTask SET updated_at=?,status=?,progress=? WHERE taskId=?',
        [
          data.updated_at,
          data.status,
          data.progress,
          data.taskId,
        ]
      );
      data.taskList.map(async (task) => {
        console.log('task', task);
        try {
            await conn.query(
              'UPDATE wxTaskItem SET updated_at=?,status=?,progress=? WHERE taskId=?',
              [
                task.updated_at,
                task.status,
                task.progress,
                task.taskId,
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
