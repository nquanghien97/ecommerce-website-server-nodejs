import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import productRouter from './routes/products.js';
import shoesRouter from './routes/category/shoes.js';
import clothesRouter from './routes/category/clothes.js';
import trendingRouter from './routes/trending.js';
import searchProductRouter from './routes/searchProduct.js';
import maleRouter from './routes/filter/gender/male.js';
import femaleRouter from './routes/filter/gender/female.js';
import childrenRouter from './routes/filter/children.js';
import sportRouter from './routes/filter/sport.js';
import registerRouter from './routes/auth/register.js';
import loginRouter from './routes/auth/login.js';
import cartRouter from './routes/cart.js';
import paginateRouter from './routes/pagination.js';
import suggestionsRouter from './routes/suggestionsProducts.js';
import wishListRouter from './routes/wishList.js';
import userRouter from './routes/user.js';

const app = express();
const port = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', productRouter);
app.use('/api/', shoesRouter);
app.use('/api/', clothesRouter);
app.use('/api/', trendingRouter);
app.use('/api/', searchProductRouter);
app.use('/api/', maleRouter);
app.use('/api/', femaleRouter);
app.use('/api/', childrenRouter);
app.use('/api/', sportRouter);

//auth
app.use('/api/auth', registerRouter);
app.use('/api/auth', loginRouter);

//cart
app.use('/api/', cartRouter);

//wishList
app.use('/api/', wishListRouter);

//pagination
app.use('/api/', paginateRouter);

//user
app.use('/api/', userRouter)

//suggestions
app.use('/api/', suggestionsRouter);

// set up mongoose
mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.r0wquqs.mongodb.net/?retryWrites=true&w=majority`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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