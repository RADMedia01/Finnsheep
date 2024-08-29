import { Request,Response,NextFunction } from "express";
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
import { Order } from "../Models/Order";
import { baseUrl, OrderStatus, PaymentStatus,BoxInfoList,IBoxItem } from "../Common/Common";
import { StockMaster } from "../Models/StockMaster";
import { Product } from "../Models/Product";
import { Payment } from "../Models/Payment";
import { ClearUserCart } from "./CartController";
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
    req.body.items.forEach(async(item:any)=>{
      let productStock=await StockMaster.findOne({product:item.productId})
      if(productStock){
        if(productStock.quantity<item.quantity){
          return res.status(400).json({success:false,message:"Insufficient stock for product "+productStock.name})
        }
      } 
    })



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

         if(model.paymentMethod!='cash') res.redirect(`${baseUrl}payment/new/${createdOrder.id}`)
        
          //payment via cash (COD)
          else{
         //update order status with payment status info 
          let paymentObj=await Payment.create({
            orderId:model.id,
            userId:req.body.userId,
            amount:req.body.total,
            paymentMethod:'cash',
            paymentStatus:PaymentStatus.COD,
          })

          let order=await Order.findById(model.id)
          if(order){
            order.status=OrderStatus.OrderReceived;
            order.paymentStatus=PaymentStatus.COD;
            await order.save()
          }

          //update product stock
          let item=req.body.items;
          item.forEach(async(prod:any)=>{
            let productStock=StockMaster.find({product:prod.productId})
            if(productStock){
              productStock.quantity-=prod.quantity
              await productStock.save() 
            }
          })
          //clear user cart
          ClearUserCart(req.body.userId);
        }
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

let ChooseBoxForOrder=(req:Request, res:Response)=>{
  const { cartItems}=req.body
  try {   
    
    let boxes = ChooseBox(cartItems)

    return res.status(200).json({
      success:true, data:boxes
    })

  } catch (err:any) {
    
  }
}

let CalculateVolume=(length:number,width:number,height:number):number=>{
  return Number(length*width*height);
}

//choose box type from product orders
const ChooseBox=(cartItems:any)=>{
  let boxesRequired:IBoxItem[]=[] 

  if(cartItems.length>0){

    let totalVolumeOfProducts=cartItems.reduce(async(volume:number,item:any)=>{
      let itemStockInfo=await StockMaster.findOne({product:item.productId})
      if(itemStockInfo){
        let productVolume=itemStockInfo.length*itemStockInfo.height*itemStockInfo.width;
        volume+=productVolume;
      } 
    },0);

    let boxVolumes:number[]=[];
    let remainingVolume:number=totalVolumeOfProducts;   
    let SmallBox=BoxInfoList[0];
    let MediumBox=BoxInfoList[1];
    let LargeBox=BoxInfoList[2];

    while(remainingVolume>0){
      //product is bigger than largest available box so get another one
        if(remainingVolume>LargeBox.volume){
          //get another box
          remainingVolume-=LargeBox.volume;
          boxesRequired.push(BoxInfoList[2])
          continue;
        }
        else{
          if(remainingVolume<SmallBox.volume) {
            boxesRequired.push(BoxInfoList[0])
            break;
          }
          if(remainingVolume>SmallBox.volume && remainingVolume<MediumBox.volume){
            boxesRequired.push(BoxInfoList[1])
            break;
          }
          if(remainingVolume>MediumBox.volume && remainingVolume<LargeBox.volume) {
            boxesRequired.push(BoxInfoList[2])
            break;
          }

        }

       
    }

    return boxesRequired;
  
  }
}

export {
  CreateOrder,
  GetAllOrders,
  GetUserOrders,
  CancelOrder,
  ChooseBoxForOrder
}