## **Node.js 通用项目模板: Node-Project-Template**

### **简介**
这是一个通用的 Node.js 项目模板，集成了以下功能：
- 使用 `Express` 搭建 Web 服务器。
- 使用 `Sequelize` 作为数据库 ORM。
- 支持使用 `.env` 文件管理环境变量。
- 提供 Docker 支持，方便本地和生产环境的部署。
- 配备基本的目录结构，适合中小型项目的开发。

---

### **功能概览**
- **快速搭建 API 服务**。
- **数据库支持：MySQL（可扩展为 PostgreSQL、SQLite 等）**。
- **配置良好的开发环境（`nodemon`、`dotenv`）**。
- **简单易扩展的文件夹结构**。

---

### **目录结构**
以下是最终项目的目录结构：
```plaintext
node-project-template/
├── config/                # 全局配置文件
│   └── env.js             # 处理环境变量的模块
├── docker/                # Docker 配置文件
│   ├── docker-compose.yml # Docker Compose 配置
│   └── mysql_data_new/    # MySQL 数据卷存储目录
├── migrations/            # 数据库迁移文件
├── models/                # 数据模型定义
│   ├── index.js           # 模型入口文件
│   └── user.js            # 示例模型
├── seeders/               # 数据填充文件
├── src/                   # 源代码目录
│   ├── app.js             # 应用程序入口
│   └── database/          # 数据库相关逻辑
│       └── connection.js  # 数据库连接逻辑
├── .env                   # 环境变量文件
├── .gitignore             # Git 忽略文件
├── package.json           # 项目依赖管理
├── package-lock.json      # 精确锁定的依赖版本
└── README.md              # 项目说明文件
```

---

### **开发流程**

#### **1. 创建项目目录**
```bash
mkdir node-project-template
cd node-project-template
```

#### **2. 初始化项目**
使用 `npm` 初始化项目：
```bash
npm init -y
```

---

#### **3. 安装依赖**

##### **安装核心依赖**
```bash
npm install express sequelize mysql2 dotenv
```

##### **安装开发依赖**
```bash
npm install --save-dev nodemon cross-env
```

---

#### **4. 配置 `.env` 文件**
在项目根目录下创建 `.env` 文件，写入以下内容：
```plaintext
DB_HOST=localhost
DB_PORT=3307
DB_USER=newuser
DB_PASSWORD=newuser1234
DB_NAME=new_database
DB_DIALECT=mysql
PORT=3001
```

---

#### **5. 配置文件和文件夹**

##### **5.1 创建 `src/database/connection.js`**
配置数据库连接逻辑：
```javascript
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
```

##### **5.2 创建 `src/app.js`**
创建应用程序入口：
```javascript
const express = require('express');
const sequelize = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Node.js Project Template is Running!');
});

// 测试数据库连接
sequelize
  .authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch((err) => console.error('❌ Database connection error:', err));

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
```

##### **5.3 配置 Docker**
在 `docker/docker-compose.yml` 中添加：
```yaml
version: '3.8'

services:
  mysql_new:
    container_name: mysql_new_container
    image: mysql:latest
    restart: always
    ports:
      - "3307:3306"
    environment:
      MYSQL_ROOT_PASSWORD: newroot1234
      MYSQL_DATABASE: new_database
      MYSQL_USER: newuser
      MYSQL_PASSWORD: newuser1234
    volumes:
      - ./mysql_data_new:/var/lib/mysql
```

启动 Docker 服务：
```bash
docker-compose up -d
```

---

#### **6. 初始化 Sequelize**

初始化 Sequelize 的目录结构：
```bash
npx sequelize-cli init
```

生成的目录包括：
- `migrations/`
- `models/`
- `seeders/`
- `config/`

---

#### **7. 添加模型**
以 `User` 模型为例：
```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
```

运行迁移：
```bash
npx sequelize-cli db:migrate
```

---

### **注意事项**

1. **环境变量管理：**
   - 确保 `.env` 文件不被提交到版本控制系统，添加到 `.gitignore` 中。

2. **端口冲突：**
   - 如果端口被占用，使用 `lsof -i :<port>` 查找并终止占用进程。

3. **Docker 配置：**
   - 确保 `docker-compose.yml` 文件中的端口映射与 `.env` 文件一致。

4. **数据库配置：**
   - 使用 `dotenv` 加载环境变量，避免硬编码数据库信息。

---

### **常用命令**

#### **开发模式**
```bash
npm run dev
```

#### **启动生产模式**
```bash
npm start
```

#### **数据库操作**
- 创建迁移：
  ```bash
  npx sequelize-cli migration:generate --name migration-name
  ```
- 运行迁移：
  ```bash
  npx sequelize-cli db:migrate
  ```
- 回滚迁移：
  ```bash
  npx sequelize-cli db:migrate:undo
  ```

---

### **贡献**
如果你对这个模板有任何改进建议，欢迎提交 PR 或 issue！

---

完成后，你可以将这段整理后的内容写入项目的 `README.md` 文件。这样不仅可以方便团队合作，也能在未来快速复用你的模板项目。

如果你还有其他需求或者问题，随时告诉我！ 😊