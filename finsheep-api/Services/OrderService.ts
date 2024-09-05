import { ProductsVariation } from "../Models/ProductsVariation";
import { BoxInfoList } from "../Common/Common";
import { IBoxItem } from "../Common/Common";



//choose box type from product orders

const totalVolumeOfProducts=
  async(cartItems:any[])=>{
    
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

const ChooseBox=async(cartItems:any[])=>{
    let boxesRequired:IBoxItem[]=[] 
      let remainingVolume:number=await totalVolumeOfProducts(cartItems);
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
      console.log(boxesRequired);
      console.log(remainingVolume);
      return boxesRequired;
    }

  export {
    ChooseBox
  }