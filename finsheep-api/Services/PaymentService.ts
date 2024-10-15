import { ApiError } from 'square';
import squareClient from '../Config/SquareConfig';
import { Payment } from '../Models/Payment';
import { PaymentStatus } from '../Common/Common';



export const PaymentWithSquare = async (payload: any) => {
    try {
      const body = {
        sourceId: payload.sourceId,
        amountMoney: {
          amount: payload.amountMoney.amount, // Amount should be in cents
          currency: payload.amountMoney.currency,
        },
        idempotencyKey: `${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
      }; 
      const paymentResponse = await squareClient.paymentsApi.createPayment(body);
      const response = paymentResponse.result;
      console.log(response.payment.cardDetails);
      if (response.payment.status=='COMPLETED') {
        //succesful payment
        let paymentObj=await Payment.create({
          id:response.payment.id,
          userId:payload.userId,
          orderId:payload.orderId,
          paymentMethod:response.payment.sourceType,
          paymentStatus:PaymentStatus.Success,
          amount:Number(response.payment.amountMoney.amount),
          currency: response.payment.amountMoney.currency,   
          card:{
            number:response.payment.cardDetails.card.last4,
            exp_month:Number(response.payment.cardDetails.card.expMonth),
            exp_year:Number(response.payment.cardDetails.card.expYear),
            card_type: response.payment.cardDetails.card.cardType,
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