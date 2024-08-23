import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const { plan_id, customer } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const subscriptionOptions = {
      plan_id: plan_id,
      customer_notify: 1,
      total_count: 12,
      customer: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
      },
    };
    console.log('Creating subscription with options:', subscriptionOptions);
    const subscription = await razorpay.subscriptions.create(subscriptionOptions);
    console.log('Subscription created successfully:', subscription);

    return new Response(JSON.stringify(subscription), { status: 200 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
