import { Request,Response,NextFunction } from "express";
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
import { Order } from "../Models/Order";
import { baseUrl, OrderStatus } from "../Common/Common";
const razorpayInstance=CreateRazorPayInstance();

export function CalculateOrderTotalPrice(order:any){
    order.subTotal=  order.items.reduce((sum:number,element:any)=>{
        return sum + (element.price*element.qty)
    },0)
    order.deliveryCharges=(order.subTotal>150) ? 0: 4;
    order.total=order.subTotal+order.deliveryCharges;

    //write freezer box logic depending on volume of product and box
    return order.total;
}

let CreateOrder=async (req:Request, res:Response) => {
    //calculate total cost of order
    let total=CalculateOrderTotalPrice(req.body)
    const options = {
      amount: total * 100, // convert amount to paise
      currency: req.body.currency, // convert currency to paise
      receipt: `order_`, //append order id
      payment_capture: 1,
    };
  
    try {
        
         
         //creating a order in razorpay
      const createdOrder = await razorpayInstance.orders.create(options);
      if(createdOrder){         
         //create order object and save in db for info
         let model=await Order.create({
            id:createdOrder.id,
            total:req.body.total,
            subTotal:req.body.subTotal,
            deliveryCharges:req.body.deliveryCharges,
            items:req.body.items,
            userId:req.body.userId,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,            
         })

         //redirect to newpayment/orderId
         res.redirect(`${baseUrl}payment/new/${createdOrder.id}`)

      }
      else{
        return res.status(400).json({
          success:false,
          message:`Problem while creating order`
        })
      }
      
    } catch (err:any) {
      return res.status(400).json({
        success:false,
        message: err.message
      })
    }
}

let GetAllOrders = async (req:Request, res:Response) => {
  try {
    //search, pagination, filter added later
    let orders = await Order.findOne({}).populate("items.productId");
    return res.status(200).json({ success:true, data:orders });
  
  } catch (err:any) {
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
} 

let GetUserOrders=async(req:Request, res:Response)=>{
  const {id}=req.params;
  try {
    let orders = await Order.find({userId:id}).populate("items.productId");
    if(orders){
      return res.status(200).json({
        success:true,
        data:orders
      })
    }
    else{
      return res.status(200).json({
        success:true,
        data:[]
      })
    }
    
  } catch (err:any) {
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

let CancelOrder=async(req:Request, res:Response)=>{
  const {id}=req.params;
  try {
    let order = await Order.findById(id)
    if(!order) return res.status(404).json({message:"Order not found"})
    if(order){
          if(order.status===OrderStatus.Cancelled){
              return res.status(400).json({
                  success:false, message:"Order is cancelled "
              })
          }
    }

   if(order.userId==req.body.userId){
    order.status=OrderStatus.Cancelled;
    await order.save();

    //if order cancel and payment via card or upi
    return res.status(200).json({
      success:true,message:`Order Cancelled`
    })
   }

   else{
    return res.status(400).json({
      success:false,message:`Can't cancel someone else's order`
    })
   }

   
    
  } catch (err:any) {
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export {
  CreateOrder,
  GetAllOrders,
  GetUserOrders,
  CancelOrder
}