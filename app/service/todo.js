'use strict'

const BaseService = require('./base');

class ToDoService extends BaseService {

  // 新增ToDo
  async add(data) {
    const {
      ctx,
      app
    } = this;
    try {
      let addInfo = await app.mysql.query(
        `INSERT INTO task VALUES (?,?,?,?,?,?,?,?,?)`,[data.id,data.title,data.content,data.status,data.author,data.beginTime,data.endTime,data.created_at,data.updated_at]);
      if (addInfo) {
        return '新建成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '新建失败');
    }
  }

  // 查询TODO
  async find(params) {
    const {
      ctx,
      app
    } = this;
    console.log('findToDo', params);
    const conn = await app.mysql.beginTransaction();
    console.log('params', params);
    try {
      const rows = await conn.query(
        `SELECT * FROM task WHERE
          concat(${params.title}
            AND ${params.author}
            AND ${params.status}
            AND ${params.selectTime}) ORDER BY updated_at DESC LIMIT ${params.pageSize} OFFSET ${(params.pageNum - 1) * params.pageSize} `);
      const totalRows = await conn.query(
        `SELECT COUNT(*) AS SUM FROM task WHERE
          concat(${params.title}
            AND ${params.author}
            AND ${params.status}
            AND ${params.selectTime}) ORDER BY updated_at DESC`);
      await conn.commit();
      let total = totalRows[0].SUM;
      if (rows) {
        return {
          total,
          rows
        };
      }
    } catch (err) {
      await conn.rollback();
      console.log(err);
      ctx.throw(500, '查询失败');
    }
  }

  // 更新update
  async update(params) {
    const {
      ctx,
      app
    } = this;
    try {
      const res = await app.mysql.query(
        'UPDATE task SET title=?,content=?,status=?, author=?, beginTime=?, endTime=?, updated_at=? WHERE id=?', [
          params.title, params.content, params.status, params.author,params.beginTime,params.endTime, params.updated_at, params.id
        ]);
      if (res) {
        console.log('res', res, params)
        return '编辑成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '编辑失败');
    }
  }

  // 编辑ToDo状态
  async editSwitch(params) {
    const {
      ctx,
      app
    } = this;
    console.log('editToDo', params);
    try {
      const res = await app.mysql.query(
        `UPDATE task SET status='${params.status}', updated_at='${params.updated_at}' WHERE id='${params.id}'`);
      if (res) {
        return '编辑成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '编辑失败');
    }
  }

  // 删除ToDo
  async del(params) {
    const {
      ctx,
      app
    } = this;
    console.log('delToDo', params);
    try {
      const delInfo = await app.mysql.query(`DELETE FROM task WHERE id = '${params.id}'`);
      if (delInfo) {
        return '删除成功';
      }
    } catch (err) {
      console.log(err);
      ctx.throw(500, '删除失败');
    }
  }

}

module.exports = ToDoService
