import { Request,Response,NextFunction } from "express";
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
import { Order } from "../Models/Order";
import { baseUrl, OrderStatus, PaymentStatus } from "../Common/Common";
import { Product } from "../Models/Product";
import { Payment } from "../Models/Payment";
import { IsProductsAvailable, UpdateProductStock } from "../Services/StockService";
import { CalculateOrderSummary, ChooseBox } from "../Services/OrderService";
import { PaymentWithSquare } from "../Services/PaymentService";
//import uuidv4 from "uuidv4"
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

// export async function CalculateOrderTotalPrice(order:any) {
//   let subTotal = 0;

//   for (const element of order.items) {
//     const curProduct = await Product.findById(element.productId);
//     if (curProduct) {
//       subTotal += curProduct.price * element.quantity;
//     }
//   }

//   order.subTotal = subTotal;  // Ensure it's a number, not an object
//   order.deliveryCharges = subTotal > 150 ? 0 : 4;
//   order.total = order.subTotal + order.deliveryCharges;

//   return order.total;
// }

let CreateOrder=async (req:Request, res:Response) => {
    //calculate total cost of order

  //check if each selected product has stock
  let isAvailable=await IsProductsAvailable(req.body.items)
  if(!isAvailable) return res.status(400).json({success:false, message:`Stock unavailable`})

    //get subtotal, tax and shipping
    let orderSummary=await CalculateOrderSummary(req.body.items,req.body)
    let shippingCost=orderSummary?.shipping ?? 0
    let taxCost=orderSummary?.tax ?? 0
    let subTotal=orderSummary?.subTotal ?? 0
  
    try {
        
      //create order 
      let model=await Order.create({
        total:req.body.total,
        subTotal:req.body.subTotal,
        deliveryCharges:shippingCost,
        items:req.body.items,
        userId:req.body.userId,
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,            
     })

     if(model.paymentMethod!='cash') {
      //got to payment endpoint
       
        return res.status(200).json({success:true,
          data:
          {
          orderId:model._id,
          amount:taxCost+shippingCost+subTotal,
          currency:req.body.currency,
        }
      })
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

let ChooseBoxForOrder=async(req:Request, res:Response)=>{
  const { cartItems}=req.body
  try {   
    
    let boxes = await ChooseBox(cartItems)
    return res.status(200).json({
      success:true, data:boxes
    })

  } catch (err:any) {
      res.status(500).json({
        success:true, message:err.message
      })
  }
}

let GetOrderSummary=async(req:Request, res:Response)=>{
  const { cartItems}=req.body
  try {   
    
    let orderSummary = await CalculateOrderSummary(cartItems)
    return res.status(200).json({
      success:true, data:orderSummary
    })

  } catch (err:any) {
      res.status(500).json({
        success:true, message:err.message
      })
  }
}




export {
  CreateOrder,
  GetAllOrders,
  GetUserOrders,
  CancelOrder,
  ChooseBoxForOrder,
  GetOrderSummary
}