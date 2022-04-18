'use strict'

const md5 = require('md5');

module.exports = (app) => {
  const { STRING, BIGINT, ENUM, DATE } = app.Sequelize
  const User = app.model.define(
    'user',
    {
      id: { type: BIGINT(50).UNSIGNED, primaryKey: true, autoIncrement: true },
      username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名称', unique: false},
      password: { type: STRING(200), allowNull: false, defaultValue: '',
        set(value) {
          const enCrpty = md5(value + 'secret');
          this.setDataValue('password', enCrpty);
        },
      },
      avatar_url: { type: STRING(200), allowNull: true, defaultValue: '' },
      sex: { type: ENUM, values: ['男','女','保密'], allowNull: true, defaultValue: '保密', comment: '用户性别'},
      age: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户年龄', unique: false},
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE
    },
    {
      timestamps: true, //自动增加创建时间
      tableName: 'users' //设置表名称
    }
  )
  User.sync({force:true})
  return User
}
