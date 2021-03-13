import React from "react";
import "./order.styles.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../checkoutProduct/checkoutProduct.component";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order-total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100} // so its back in euros, not cents
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
    </div>
  );
}

export default Order;
