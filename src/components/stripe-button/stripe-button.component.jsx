import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // because it is cents
  const publicKey =
    "pk_test_51HSAocDN9xeII8YoKwCrDINpHqe2GHVXeCD8VahY3k5velSOwGe5eQAKJZkNZReEuYpYuCcDZrIuCY9v4krTWakO00n0GTDXfQ";

  const onToken = (token) => {
    console.log(token);
    alert("Payment was successfull");
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="Krsteski Amazon Clone"
      billingAddress
      shippingAddress
      description={`Your total is ${price}`}
      amount={priceForStripe}
      currency="eur"
      panelLabel={`Pay now ${price}`}
      token={onToken}
      stripeKey={publicKey}
    />
  );
};

export default StripeCheckoutButton;
