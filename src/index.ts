import express from 'express';
import 'dotenv/config';
import users from '#routes/users.ts';
import { connectDB } from "./config/database.js";
import { errorHandler } from '#middlewares/errorHandler.ts';

const app = express();
const port = process.env.PORT || 3000;
// 連接資料庫
connectDB();

// Middleware 讓 Express 解析 JSON 
app.use(express.json());

app.use('/users', users);

// 錯誤處理的 Middleware 應放在最後處理
app.use(errorHandler);

app.listen(port);