"use client";
import React, { useState, useEffect } from "react";
import checkout_styles from "./checkout.module.css";

const Checkout = () => {
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
    const cart = JSON.parse(localStorage.getItem("cartState")).cart.items;
    setCart(cart);
  });

  const handlePlaceOrder = (e) => {
    alert("Order placed successfully!");
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
          </div>
          <input className={checkout_styles.checkout__left__form__submit} type="submit" value="Place Order" />
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