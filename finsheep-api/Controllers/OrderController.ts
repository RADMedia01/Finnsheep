import { Request,Response,NextFunction } from "express";
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
import { Order } from "../Models/Order";
import { baseUrl, OrderStatus, PaymentStatus,BoxInfoList,IBoxItem } from "../Common/Common";
import { StockMaster } from "../Models/StockMaster";
import { Product } from "../Models/Product";
import { Payment } from "../Models/Payment";
import { IsProductsAvailable, UpdateProductStock } from "../Services/StockService";
import { ClearUserCart } from "../Services/CartService";
import { ChooseBox } from "../Services/OrderService";
const razorpayInstance=CreateRazorPayInstance();

export function CalculateOrderTotalPrice(order:any){
    order.subTotal=  order.items.reduce(async(sum:number,element:any)=>{
        let curProduct=await Product.findById(element.productId)
        if(curProduct) return sum + (curProduct.price*element.qty)
    },0)
    order.deliveryCharges=(order.subTotal>150) ? 0: 4;
    order.total=order.subTotal+order.deliveryCharges;

    //write freezer box logic depending on volume of product and box
    return order.total;
}

let CreateOrder=async (req:Request, res:Response) => {
    //calculate total cost of order

  //check if each selected product has stock
  let isAvailable=await IsProductsAvailable(req.body.items)
  if(!isAvailable) return res.status(400).json({success:false, message:`Stock unavailable`})

    //let total=CalculateOrderTotalPrice(req.body)
    const options = {
      amount: req.body.total * 100, // convert amount to paise
      currency: req.body.currency, // convert currency to paise
      receipt: `order_`, //append order id
      payment_capture: 1,
    };
  
    try {
        
         
         //creating a order in razorpay
      //console.log(options);
      const createdOrder = await razorpayInstance.orders.create(options);
      //console.log(createdOrder);
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

         if(model.paymentMethod!='cash') {
            return res.status(200).json({success:true,data:createdOrder})
         }
      
          //payment via cash (COD)
          else{
         //update order status with payment status info 
         console.log(model)
          let paymentObj=await Payment.create({
            orderId:model.id,
            userId:req.body.userId,
            amount:req.body.total,
            paymentMethod:'cash',
            paymentStatus:PaymentStatus.COD,
          })

          let order=await Order.findOne({id: model.id})
         
          if(order){
            order.status=OrderStatus.OrderReceived;
            order.paymentStatus=PaymentStatus.COD;
            await order.save()
          }

          //update product stock
          let updateStock=await UpdateProductStock(order._id,req.body.items);
          if(!updateStock)  return res.status(400).json({success:false,message:`Stock not updated`})
          //clear user cart

          //ClearUserCart(req.body.userId);
          return res.status(200).json({
            success:true,
            message:`Order Created with Cash on delivery`
          })
        }
      }
      else{
        return res.status(400).json({
          success:false,
          message:`Problem while creating order`
        })
      }
      
    } catch (err:any) {
      console.log(err.message);
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

let ChooseBoxForOrder=(req:Request, res:Response)=>{
  const { cartItems}=req.body
  try {   
    
    let boxes = ChooseBox(cartItems)

    return res.status(200).json({
      success:true, data:boxes
    })

  } catch (err:any) {
      res.status(500).json({
        success:true, message:err.message
      })
  }
}

let CalculateVolume=(length:number,width:number,height:number):number=>{
  return Number(length*width*height);
}



export {
  CreateOrder,
  GetAllOrders,
  GetUserOrders,
  CancelOrder,
  ChooseBoxForOrder
}