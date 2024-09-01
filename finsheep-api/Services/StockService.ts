import { ProductsVariation } from "../Models/ProductsVariation";

let IsProductsAvailable = (orderObj: any): Boolean => {
  if (orderObj.items.length > 0) {
    let updateStocksOfProducts = orderObj.items.forEach(
      async (product: any) => {
        let currentProductStock = await ProductsVariation.findOne({
          product: product.productId,
          _id: product.sizeId,
        });
        if (currentProductStock.quantity < product.quantity) {
          return false;
        }
      }
    );
  }
  return true;
};

let UpdateProductStock = (orderObj: any): Boolean => {
  try {
    if(orderObj.items.length>0){
        let updateStocksOfProducts = orderObj.items.forEach(
            async (product: any) => {
              let currentProductStock = await ProductsVariation.findById(product.sizeId);
              if (currentProductStock) {
                currentProductStock.quantity -= product.quantity;
                await currentProductStock.save();
              }
            }
          );
          return true;
    }
    else return false;
  } catch (error: any) {
    return false;
  }
};

export {
    IsProductsAvailable,
    UpdateProductStock  
}
