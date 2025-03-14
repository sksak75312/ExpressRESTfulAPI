import express from 'express';
import 'dotenv/config';
import users from '#routes/users.ts';

import { errorHandler } from '#middlewares/errorHandler.ts';

const app = express();

// Middleware 讓 Express 解析 JSON 
app.use(express.json());

app.use('/users', users);

// 錯誤處理的 Middleware 應放在最後處理
app.use(errorHandler);

app.listen(process.env.PORT);