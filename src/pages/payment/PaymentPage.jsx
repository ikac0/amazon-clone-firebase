import React from "react";
import { Link } from "react-router-dom";
import CheckoutProduct from "../../components/checkoutProduct/checkoutProduct.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { totalPriceToPay } from "../../stateMenagement/reducer";
import { useStateValue } from "../../stateMenagement/StateProvider";
import "./paymentPage.styles.css";

function PaymentPage() {
  const [{ basket, user }, dispatch] = useStateValue();
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
            {basket.map((x) => (
              <CheckoutProduct
                id={x.id}
                title={x.title}
                image={x.image}
                price={x.price}
                rating={x.rating}
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
            <StripeCheckoutButton price={`${totalPriceToPay(basket)} €`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
