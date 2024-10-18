import express from 'express';
const orderRouter=express.Router();
import { CreateOrder,
    GetAllOrders,
    GetUserOrders,
    CancelOrder,
    ChooseBoxForOrder,
    GetOrderSummary,
} from '../Controllers/OrderController';


orderRouter.post('/',CreateOrder)
orderRouter.get('/all',GetAllOrders)
orderRouter.get('/my/:id',GetUserOrders)
orderRouter.get('/cancel/:id',CancelOrder)
orderRouter.post('/box',ChooseBoxForOrder)
orderRouter.get('/summary', GetOrderSummary)

export default orderRouter
