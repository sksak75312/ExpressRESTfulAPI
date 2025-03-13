import express from 'express';

const app = express();

const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello, Express API with Typescript')
})

app.listen(port)