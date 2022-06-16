'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      BIGINT,
      STRING,
      DATE,
      ENUM,
      TEXT
    } = Sequelize;
    // 创建表
    await queryInterface.createTable('article', {
      id: {
        type: BIGINT(50).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: STRING(255),
        allowNull: true,
        defaultValue: '',
        comment: '文章标题',
        unique: false
      },
      content: {
        type: TEXT,
        allowNull: true,
        comment: '文章内容',
        defaultValue: ''
      },
      author: {
        type: STRING(255),
        allowNull: true,
        unique: false
      },
      type: {
        type: STRING(10),
        allowNull: true,
        unique: false
      },
      status: {
        type: BIGINT(10),
        allowNull: true,
        unique: false
      },
      tags: {
        type: STRING(255),
        allowNull: true,
        unique: false
      },
      url: {
        type: STRING(255),
        allowNull: true,
        unique: false
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('article')
  }
};
