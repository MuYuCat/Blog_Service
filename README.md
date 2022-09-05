# Blog_Service

个人博客__服务端
> Egg.js

### 项目结构
```
Blog_Service
├─ .autod.conf.js
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ .sequelizerc
├─ .travis.yml
├─ README.md                  // README
├─ app
│  ├─ controller              // 控制器
│  │  ├─ article.js           // 文章
│  │  ├─ base.js              // 基础
│  │  ├─ dict.js              // 字典
│  │  ├─ home.js              // 初始化
│  │  ├─ log.js               // 埋点
│  │  ├─ user.js              // 登陆
│  │  └─ wx                   // 微信小程序
│  │     ├─ login.js          // 登陆
│  │     └─ task.js           // 活动
│  ├─ middleware
│  │  ├─ errorHandler.js      // 错误统一处理
│  │  └─ jwt.js               // jwt鉴权
│  ├─ model                   // Eggjs数据库(x)
│  │  ├─ article.js
│  │  └─ user.js
│  ├─ public                  // 公共文件(x)
│  ├─ router.js               // 接口路由
│  └─ service                 // 服务器
│     ├─ article.js           // 文章
│     ├─ base.js              // 基础
│     ├─ dict.js              // 字典
│     ├─ log.js               // 埋点
│     ├─ user.js              // 登陆
│     └─ wx                   // 微信小程序
│        ├─ login.js          // 登陆
│        └─ task.js           // 活动
├─ appveyor.yml
├─ config
│  ├─ config.default.js
│  └─ plugin.js
├─ jsconfig.json
└─ package.json
```
### 数据库
> Egg 推荐sequelize语法 (x)
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


> 使用MySQL语法 (v)

1. 使用Navicat 新建MySQL数据库
2. 服务端使用MySql语法进行开发
    - 不推荐使用拼接方法，而是使用Eggjs的query写法


## 部署nginx服务器
> 提前下载好npm
1. 将代码打包
    ```
      cd baseDir
      npm install --production
      tar -zcvf ../release.tgz .
    ```
2. 上传至服务器相应位置，在该位置进行解压缩
    ```
      tar zxvf release.tgz
    ```
3. 随后开启服务
    ```
      npm start
    ```

