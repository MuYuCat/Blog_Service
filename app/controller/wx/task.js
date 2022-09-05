'use strict'

const BaseController = require('../base');
const moment = require('moment');
var uuid = require('uuid');

class wxTaskController extends BaseController {

  // 新增活动
  async add() {
    const {
      ctx,
      service,
      app
    } = this
    let {
      userId,
      taskName,
      dateType,
      beginTime,
      endTime,
      dateArr,
      selectDate,
      taskMsg,
      taskList,
      timeTitle
    } = ctx.request.body
    // const taskId = Date.now().toString(32);
    const taskId = uuid.v1();
    let isTaskList = JSON.parse(taskList);
    console.log('isTaskList', isTaskList);
    isTaskList.forEach(task => {
      task.userId = userId || '',
      task.parentsId = taskId || '',
      task.taskId = uuid.v1(),
      task.taskName = task.taskName || '',
      task.dateType = task.dateType || '',
      task.beginTime = task.beginTime || '',
      task.endTime = task.endTime || '',
      task.dateArr =(task.timeArr && task.timeArr.join(',')) || '',
      task.selectDate = task.selectDate || '',
      task.taskMsg = task.taskMsg || '',
      task.created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.stop_at = '9999-12-31',
      task.deleted_at = '9999-12-31',
      task.status = 'normal',
      task.progress = 0
    })
    let result = await service.wx.task.add({
      userId: userId||'',
      taskName: taskName||'',
      taskId: taskId,
      dateType: dateType || '' ,
      beginTime: beginTime || '' ,
      endTime: endTime || '' ,
      dateArr: dateArr || '' ,
      selectDate: selectDate || '' ,
      taskMsg: taskMsg || '',
      taskList: isTaskList || [],
      created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      stop_at: '9999-12-31',
      deleted_at: '9999-12-31',
      timeTitle: timeTitle || '',
      status: 'normal',
      progress: 0
    })
    this.success(result)
  }

  // 跟据userId查活动
  async findByUserId() {
    const {
      ctx,
      service
    } = this
    let {
      userId
    } = ctx.request.body
    const where = {
      id: `userId = '${userId}' AND status != 'delect' `
    }

    let result = await service.wx.task.findById(where)
    this.success(result);
  }

  // 根据taskId中止活动状态
  async stop() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      taskId: {
        type: 'string',
        required: true
      }
    });
    let {
      taskId
    } = ctx.request.body
    let result = await service.wx.task.stop({
      taskId: taskId,
      status: 'stop',
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      stop_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result);
  }

  // 根据taskId删除活动状态
  async delect() {
    const {
      ctx,
      service
    } = this
    ctx.validate({
      taskId: {
        type: 'string',
        required: true
      }
    });
    let {
      taskId
    } = ctx.request.body
    let result = await service.wx.task.delect({
      taskId: taskId,
      status: 'delect',
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      deleted_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    this.success(result);
  }

  // 根据taskId编辑活动
  async edit() {
    const {
      ctx,
      service,
      app
    } = this
    let {
      userId,
      taskId,
      taskName,
      dateType,
      beginTime,
      endTime,
      dateArr,
      selectDate,
      taskMsg,
      status,
      progress,
      timeTitle,
      taskList,
      delList,
    } = ctx.request.body
    let isTaskList = JSON.parse(taskList);
    let isDelList = JSON.parse(delList);
    console.log('isTaskList', isTaskList);
    isTaskList.forEach(task => {
      task.userId = userId || '',
      task.parentsId = taskId || '',
      task.taskId = task.taskId || '',
      task.taskName = task.taskName || '',
      task.dateType = task.dateType || '',
      task.beginTime = task.beginTime || '',
      task.endTime = task.endTime || '',
      task.dateArr = task.dateArr || '',
      task.timeArr = task.timeArr || '',
      task.selectDate = task.selectDate || '',
      task.created_at = task.created_at || moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.stop_at = task.stop_at || '9999-12-31',
      task.deleted_at = task.deleted_at || '9999-12-31',
      task.taskMsg = task.taskMsg || '',
      task.timeTitle = task.timeTitle || '',
      task.status = task.status || 'normal',
      task.progress = task.progress || 0
    })
    isDelList.forEach(task => {
      task.userId = userId || '',
      task.parentsId = taskId || '',
      task.taskId = task.taskId || '',
      task.updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.stop_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.deleted_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.status = 'delect'
    })
    let result = await service.wx.task.edit({
      taskId: taskId || '',
      taskName: taskName||'',
      dateType: dateType || '' ,
      beginTime: beginTime || '' ,
      endTime: endTime || '' ,
      dateArr: dateArr || '' ,
      selectDate: selectDate || '' ,
      taskMsg: taskMsg || '',
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      status: status || 'normal',
      progress: progress || 0,
      timeTitle: timeTitle || '',
      taskList: isTaskList || [],
      delList: isDelList || [],
    })
    this.success(result)
  }

  // 根据taskId更新活动
  async update() {
    const {
      ctx,
      service,
      app
    } = this
    let {
      userId,
      taskId,
      status,
      progress,
      taskList
    } = ctx.request.body
    let isTaskList = JSON.parse(taskList);
    console.log('isTaskList', isTaskList);
    isTaskList.forEach(task => {
      task.userId = task.userId || userId || '',
      task.parentsId = task.parentsId || taskId || '',
      task.taskId = task.taskId || '',
      task.updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      task.status = task.status || 'normal',
      task.progress = task.progress || 0
    })
    let result = await service.wx.task.update({
      taskId: taskId || '',
      updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      status: status || 'normal',
      progress: progress || 0,
      taskList: isTaskList || [],
    })
    this.success(result)
  }
}

module.exports = wxTaskController
