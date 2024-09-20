import { ApiError } from 'square';
import squareClient from '../Config/SquareConfig';


export const PaymentWithSquare=async(payload:any)=>{
    try {
        const body = {
            sourceId: "sandbox-sq0idb-SH2ggZPf5KG-3cRx0mK0-A", // Replace with a valid card nonce
            amountMoney: {
            amount: 10000, //payload.total*100,
            currency: "USD",
            },
            idempotencyKey:"hj1uenqwnfasjdjasndj23849",
          };
       
          const paymentResponse = await squareClient.paymentsApi.createPayment(body);
    
          if(paymentResponse){
                return paymentResponse;
            //go to verify payment method and verify payment
    
          }
    } catch (error:any) {
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