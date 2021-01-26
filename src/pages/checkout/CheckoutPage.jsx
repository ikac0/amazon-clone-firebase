import React from "react";
import Subtotal from "../../components/subtotal/subtotal.component";
import "./checkoutPage.styles.css";

function CheckoutPage() {
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423493668_.jpg"
          alt=""
          className="checkout-ad"
        />
        <div>
          <h2 className="checkout-title">Your shopping basket</h2>
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default CheckoutPage;
