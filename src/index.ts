import express from 'express';

import users from './routes/users.ts'

const app = express();

const port = 9000;

// Middleware 讓 Express 解析 JSON 
app.use(express.json())

app.use('/users', users)

app.listen(port)