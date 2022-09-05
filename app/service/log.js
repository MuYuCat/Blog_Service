'use strict'

const BaseService = require('./base')

class LogService extends BaseService {

  // 新增埋点日志
  async send(data) {
    const {
      ctx,
      app
    } = this;
    try {
      let sendInfo = await app.mysql.query(
        `INSERT INTO log VALUES
        (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.stamp,
          data.log_type,
          data.user_name,
          data.page_title,
          data.sapmodid,
          data.eleid,
          data.browser_name,
          data.browser_version,
          data.engine,
          data.os_name,
          data.os_version,
          data.os_version_name,
          data.platform_type,
          data.platform_vendor,
          data.ip,
          data.address
        ]);
      if (sendInfo) {
        return '埋点成功';
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LogService
