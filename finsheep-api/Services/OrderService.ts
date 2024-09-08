import { BoxInfoList , IBoxItem } from "../Common/Common";
import { totalVolumeOfProducts } from "./ProductService";

const ChooseBox=async(cartItems:any[]):Promise<IBoxItem[]>=>{
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
      return boxesRequired;
    }

  export {
    ChooseBox
  }

