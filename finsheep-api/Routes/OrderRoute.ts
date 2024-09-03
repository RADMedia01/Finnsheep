import express from 'express';
const orderRouter=express.Router();
import { CreateOrder,
    GetAllOrders,
    GetUserOrders,
    CancelOrder,
    ChooseBoxForOrder,
} from '../Controllers/OrderController';


orderRouter.post('/',CreateOrder)
orderRouter.get('/all',GetAllOrders)
orderRouter.get('/my/:id',GetUserOrders)
orderRouter.get('/cancel/:id',CancelOrder)
orderRouter.get('/box',ChooseBoxForOrder)

export default orderRouter
