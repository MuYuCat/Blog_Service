/*
 * @Author: MuYuCat
 * @Date: 2022-04-15 15:24:37
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 10:44:43
 * @Description: file content
 */
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
};

