'use client';

import { useEffect, useState } from 'react';

const RazorpaySubscriptionButton = ({ user, planId }) => {
  const [loading, setLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionAmount, setSubscriptionAmount] = useState(0);



  useEffect(() => {
    const createSubscription = async () => {
      try {
        const response = await fetch('/api/create-subscription', {
          method: 'POST',
        });
        const data = await response.json();
        console.log(data)
        setSubscriptionId(data.id); // Set the subscription ID
        setSubscriptionAmount(data.amount); // Set the subscription Amount
    console.log(data.amount)

      } catch (error) {
        console.error('Error creating subscription:', error);
      }
    };

    createSubscription();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      console.error('Razorpay is not loaded');
      return;
    }
 

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      // plan_id: planId, 
      amount: 399 * 100,
      name: 'EduPrism',
      description: 'Premium Subscription Plan',
      image: '/your_logo.jpg',
      callback_url: '/api/verify-payment',
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contact,
      },
      notes: {
        address: 'EduPrism Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
    }
  };

  return (
    <button id="rzp-button1" onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Subscribe'}
    </button>
  );
};

export default RazorpaySubscriptionButton;
