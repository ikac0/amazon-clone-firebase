import React from "react";
import CheckoutProduct from "../../components/checkoutProduct/checkoutProduct.component";
import Subtotal from "../../components/subtotal/subtotal.component";
import { useStateValue } from "../../stateMenagement/StateProvider";
import "./checkoutPage.styles.css";

function CheckoutPage() {
  const [{ basket }, dispatch] = useStateValue();

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
          {/* mapping through every single one item that is currently at the basket and need to show up in the checkout page  */}
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
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default CheckoutPage;
