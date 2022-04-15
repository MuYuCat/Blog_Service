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
    database: 'testdata',
    username: "MuYuCat",
    password: "8023Melody",
    dialectOptions: {
      connectTimeout:1000000
    },
    define: {
      timestamps: false
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
      allowMethods: 'GET,PUT,POST,DELETE', // 被允许的请求方式
  };

  // add your user config here
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
