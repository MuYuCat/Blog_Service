'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 引入egg-sequelize包
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 引入egg-cors包
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 引入egg-jwt包
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  valparams : {
    enable : true,
    package: 'egg-valparams'
  },
  mysql : {
    enable : true,
    package: 'egg-mysql'
  }
};

