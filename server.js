import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
import path from 'path';

dotenv.config();

connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

//rest api
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`.bgCyan.white);
});
