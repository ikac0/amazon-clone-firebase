import React from "react";
import "./order.styles.css";
import moment from "moment";
import CheckoutProduct from "../checkoutProduct/checkoutProduct.component";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order.data.created}</p>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((x) => (
        <CheckoutProduct
          id={x.id}
          title={x.title}
          image={x.image}
          price={x.price}
          rating={x.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order-total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
    </div>
  );
}

export default Order;
