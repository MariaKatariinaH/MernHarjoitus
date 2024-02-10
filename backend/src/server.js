import express, { request, response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Thing } from './models/Todo.js';
import todoRoutes from './routes/todoRoutes.js'

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get('/', (req, res) => {
  res.send('Successful response from your server, nice.');
});

app.use('/things', todoRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
     console.log('mongodb connected');
      })
    .catch(() => {
    console.log('error');
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));