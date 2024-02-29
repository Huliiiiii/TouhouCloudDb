# TouhouCloudDb

## Dev

### Database

#### 数据库配置

修改`config/config.json`

#### 数据表格式同步

1. 修改`sequelize-automate.config.json`
2. 在目录下执行`sequelize-automate -c sequelize-automate.config.json`

- (_机器生成的真不如手写的好用_)
- **生产环境最好不要用App.js里的同步方法**
