import { Cart } from "../Models/Cart"

let ClearUserCart=async(userId:string)=>{
    let userCart=await Cart.findOne({userId:userId})
    if(userCart){
        let removeCart=await Cart.deleteOne({userId:userId})
    }
}
export {
    ClearUserCart 
}