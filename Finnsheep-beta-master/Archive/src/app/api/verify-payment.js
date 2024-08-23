// src/app/api/verify-payment/route.js

// import { NextResponse } from 'next/server';
// import crypto from 'crypto';

// export async function POST(req) {
//   try {
//     const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await req.json();

//     const secret = process.env.RAZORPAY_KEY_SECRET;
//     const generated_signature = crypto
//       .createHmac('sha256', secret)
//       .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
//       .digest('hex');

//     if (generated_signature === razorpay_signature) {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ success: false, message: 'Invalid signature' });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }
// src/app/api/verify-payment/route.js

// import { NextResponse } from 'next/server';
// import crypto from 'crypto';

// export async function POST(req) {
//   try {
//     const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await req.json();

//     const secret = process.env.RAZORPAY_API_SECRET;
//     const generated_signature = crypto
//       .createHmac('sha256', secret)
//       .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
//       .digest('hex');

//     if (generated_signature === razorpay_signature) {
//       return NextResponse.json({ success: true });
//     } else {
//       return NextResponse.json({ success: false, message: 'Invalid signature' });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// }


import crypto from 'crypto';

export async function POST(request) {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await request.json();

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // Payment is successful
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    // Payment verification failed
    return new Response(JSON.stringify({ success: false, error: 'Invalid signature' }), { status: 400 });
  }
}

