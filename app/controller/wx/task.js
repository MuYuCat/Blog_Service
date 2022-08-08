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
      taskList
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
      task.updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
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
      id: `userId = '${userId}'`
    }

    let result = await service.wx.task.findById(where)
    this.success(result);
  }

}

module.exports = wxTaskController
