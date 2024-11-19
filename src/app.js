const express = require('express');
const dotenv = require('dotenv');
const db = require('./database/connection');
const path = require('path');
// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const app = express();
app.use(express.json());

// 测试数据库连接
db.authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch((err) => console.error('❌ Unable to connect to database:', err.message));

// 示例路由
app.get('/', (req, res) => {
  res.send('Node.js Project Template is Running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
