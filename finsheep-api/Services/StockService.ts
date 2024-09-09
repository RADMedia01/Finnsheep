import { StockMaster } from "../Models/StockMaster";
import { ProductsVariation } from "../Models/ProductsVariation";
import { ProductMetaDetails } from "../Models/ProductMetaDetails";
const ExcelJS = require('exceljs');



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

let BulkUpload=async(file:Express.Multer.File)=>{
  let rowItems: any[][]=[]
  try {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.readFile(file.path)
      .then(() => {
        const worksheet = workbook.worksheets[0];
        worksheet.eachRow((row:any, rowNumber:Number) => {
          const rowData: any[] = [];
          row.eachCell((cell:any, cellNumber:Number) => {
            rowData.push(cell.value);
          });
          rowItems.push(rowData);
        });
      })

      if(rowItems.length>0){

      for(let item of rowItems){
          //item is a single row of uploaded excel
          if(item[0]!=null){

            //add a different product variation,stock and its prod meta details

            let prodVariation=await ProductsVariation.create({
              product:item[0],
              weight:(item[1]!=null) ? item[1] :-1,
              length:(item[2]!=null) ? item[2] :-1,
              width:(item[3]!=null) ? item[3] :-1,
              height:(item[4]!=null) ? item[4] :-1,
              quantity:(item[5]!=null) ? item[5] :-1,
              retailPrice:(item[6]!=null) ? item[6] :-1,
              wholesalePrice:(item[7]!=null) ? item[7] :-1,
              tax:(item[8]!=null) ? item[8] :-1,
              description:(item[9]!=null) ? item[9] :``,
              shippingCharges:(item[10]!=null) ? item[10] :``,
            })

            let stockMaster=await StockMaster.create({
              product:item[0],
              variation:prodVariation._id,
              quantity:prodVariation.quantity
            })

            let prodItemMeta=await ProductMetaDetails.create({
              productVariation:prodVariation._id,
              metaSize:(item[11]!=null) ? item[11] :``,
              metaWeight:(item[12]!=null) ? item[12] :``,
              metaColor:(item[13]!=null) ? item[13] :``,
              metaFabric:(item[14]!=null) ? item[14] :``,
              metaLength:(item[15]!=null) ? item[15] :``,
              metaGender:(item[16]!=null) ? item[16] :``,
            })

          }
        
      }

      }




  } catch (error:any) {
    
  }
}

export {
    IsProductsAvailable,
    UpdateProductStock,
    AddSingleProductToStock,
    BulkUpload
}
