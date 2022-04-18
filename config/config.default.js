/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {

  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650007439211_2219';

  // add your middleware config here
  config.middleware = [];

  /* 取消安全证书验证 */
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"], // 白名单
  };

  /* 连接mysql配置 */
  config.sequelize = {
    dialect: 'mysql',
    host: '121.199.160.17',
    port: 3306,
    database: 'blog_data',
    username: "MuYuCat",
    password: "8023Melody",
    timezone: '+08:00',
    exclude: 'index.js',
    dialectOptions: {
      connectTimeout:10000
    },
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      // 自动写入时间戳 created_at updated_at
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // 字段生成软删除时间戳 deleted_at
      deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true
    },
    pool: {
      max: 25,
      min: 0,
      idle: 10000
    },
  };

  /* 配置允许跨域 */
  config.cors = {
      credentials: true,
      origin: "*", //允许任何跨域，若只允许个别IP跨域，则：origin:['http://localhost:8080']
      allowMethods: 'GET,PUT,POST,DELETE,PATCH', // 被允许的请求方式
  };

  // add your user config here
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
