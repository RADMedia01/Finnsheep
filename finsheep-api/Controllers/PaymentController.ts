import { Transaction } from './../Models/Transaction';
import { Request,Response,NextFunction } from "express"
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
require('dotenv').config()
import crypto from 'crypto'
import { Order } from "../Models/Order";
import { Payment } from "../Models/Payment";
import { OrderStatus, PaymentStatus, TransactionStatus, baseUrl, razorPayGatewayUrl } from "../Common/Common";
import { Product } from '../Models/Product';
import { StockMaster } from '../Models/StockMaster';
import { UpdateProductStock } from '../Services/StockService';
import { ClearUserCart } from '../Services/CartService';



const razorpayInstance=CreateRazorPayInstance();

let NewPayment=async(req: Request,res: Response) =>{
    const {orderId}=req.params;
    const {paymentMethod,amount,currency}=req.body
    try {
        console.log(orderId)
        //check if order is abandoned or expired
        let order=await Order.findOne({
            id: orderId
        });

        if(!order) return res.status(404).json({message:"Order not found"})

        if(order){
            if(order.status===OrderStatus.Cancelled ){
                return res.status(400).json({
                    success:false,
                    message:"Order is cancelled"
                })
            }
        }

        //different for different methods


        const paymentData = {
            amount: order.amount*100, // amount in paise (e.g., 500 = ₹5)  
            currency: order.currency,
            order_id: orderId,
            callback_url:`${baseUrl}verify`,
            customer: {
              name: '',
              email: '',
              contact: ''
            }
        }

        
        let payment=await razorpayInstance.payment.create(paymentData);
        if(payment){
                //create payment object 
                let paymentObj=new Payment({
                    id: payment.id,
                    userId:order.userId,
                    orderId:order.id,
                    paymentMethod:payment.method,
                    amount:order.amount,               
                })
                console.log(paymentObj);

                if(payment.method=='card'){
                    paymentObj.card=payment.card
                }
                if(payment.method=='upi'){
                    paymentObj.upi=payment.upi.vpa;
                }

                await paymentObj.save()
                
                //create new transaction
                let transaction=await Transaction.create({
                    orderId:order.id,
                    paymentId:payment.id,
                    amount:order.amount,                    
                })
                res.redirect(payment.url)
                //redirect user to payment gateway
                //const paymentUrl = `${razorPayGatewayUrl}${paymentObj.id}`;
                //res.redirect(paymentUrl);

        }

        
        
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

let VerifyPayment=async(req: Request,res: Response)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const orderId=razorpay_order_id;
    const paymentId=razorpay_payment_id;
    try {
        const secretKey=process.env.RAZORPAY_KEY_SECRET;
        if(secretKey) {
            const hmac=crypto.createHmac("sha256",secretKey);
            hmac.update(orderId+"|"+paymentId);
            const generatedSignature=hmac.digest("hex");

            if(generatedSignature===razorpay_signature){               
             //   let payment=await razorpayInstance.payment.fetch(paymentId)
             //   if(payment.status=='authorized')
                let orderObj=await Order.findByOne({id:orderId})

                const options = {
                    amount:orderObj.total,
                    currency:orderObj.currency,
                    payment_id: paymentId
                };
                

                let paymentInfo=razorpayInstance.payment.capture(options)
               
                if(paymentInfo.capture){
                    //payment success
                let paymentObj=new Payment({
                    id: razorpay_payment_id,
                    userId:orderObj.userId,
                    orderId:razorpay_order_id,
                    paymentMethod:orderObj.paymentMethod,
                    amount:orderObj.total,   
                        
                })

                let transaction=new Transaction({
                    orderId:razorpay_order_id,
                    paymentId:razorpay_payment_id,
                    amount:orderObj.total,  
                              
                })

                if(paymentInfo.status=='authorized') paymentObj.paymentStatus=PaymentStatus.Authorized
          
                if(paymentInfo.status=='captured') {
                    paymentObj.paymentStatus=PaymentStatus.Success
                    paymentObj.paidAt=Date.now()
                    //update order
                    orderObj.paidAt=Date.now;
                    orderObj.paymentStatus=PaymentStatus.Success;
                    orderObj.status=OrderStatus.OrderReceived;
                    orderObj.isPaid=true;

                    transaction.status=TransactionStatus.Success        
                }
                
                //update stock
                let updateStock=await UpdateProductStock(orderObj._id,orderObj.items);

                //clear cart
                let removeCart=await ClearUserCart(orderObj.userId)
                
                let saveData= Promise.all([await paymentObj.save(), await transaction.save(),await orderObj.save()])

                return res.status(200).json({
                    success:true,
                    message:"Payment Successful"
                })
                }
                else{
                    //payment failed
                    let paymentObj=new Payment({
                        id: razorpay_payment_id,
                        userId:orderObj.userId,
                        orderId:razorpay_order_id,
                        paymentMethod:orderObj.paymentMethod,
                        amount:orderObj.total,   
                        paymentStatus:PaymentStatus.Failed,
                    })
                    let transaction=new Transaction({
                        orderId:razorpay_order_id,
                        paymentId:razorpay_payment_id,
                        amount:orderObj.total,  
                        status:TransactionStatus.Failed                  
                    })
                    orderObj.paymentStatus=PaymentStatus.Failed
                    orderObj.status=OrderStatus.PaymentFailed;

                    let saveData= Promise.all([await paymentObj.save(), await transaction.save(),await orderObj.save()])
                   
                    return res.status(400).json({
                        success:false,
                        message:"Payment Failed "
                    })
                }
              
            }
            else{
                console.log(`Invalid signature`)
                //update payment and transaction status
                let paymentObj=await Payment.findById(paymentId)
                if(paymentObj) paymentObj.paymentStatus=PaymentStatus.Failed

                let transactionObj=await Transaction.findOne({paymentId:paymentId})
                if(transactionObj) transactionObj.status=TransactionStatus.Failed

                //update order 
                let orderObj=await Order.findById(orderId)
                if(orderObj){
                    orderObj.paymentStatus=PaymentStatus.Failed;
                    orderObj.status=OrderStatus.Pending;
                    orderObj.isPaid=false;
                }
                let saveData= Promise.all([await paymentObj.save(), await transactionObj.save(),await orderObj.save()])


                res.status(500).json({
                    success:false,
                    message:"Payment failed "
                })
            }

        } 
        
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

let Webhook=async(req:Request, res:Response) => {
    const webhookSecret = 'YOUR_WEBHOOK_SECRET';
    const signature = req.headers['x-razorpay-signature'];
    const event = req.body.event;
  
    // Verify the webhook signature
    if (!razorpayInstance.utils.verifyWebhookSignature(req.body, signature, webhookSecret)) {
      res.status(401).send('Invalid webhook signature');
      return;
    }
    const paymentId = req.body.payment.entity.id;
    const orderId = req.body.payment.entity.order_id;

    // Handle the payment notification
    if (event === 'payment.success') {        
      // Update the payment status in the payments collection
      let paymentObj=await Payment.findById(paymentId)
        if(paymentObj){            
            paymentObj.paymentMethod=req.body.payload.payment.method;        
            //get card info
            if(req.body.payload.payment.method=='card'){            
                paymentObj.cardLastFour=req.body.payload.payment.card.last4 
                paymentObj.cardExpiry
                =`${req.body.payload.payment.card.exp_month.toString()}/${req.body.payload.payment.card.exp_year.toString()}`
                paymentObj.cardType=req.body.payload.payment.card.network + "-" +req.body.payload.payment.card.type
            }
            paymentObj.paymentStatus=PaymentStatus.Success;
        }

        await paymentObj.save();


      let orderObj=await Order.findByIdAndUpdate(orderId,{
        $set: { isPaid: true, paidAt:Date.now,paymentStatus:PaymentStatus.Success }
      })

      //add transaction data
      

    }
    else if(event === 'payment.failed'){
        // Update the payment status in the payments collection
      let updatePaymentStatus=await Payment.findByIdAndUpdate(paymentId,
        { $set: { paymentStatus: PaymentStatus.Failed } }
      )


    }

}

export {
    NewPayment,
    VerifyPayment
}