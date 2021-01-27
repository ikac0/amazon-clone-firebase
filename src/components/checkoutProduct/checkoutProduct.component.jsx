import React from "react";
import { useStateValue } from "../../stateMenagement/StateProvider";
import "./checkoutProduct.styles.css";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasketDispatchAction = () => {
    //remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkout-product">
      <img
        className="checkout-product-image"
        src={image}
        alt="checkout-product-img"
      />
      <div className="checkout-product-info">
        <p className="checkout-product-title">{title}</p>
        <p className="checkout-product-price">
          <small>€</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasketDispatchAction}>
          Remove from basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
