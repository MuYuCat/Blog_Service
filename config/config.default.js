'use strict';

module.exports = appInfo => {

  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650007439211_2219';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // token加密密钥，自行配置
  config.jwt = {
    expire: 7100,
    secret: 'www.muyucat.com',
  };

  // 参数校验
  config.valparams = {
    locale : 'zh-cn',
    throwError: true
  };

  /* sequelize连接mysql配置 */
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
  /* mysql连接mysql配置 */
  config.mysql = {
    client: {
      // host
      host: '121.199.160.17',
      // 端口号
      port: '3306',
      // 用户名
      user: "MuYuCat",
      // 密码
      password: "8023Melody",
      // 数据库名
      database: 'blog_data',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    default: {
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

  // 需要配合 security 插件一块使用
  config.security = {
    csrf: {
      enable: false,
    },
      // 跨域白名单
    domainWhiteList: [ 'http://localhost:8080' ],
  };

  /* 配置允许跨域 */
  config.cors = {
      credentials: true,
      origin: ctx => ctx.get('origin'), //允许任何跨域，若只允许个别IP跨域，则：origin:['http://localhost:8080']
      allowMethods: 'GET,PUT,POST,DELETE,PATCH', // 被允许的请求方式
  };

  // add your user config here
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
