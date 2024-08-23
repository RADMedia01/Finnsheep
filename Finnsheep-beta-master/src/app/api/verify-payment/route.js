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
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_payment_id}|${razorpay_subscription_id}`);
    const generated_signature = shasum.digest('hex');

    if (generated_signature === razorpay_signature) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
