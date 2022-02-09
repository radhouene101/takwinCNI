
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

dotenv.config();
//  require('dotenv').config({path : './.env'});
//  require ('dotenv/config');
const app = express();

console.log(process.env.CONNECTION_URL);
app.use(bodyParser.json({ limit: '30mb', extended: true }))


app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT|| 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
