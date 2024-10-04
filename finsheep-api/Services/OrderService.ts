import { ProductsVariation } from "../Models/ProductsVariation";
import { BoxInfoList , IBoxItem, OriginAddress } from "../Common/Common";
import { TotalVolumeOfProducts } from "./ProductService";

const ChooseBox=async(cartItems:any[]):Promise<IBoxItem[]>=>{
    let boxesRequired:IBoxItem[]=[] 
      let remainingVolume:number=await TotalVolumeOfProducts(cartItems);
      let SmallBox=BoxInfoList[0];
      let MediumBox=BoxInfoList[1];
      let LargeBox=BoxInfoList[2];
  
      while(remainingVolume>0){
        //product is bigger than largest available box so get another one
          if(remainingVolume>LargeBox.volume){
            //get another box
            boxesRequired.push(BoxInfoList[2])
            remainingVolume-=LargeBox.volume;
            continue;
          }
          else{
            if(remainingVolume<SmallBox.volume) {
              boxesRequired.push(BoxInfoList[0])
              remainingVolume-=SmallBox.volume;
              break;
            }
            if(remainingVolume>SmallBox.volume && remainingVolume<MediumBox.volume){
              boxesRequired.push(BoxInfoList[1])
              remainingVolume-=MediumBox.volume;
              break;
            }
            if(remainingVolume>MediumBox.volume && remainingVolume<LargeBox.volume) {
              boxesRequired.push(BoxInfoList[2])
              remainingVolume-=LargeBox.volume;
              break;
            }
  
          }
  
         
      }
      return boxesRequired;
    }

const CalculateOrderSummary=async(cartItems:any[],payload?:any)=>{

  try {
    let OrderSummary=await Promise.all([
      await CalculateSubTotal(cartItems),
      await CalculateTax(cartItems,payload),
      await CalculateShipping(cartItems),
    ])

   if(OrderSummary){
    return {
      subTotal:OrderSummary?.[0] ?? 0,
      tax:OrderSummary?.[1] ?? 0,
      shipping:OrderSummary?.[2] ?? 0,
    }
   }

  } catch (error:any) {
    
  }

 

} 

const CalculateSubTotal=async(cartItems:any[])=>{
  let total=0;
  try {
    if(cartItems.length>0){
      for(let item of cartItems){
        let currentStock=await ProductsVariation.findById(item.productVariationId)
        if(currentStock){
          total+=currentStock.retailPrice*item.quantity
        }
      }
    }

    return total;
  } catch (error:any) {
    
  }
}

const CalculateTax=async(cartItems:any[],payload:any)=>{
  let tax=0
  try {
    // const request={
    //   "apiLoginID": "YOUR_API_LOGIN_ID",
    //   "apiToken": "YOUR_API_TOKEN",
    //   "cartID": "YOUR_CART_ID",
    //   "customerID": payload.userId,
    //   "deliveredBySeller": true,
    //   "exemptionNo": "YOUR_EXEMPTION_NO",
    //   "items": cartItems,
    //   "origin": OriginAddress,
    //   "destination": payload.shippingAddress
    // }

    //get tax details from taxcloud api



    return tax;
  } catch (error:any) {
    
  }
}

const CalculateShipping=async(cartItems:any[])=>{
  let shipping=0;
  return shipping;
}


  export {
    ChooseBox,
    CalculateOrderSummary
  }

