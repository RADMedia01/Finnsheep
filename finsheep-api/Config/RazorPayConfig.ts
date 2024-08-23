const razorpay=require('razorpay')

export const CreateRazorPayInstance=()=>{
    return new razorpay({
        key_id:'ouhuewofheofihohf',//process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET,    
    })
}
