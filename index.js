import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import cloudinary from 'cloudinary';
import multer from "multer";
import authRoutes from "./routes/authRoutes.js";


// data import
import User from './models/User.js'
import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data/index.js'
import  Product  from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import BlogRoutes from "./routes/blogRoutes.js"


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



/* ROUTES */
app.use("/client", clientRoutes);
app.use('/blog', BlogRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// CONFIGURATION
const PORT = process.env.PORT || 500;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.set('strictQuery', true);
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // Blog.insertMany(dataBlog);
  })
  .catch((error) => console.log(`${error} did not connect`)); 

  export default {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  };