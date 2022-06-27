'use strict'

const BaseController = require('./base');
const moment = require('moment');

class LogController extends BaseController {

  // 埋点日志提交
  async send() {
    const { ctx, service } = this;
    const {
      stamp,
      logType,
      userName,
      pageTitle,
      sapmodid,
      eleid,
      bowserParser,
      ip,
      address
    } = ctx.request.body;
    const where = {
      stamp: stamp || moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      log_type: logType || '未知',
      user_name: userName || '未知',
      page_title: pageTitle || '未知',
      sapmodid: sapmodid || '未知',
      eleid: eleid || '未知',
      browser_name: bowserParser?.browser?.name || '未知',
      browser_version: bowserParser?.browser?.version || '未知',
      engine: bowserParser?.engine?.name || '未知',
      os_name: bowserParser?.os?.name || '未知',
      os_version: bowserParser?.os?.version || '未知',
      os_version_name: bowserParser?.os?.versionName || '未知',
      platform_type: bowserParser?.platform?.type || '未知',
      platform_vendor: bowserParser?.platform?.vendor || '未知',
      ip: ip || '未知',
      address: address || '未知',
    };
    const result = await service.log.send(where);
    this.success(result);
  }
}

module.exports = LogController
