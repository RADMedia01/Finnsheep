import { ApiError } from 'square';
import squareClient from '../Config/SquareConfig';
import { Payment } from '../Models/Payment';
import { PaymentStatus } from '../Common/Common';



export const PaymentWithSquare = async (payload: any) => {
    try {
      const body = {
        sourceId: payload.sourceId,
        amountMoney: {
          amount: payload.amount*100, // Amount should be in cents
          currency: payload.currency,
        },
        idempotencyKey: `${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
      };     
      const paymentResponse = await squareClient.paymentsApi.createPayment(body);

      if (paymentResponse.paymentStatus=='approved') {
        //succesful payment
        let paymentObj=await Payment.create({
          id:paymentResponse.id,
          userId:payload.userId,
          orderId:payload.orderId,
          paymentMethod:'card',
          paymentStatus:PaymentStatus.Success,
          amount:paymentResponse.transactionAmount.total,   
          card:{
            number:paymentResponse.card.number,
            expiry:paymentResponse.card.expirationDate,
            cvv:paymentResponse.card.cvv,
          }
        })

      }

      return paymentResponse;
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