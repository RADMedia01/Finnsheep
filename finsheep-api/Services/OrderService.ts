import { ProductsVariation } from "../Models/ProductsVariation";
import { BoxInfoList } from "../Common/Common";
import { IBoxItem } from "../Common/Common";
import { StockMaster } from "../Models/StockMaster";

//choose box type from product orders
const ChooseBox=(cartItems:any[])=>{
    let boxesRequired:IBoxItem[]=[] 
  
    if(cartItems.length>0){
  
      let totalVolumeOfProducts=cartItems.reduce(async(volume:number,item:any)=>{
        let itemStockInfo=await ProductsVariation.findById(item.productVariationId)
        if(itemStockInfo){
          volume+=itemStockInfo.length*itemStockInfo.height*itemStockInfo.width;
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
    ChooseBox
  }