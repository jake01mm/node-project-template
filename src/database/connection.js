const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// 显式加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// 确保加载必要的环境变量
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_DIALECT) {
    throw new Error('❌ 缺少必要的数据库配置，请检查 .env 文件中的 DB_NAME、DB_USER、DB_PASSWORD、DB_HOST 和 DB_DIALECT');
}

// 创建 Sequelize 实例
const sequelize = new Sequelize(
    process.env.DB_NAME, // 数据库名称
    process.env.DB_USER, // 用户名
    process.env.DB_PASSWORD, // 密码
    {
        host: process.env.DB_HOST, // 数据库主机
        port: process.env.DB_PORT || 3307, // 数据库端口
        dialect: process.env.DB_DIALECT, // 数据库类型（mysql、postgres 等）
        logging: false, // 禁用日志（可根据需要启用）
    }
);

module.exports = sequelize;
