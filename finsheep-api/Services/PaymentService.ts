import { ApiError } from 'square';
import squareClient from '../Config/SquareConfig';


// export const PaymentWithSquare=async(payload:any)=>{
//     try {
//         const body = {
//             sourceId: payload.sourceId, // Replace with a valid card nonce
//             amountMoney: {
//             amount: payload.amount * 100, //payload.total*100,
//             currency: "USD",
//             },
//             idempotencyKey: `${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
//           };
       
//           const paymentResponse = await squareClient.paymentsApi.createPayment(body);
    
//           if(paymentResponse){
//                 return paymentResponse;
//             //go to verify payment method and verify payment
    
//           }
//     } catch (error:any) {
//         throw error;
//     }
// }

  
  export const PaymentWithSquare = async (payload: any) => {
    try {
      const body = {
        sourceId: payload.sourceId,
        amountMoney: {
          amount: payload.amount.toString(), // Amount should be in cents
          currency: "USD",
        },
        idempotencyKey: `${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
      };
     
      const paymentResponse = await squareClient.paymentsApi.createPayment(body);
      return paymentResponse.result;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Square API Error:', error.errors);
      }
      throw error;
    }
  }

export const VerifyPaymentWithSquare=async(paymentId:string)=>{
    try {
        const paymentResponse = await squareClient.paymentsApi.getPayment(paymentId);
        if(paymentResponse){
            if(paymentResponse.result.payment.status=='COMPLETED'){
                //SUCCESSFUL PAYMENT
            }
            else if(paymentResponse.result.payment.status=='FAILED'){
                //FAILED PAYMENT
            }
            else{
                //PENDING PAYMENT
            }
        }


    } catch (error:any) {
        if (error instanceof ApiError) {
        error.result.errors.forEach(function(e:any) {
            console.log(e.category);
            console.log(e.code);
            console.log(e.detail);
        });
        } else {
        console.log("Unexpected error occurred: ", error);
        }
    }
}