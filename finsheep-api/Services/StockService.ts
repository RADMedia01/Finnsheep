import { StockMaster } from "../Models/StockMaster";
import { ProductsVariation } from "../Models/ProductsVariation";
import { ProductMetaDetails } from "../Models/ProductMetaDetails";
import xlsx from 'xlsx';
import mongoose from 'mongoose';



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


let BulkUpload = async (file: Express.Multer.File) => {
  let rowItems: any[][] = [];

  try {
      // Read the file buffer using xlsx
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      rowItems = rows.slice(1) as any[][];
      if (rowItems.length > 0) {
          for (let item of rowItems) {
              if (item[0] != null) {
                  // Convert necessary fields to appropriate types before saving
                  let productId = item[0];
                  let weight = item[1] != null ? Number(item[1]) : -1;
                  let length = item[2] != null ? Number(item[2]) : -1;
                  let width = item[3] != null ? Number(item[3]) : -1;
                  let height = item[4] != null ? Number(item[4]) : -1;
                  let quantity = item[5] != null ? Number(item[5]) : -1;
                  let retailPrice = item[6] != null ? Number(item[6]) : -1;
                  let wholesalePrice = item[7] != null ? Number(item[7]) : -1;
                  let tax = item[8] != null ? Number(item[8]) : -1;
                  let description = item[9] != null ? item[9] : '';
                  let shippingCharges = item[10] != null ? Number(item[10]) : -1;

                  // Validate ObjectId for product (assuming this is expected)
                  if (!mongoose.Types.ObjectId.isValid(productId)) {
                      throw new Error(`Invalid product ObjectId: ${productId}`);
                  }

                  // Create the product variation
                  let prodVariation = await ProductsVariation.create({
                      product: productId,
                      weight,
                      length,
                      width,
                      height,
                      quantity,
                      retailPrice,
                      wholesalePrice,
                      tax,
                      description,
                      shippingCharges,
                  });

                  let stockMaster = await StockMaster.create({
                      product: productId,
                      variation: prodVariation._id,
                      quantity: prodVariation.quantity,
                  });

                  let prodItemMeta = await ProductMetaDetails.create({
                      productVariation: prodVariation._id,
                      metaSize: item[11] != null ? item[11] : '',
                      metaWeight: item[12] != null ? item[12] : '',
                      metaColor: item[13] != null ? item[13] : '',
                      metaFabric: item[14] != null ? item[14] : '',
                      metaLength: item[15] != null ? item[15] : '',
                      metaGender: item[16] != null ? item[16] : '',
                  });
              }
          }
      }
  } catch (error) {
      console.error('Error processing Excel file:', error);
      throw error;
  }
};


export {
    IsProductsAvailable,
    UpdateProductStock,
    AddSingleProductToStock,
    BulkUpload
}
