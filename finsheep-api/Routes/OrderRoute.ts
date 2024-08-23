import express from 'express';
const orderRouter=express.Router();
import { CreateOrder,
    GetAllOrders,
    GetUserOrders,
    CancelOrder
} from '../Controllers/OrderController';


orderRouter.post('/new',CreateOrder)
orderRouter.get('/all',GetAllOrders)
orderRouter.get('/my/:id',GetUserOrders)
orderRouter.get('/cancel/:id',CancelOrder)


export default orderRouter
