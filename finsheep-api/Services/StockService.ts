import { StockMaster } from "../Models/StockMaster";
import { ProductsVariation } from "../Models/ProductsVariation";

let IsProductsAvailable = async (orderObj: any): Promise<Boolean> => {

  if (orderObj.length > 0) {
      for(let order of orderObj) {
        let currentProductStock = await ProductsVariation.findById(
          order.productVariationId
        );
        if (currentProductStock.quantity < order.quantity) {
          return false;
        }
      }
      return true;
  }

  return true;
};

let UpdateProductStock = async(orderId:string,cartItems: any[]): Promise<Boolean> => {
  try {
    if(cartItems.length>0){
      for(let item of cartItems) {
        let stockUpdate=await Promise.all([await ProductsVariation.findById(item.productVariationId),
          await StockMaster.findOne({variation:item.productVariationId})
        ])
        if(stockUpdate){
          let prodVariationData=stockUpdate[0];
          let stockMasterData=stockUpdate[1];
          prodVariationData.quantity-=item.quantity;
          stockMasterData.quantity=prodVariationData.quantity;
          stockMasterData.modifiedOn=Date.now();
          prodVariationData.modifiedOn=Date.now();

          await Promise.all([
            await prodVariationData.save(),
            await stockMasterData.save(),
          ])
        } else return false;
      }
      
    return true;
    }
    else return false;
  } catch (error: any) {
    return false;
  }
};

let AddSingleProductToStock=(variations:[]):void=>{
  try{
   if(variations.length>0){
      variations.forEach(async(size:any)=>{
          let model=await StockMaster.create({
            product:size.product,
            variation:size._id,
            quantity:size.quantity
          })
      })
   }
      
      
  }catch(err:any){
    throw new Error(err.message)
  }
}

export {
    IsProductsAvailable,
    UpdateProductStock  ,
    AddSingleProductToStock
}
