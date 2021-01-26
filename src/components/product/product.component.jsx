import React from "react";
import { useStateValue } from "../../stateMenagement/StateProvider";
import "./product.styles.css";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  console.log("this is the basket --> ", basket);

  const addToBasketDispatchAction = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>€</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {/* trick to fill up how many stars should display */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasketDispatchAction}>Add to Basket</button>
    </div>
  );
}

export default Product;
