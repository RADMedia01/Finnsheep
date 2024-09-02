import express from 'express';
const paymentRouter=express.Router();
import {  NewPayment,
    VerifyPayment
} from '../Controllers/PaymentController';


paymentRouter.post('/new/:orderId',NewPayment)
paymentRouter.get('/new/:orderId',NewPayment)
paymentRouter.post('/verify',VerifyPayment)

export default paymentRouter
