# TouhouCloudDb

## Dev

### Api

引入ApiDoc提供静态Api文档

#### 生成

按照文档规范填写注释后运行

`apidoc -i 文件夹`

参考资料：[apiDoc - RESTful Web API 的内联文档 --- apiDoc - Inline Documentation for RESTful web APIs (apidocjs.com)](https://apidocjs.com/#example-full)

### Database

#### 数据库配置

修改`config/config.js`

#### 数据表格式同步

1. 修改`sequelize-automate.config.json`
2. 在目录下执行
`npm run sequelize-automate`
或者
`pnpm sequelize-automate`

- (_机器生成的真不如手写的好用_)
- **生产环境最好不要用App.js里的同步方法**
