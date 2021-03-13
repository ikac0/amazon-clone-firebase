import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "../../components/checkoutProduct/checkoutProduct.component";
// import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { totalPriceToPay } from "../../stateMenagement/reducer";
import { useStateValue } from "../../stateMenagement/StateProvider";
import "./paymentPage.styles.css";
import axios from "../../helpers/axios";
import { db } from "../../firebase/firebase";

function PaymentPage() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      // pause the action and wait for axios before continuing
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${totalPriceToPay(basket) * 100}`, // expects cents
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]); // when the basket changes, rerender the useEffect

  console.log("the secret is -", clientSecret); // this is powering up the whole transaction/

  const handleSubmit = async (e) => {
    e.preventDefault(); // so it wont refresh
    setProcessing(true); // so it will disable the button to 'buy now' at the bottom so we can click only once.

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = confimation about the payment
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET", // to set the state to empty []
        });

        history.replace("/orders"); // to redirect the user to the orders
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* delivery adress */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-adress">
            <p>{user?.email}</p>
            <p>Berlin</p>
            <p>Germany</p>
          </div>
        </div>

        {/* review items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment method */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            {/* <StripeCheckoutButton price={`${totalPriceToPay(basket)} €`} /> */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={totalPriceToPay(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€ "}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* if there is some kind of error with card number or whatever, it
               should pop up with the checking for errors with the following div  */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
