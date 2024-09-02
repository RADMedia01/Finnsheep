import { DbConnect } from './Config/DbConfig';
import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';

//routes
import productRouter from './Routes/ProductRoute';
import categoryRouter from './Routes/CategoryRoute';
import itemSizeRouter from './Routes/ItemSizeRoutes';
import orderRouter from './Routes/OrderRoute';
import paymentRouter from './Routes/PaymentRoute';
import userRouter from './Routes/UserRoute';
import blogRouter from './Routes/BlogRouter';

dotenv.config();
const port=process.env.PORT || 2000;

//app config
const app = express()
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({limit: '2mb',extended: false}));
app.use(cors({
    origin: true,
    methods: ["GET, POST, PATCH, DELETE, PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.static('uploads'));
app.use("/uploads",express.static('uploads'));

//configure routes
app.use('/api/product',productRouter)
app.use('/api/category',categoryRouter)
app.use('/api/size/',itemSizeRouter)
app.use('/api/order/',orderRouter)
app.use('/api/payment/',paymentRouter)
app.use('/api/user/',userRouter)
app.use('/api/blog/', blogRouter)


app.listen(port,async()=>{
    await DbConnect();
    console.log(`running on port ${port}`);
})
