<!--
 * @Author: MuYuCat
 * @Date: 2022-04-15 15:24:37
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-19 18:01:46
 * @Description: README
-->
# Blog_Service

个人博客__服务端
> Egg.js

### 项目结构
```
.
├── .github                     # github Action ci 相关配置
├── app                         # 应用源码
│   ├── controller              # 控制器文件
│   │   ├── base                # 基础控制器
│   │   ├── home                # 主页面控制器
│   │   └── user                # 登陆控制器
│   ├── model                   # 数据库model文件
│   │   └── user                # user数据库
│   ├── public                  # 静态文件
│   ├── service                 # 服务接口文件
│   │   ├── base                # 基础接口方法
│   │   └── user                # 登陆接口方法
│   └── router                  # 路由主控页面
├── config                      # 环境配置文件
│   ├── config.default          # 默认环境配置
│   └── plugin                  # 插件环境配置
├── database                    # migrations插件文件
│   ├── migrations              # 数据库迁移设计文件
│   │   └── users               # users数据库
│   └── config.json             # 数据库环境配置
├── logs                        # 项目自动生成的日志文件
├── run                         # 项目自动生成的文件
├── test                        # 项目自动生成的文件
├── typings                     # 项目自动生成的类型相关文件
├── .autod.conf.js              # 调用配置文件
├── .editorconfig               # editorConfig 配置文件
├── .eslintrc.js                # eslint 配置文件
├── .gitignore                  # git 排除配置文件
├── .prettierrc                 # prettier 配置文件
├── .sequelizerc                # sequelizerc 配置文件
├── .travis.yml                 # 数据库迁移配置文件
├── appveyor.yml                # 自动构建文件
├── jsconfig.json                                
├── package-lock.json
├── package.json
└── README.md

```
## 配置MySQL数据库

1. 安装并配置egg-sequelize插件（它会辅助我们将定义好的 Model 对象加载到 app 和 ctx 上）和mysql2模块：
    ```
    npm install --save egg-sequelize mysql2
    ```
2. 在config/plugin.js中引入 egg-sequelize 插件
    ```
    exports.sequelize = {
      enable: true,
      package: 'egg-sequelize',
    };
    ```
3. 在config/config.default.js进行数据库基础配置
4. sequelize 提供了sequelize-cli工具来实现Migrations
    ```
    npm install --save-dev sequelize-cli
    ```
5. egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在database目录下，所以我们在项目根目录下新建一个.sequelizerc配置文件
    ```
    'use strict'
    const path = require('path');
    module.exports = {
      config: path.join(__dirname, 'database/config.json'),
      'migrations-path': path.join(__dirname, 'database/migrations'),
      'seeders-path': path.join(__dirname, 'database/seeders'),
      'models-path': path.join(__dirname, 'app/model'),
    };
    ```
6. 初始化 Migrations 配置文件和目录
    ```
    npx sequelize init:config
    npx sequelize init:migrations
    // npx sequelize init:models
    ```
7. 行完后会生成database/config.json文件和database/migrations目录，我们修改一下database/config.json中的内容，将其改成我们项目中使用的数据库配置
8. 创建数据库
    ```
    npx sequelize db:create
    ```
9. 创建数据迁移表
    ```
    npx sequelize migration:generate --name=init-user
    ```
10. 执行完命令后，会在database / migrations / 目录下生成数据表迁移文件，然后定义表的属性
11. 执行 migrate 进行数据库变更
    ```
    # 升级数据库
    npx sequelize db:migrate
    #如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
    npx sequelize db:migrate:undo
    可以通过 `db:migrate:undo:all` 回退到初始状态
    npx sequelize db:migrate:undo:all
    ```

## 部署nginx服务器
> 提前下载好npm
1. 将代码打包
    ```
      cd baseDir
      npm install --production
      tar -zcvf ../release.tgz .
      tar -zcvf ../release.tgz --exclude=./node_modules --exclude=./.github --exclude=./.vscode --exclude=./typings --exclude=./logs
    ```
2. 上传至服务器相应位置，在该位置进行解压缩
    ```
      tar zxvf release.tgz
    ```
3. 随后开启服务
    ```
      npm start
    ```
