"use client";
import React, { useState, useEffect } from "react";
import checkout_styles from "./checkout.module.css";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import axiosInstance from "@/utils/axiosInstance";

const Checkout = () => {
  debugger;
  const [cart, setCart] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deliveryTimeASAP, setDeliveryTimeASAP] = useState(true);
  const [coolerBox, setCoolerBox] = useState(true);
  const [paymentMethodCard, setPaymentMethodCard] = useState(true);

  useEffect(() => {
    debugger;
    const cart = JSON.parse(localStorage.getItem("cartState")).cart.items;
    setCart(cart);
  }, []);

  const handlePlaceOrder = async (e) => {
    console.log("cart:", cart);
    const transformedCart = cart.map(item => {
      return {
        productId: item._id, // using _id as productId
        productVariationId: item.category._id, // using category._id as productVariationId
        quantity: item.quantity,
      };
    });

    console.log(transformedCart);
    debugger
    const body = {
      userId: "66d041362baacc7ecec25463",
      items: transformedCart,
      deliveryCharges: 10,
      subTotal: 40,
      total: 50,
      shippingAddress: {
        address: "Near Central Park",
        state: "California",
        city: "Los Angeles",
        zipcode: "90001"
      },
      paymentMethod: "cash",
      currency: "USD",
    };
    await axiosInstance.post("/api/order", body);
  };

  const handlePayment = async (token) => {
    /*
    const body = {
        sourceId: payload.sourceId,
        amountMoney: {
          amount: payload.amountMoney.amount, // Amount should be in cents
          currency: payload.amountMoney.currency,
        },
        idempotencyKey: `${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
      };
    */
    debugger
    const body = {
      sourceId: token,
      amountMoney: {
        amount: 100, // Amount should be in cents
        currency: "USD",
      },
      idempotencyKey: `${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
    };
    debugger
    try {
      const response = await axiosInstance.post("/api/payment/new", body);
      debugger
      console.log("response:", response);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className={checkout_styles.checkout}>
      <div className={checkout_styles.checkout__left}>
        <div className={checkout_styles.checkout__left__back}>
          <a href="/">
            Back to Home
          </a>
        </div>
        <h1>
          Checkout
        </h1>
        <span />
        <div className={checkout_styles.checkout__left__message}>
          Already have an account? <a href="/login">Log in</a> for faster checkout
        </div>
        <form className={checkout_styles.checkout__left__form} onSubmit={handlePlaceOrder}>
          <h2>
            Contact Information
          </h2>
          <div className={checkout_styles.checkout__left__form__container}>
            <div className={checkout_styles.checkout__left__form__container__inputcontainer}>
              <label>
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={checkout_styles.checkout__left__form__container__inputcontainer}>
              <label>
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={checkout_styles.checkout__left__form__container__inputcontainer}>
              <label>
                Phone Number
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
              />
            </div>
            <div className={checkout_styles.checkout__left__form__container__inputcontainer}>
              <label>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
          </div>
          <span />
          <h2>
            Where would you like to receive your order?
          </h2>
          <div className={checkout_styles.checkout__left__form__inputcontainer__address}>
            <label>
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
            />
          </div>
          <div className={checkout_styles.checkout__left__form__inputcontainer}>
            <label>
              Pincode
            </label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className={checkout_styles.checkout__left__form__inputcontainer__message}>
            <label>
              Any special instructions for the delivery
            </label>
            <input
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              type="text"
            />
          </div>
          <span />
          <h2>
            When would you like to receive your order?
          </h2>
          <div className={checkout_styles.checkout__left__form__inputcontainer__radiogroup}>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={deliveryTimeASAP}
                onChange={() => setDeliveryTimeASAP(true)}
                type="radio"
              />
              <label>
                ASAP
              </label>
            </div>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={!deliveryTimeASAP}
                onChange={() => setDeliveryTimeASAP(false)}
                type="radio"
              />
              <label>
                Choose a delivery time
              </label>
            </div>
          </div>
          <span />
          <h2>
            Do you want to receive your order in a cooler box?
          </h2>
          <div className={checkout_styles.checkout__left__form__inputcontainer__radiogroup}>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={coolerBox}
                onChange={() => setCoolerBox(true)}
                type="radio"
              />
              <label>
                Yes
              </label>
            </div>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={!coolerBox}
                onChange={() => setCoolerBox(false)}
                type="radio"
              />
              <label>
                No
              </label>
            </div>
          </div>
          <span />
          <h2>
            How would you like to pay for your order?
          </h2>
          <div className={checkout_styles.checkout__left__form__inputcontainer__radiogroup}>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={paymentMethodCard}
                onChange={() => setPaymentMethodCard(true)}
                type="radio"
              />
              <label>
                Debit/Credit Card
              </label>
            </div>
            <div className={checkout_styles.checkout__left__form__inputcontainer__radio}>
              <input
                checked={!paymentMethodCard}
                onChange={() => setPaymentMethodCard(false)}
                type="radio"
              />
              <label>
                Cash on Delivery
              </label>
            </div>
            {paymentMethodCard && (
              <div className={checkout_styles.checkout__left__form__inputcontainer__card}>
                <PaymentForm
                  applicationId="sandbox-sq0idb-SH2ggZPf5KG-3cRx0mK0-A"
                  cardTokenizeResponseReceived={async (token) => {
                    debugger
                    console.log("token:", token);
                    await handlePayment(token);
                  }}
                  locationId="LF45MA5ZPCCVM"
                >
                  <CreditCard />
                </PaymentForm>
              </div>
            )}
          </div>
          {!paymentMethodCard && (
            <input className={checkout_styles.checkout__left__form__submit} type="submit" value="Place Order" />
          )}
        </form>
      </div>
      <div className={checkout_styles.checkout__right}>
        <div className={checkout_styles.checkout__right__header}>
          <h2>Delivery to your doorstep</h2>
        </div>
      </div>
    </div>
  );
};

export default Checkout;