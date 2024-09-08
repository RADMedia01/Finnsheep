import { ProductsVariation } from "./../Models/ProductsVariation";

export const TotalVolumeOfProducts=async(cartItems:any[])=>{
    let totalVolumeOfProducts = 0; //sum of producr volume * quantity
      try {
        if(cartItems.length>0){
          for(let item of cartItems){
            let itemStockInfo=await ProductsVariation.findById(item.productVariationId)
            if(itemStockInfo){
              totalVolumeOfProducts+=itemStockInfo.length*itemStockInfo.height*itemStockInfo.width*item.quantity;
            } 
          }
        }
        return totalVolumeOfProducts
      } catch (error: any) {
        throw new Error
      }
      
}



