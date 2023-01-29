import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { URI_DB } from './configs.js';
import productRouter from './routes/products.js';
import shoesRouter from './routes/category/shoes.js';
import clothesRouter from './routes/category/clothes.js';
import trendingRouter from './routes/trending.js';
import searchProductRouter from './routes/searchProduct.js'


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', productRouter);
app.use('/api/', shoesRouter);
app.use('/api/', clothesRouter);
app.use('/api/', trendingRouter);
app.use('/api/', searchProductRouter)

// set up mongoose
mongoose.set("strictQuery", false);

mongoose.connect(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  });

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project CRUD!!',
  });
});

app.listen(port, () => {
  console.log(`Our server is live on ${port}`);
});