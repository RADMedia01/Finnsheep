// components/RazorpayButton.js
import React from 'react';
import { useEffect } from 'react';

const RazorpayButton = () => {
  const handlePayment = async () => {
    try {
      // Fetch order details from your server
    //   const response = await fetch('/api/create-order', { method: 'POST' });
    //   const data = await response.json();
        
     
        const options = {
          key: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
          amount: 100, // Amount is in currency subunits
          currency: 'USD',
          name: 'Your Business Name',
          description: 'Test Transaction',
          image: 'https://example.com/your_logo',
          order_id: data.orderId, // Pass the `id` obtained from the server
          callback_url: '/api/payment-callback', // Your server-side callback URL
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9000090000',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
          handler: function (response) {
            // Handle successful payment here
            console.log('Payment ID:', response.razorpay_payment_id);
            console.log('Order ID:', response.razorpay_order_id);
            console.log('Signature:', response.razorpay_signature);

            // Optionally send payment details to your server for verification
          },
          modal: {
            ondismiss: function () {
              console.log('Payment modal closed');
            },
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  useEffect(()=> {
    console.log("razorpay Componente Initated")
  },[])
  return (
    <button onClick={handlePayment}>Pay with Razorpay</button>
  );
};

export default RazorpayButton;
