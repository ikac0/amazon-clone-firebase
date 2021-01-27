import React from "react";
import "./subtotal.styles.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../stateMenagement/StateProvider";
import { totalPriceToPay } from "../../stateMenagement/reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={totalPriceToPay(basket)} // to calculate the sum of every items * price for each one;
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
