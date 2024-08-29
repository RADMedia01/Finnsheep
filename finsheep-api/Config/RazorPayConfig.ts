const razorpay=require('razorpay')

export const CreateRazorPayInstance=()=>{
    return new razorpay({
        key_id:'rzp_test_UGSYTrORpbHQTS',//process.env.RAZORPAY_KEY_ID,
        key_secret:'18AJQfQS8W7ClrVLHHE0GzMt',//process.env.RAZORPAY_KEY_SECRET,    
    })
}
