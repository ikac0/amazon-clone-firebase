import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../../components/checkoutProduct/checkoutProduct.component";
import { totalPriceToPay } from "../../stateMenagement/reducer";
import { useStateValue } from "../../stateMenagement/StateProvider";
import { db } from "../../firebase/firebase";
import axios from "../../helpers/axios";
import "./PaymentPage.styles.css";

function PaymentPage() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer, and it changes everytime the current state of the basket is changed.
    const getClientSecret = async () => {
      const res = await axios({
        method: "post",
        // Converted in cents, since stripe always expects the total sum in cents
        url: `/payments/create?total=${totalPriceToPay(basket) * 100}`,
      });
      setClientSecret(res.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("the secret is ", clientSecret);

  const handleSubmit = async (e) => {
    // handling the submittion of the form where all the stripe magic happens
    e.preventDefault();
    setProcessing(true); // to set the button to disabled since its in gets 'processing state'

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket, // before emptying them soon
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        //paymentIntent = payment confirmation - successfull, way of saying from the stripe library developers
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };
  const handleChange = (event) => {
    // // listen for changes in the cardElement and display any errors as the customer types their card details
    setDisabled(event.empty); //
    setError(event.error ? event.error.message : ""); //show the error if there is one
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
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={totalPriceToPay(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€"}
                />
                {/* would be disabled if one or more of those is true */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                </button>
              </div>
              {/* If there is an error and only then, show the error in a div at the end of this form */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;

// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import CurrencyFormat from "react-currency-format";
// import CheckoutProduct from "../../components/checkoutProduct/checkoutProduct.component";
// import { totalPriceToPay } from "../../stateMenagement/reducer";
// import { useStateValue } from "../../stateMenagement/StateProvider";
// import { db } from "../../firebase/firebase";
// import axios from "../../helpers/axios";
// import "./PaymentPage.styles.css";

// function PaymentPage() {
//   const [{ basket, user }, dispatch] = useStateValue();
//   const history = useHistory();

//   const stripe = useStripe();
//   const elements = useElements();

//   const [succeeded, setSucceeded] = useState(false);
//   const [processing, setProcessing] = useState("");
//   const [error, setError] = useState(null);
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState(true);

//   useEffect(() => {
//     // generate the special stripe secret which allows us to charge a customer
//     const getClientSecret = async () => {
//       const response = await axios({
//         method: "post",
//         // Stripe expects the total in a currencies subunits
//         url: `/payments/create?total=${totalPriceToPay(basket) * 100}`,
//       });
//       setClientSecret(response.data.clientSecret);
//     };

//     getClientSecret();
//   }, [basket]);

//   console.log("THE SECRET IS >>>", clientSecret);
//   console.log("👱", user);

//   const handleSubmit = async (event) => {
//     // do all the fancy stripe stuff...
//     event.preventDefault();
//     setProcessing(true);

//     const payload = await stripe
//       .confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       })
//       .then(({ paymentIntent }) => {
//         // paymentIntent = payment confirmation

//         db.collection("users")
//           .doc(user?.uid)
//           .collection("orders")
//           .doc(paymentIntent.id)
//           .set({
//             basket: basket,
//             amount: paymentIntent.amount,
//             created: paymentIntent.created,
//           });

//         setSucceeded(true);
//         setError(null);
//         setProcessing(false);

//         dispatch({
//           type: "EMPTY_BASKET",
//         });

//         history.replace("/orders");
//       });
//   };

//   const handleChange = (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   return (
//     <div className="payment">
//       <div className="payment-container">
//         <h1>
//           Checkout (<Link to="/checkout">{basket?.length} items</Link>)
//         </h1>

//         {/* Payment section - delivery address */}
//         <div className="payment-section">
//           <div className="payment-title">
//             <h3>Delivery Address</h3>
//           </div>
//           <div className="payment-address">
//             <p>{user?.email}</p>
//             <p>123 React Lane</p>
//             <p>Los Angeles, CA</p>
//           </div>
//         </div>

//         {/* Payment section - Review Items */}
//         <div className="payment-section">
//           <div className="payment-title">
//             <h3>Review items and delivery</h3>
//           </div>
//           <div className="payment-items">
//             {basket.map((item) => (
//               <CheckoutProduct
//                 id={item.id}
//                 title={item.title}
//                 image={item.image}
//                 price={item.price}
//                 rating={item.rating}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Payment section - Payment method */}
//         <div className="payment-section">
//           <div className="payment-title">
//             <h3>Payment Method</h3>
//           </div>
//           <div className="payment-details">
//             {/* Stripe magic will go */}

//             <form onSubmit={handleSubmit}>
//               <CardElement onChange={handleChange} />

//               <div className="payment-priceContainer">
//                 <CurrencyFormat
//                   renderText={(value) => <h3>Order Total: {value}</h3>}
//                   decimalScale={2}
//                   value={totalPriceToPay(basket)}
//                   displayType={"text"}
//                   thousandSeparator={true}
//                   prefix={"$"}
//                 />
//                 <button disabled={processing || disabled || succeeded}>
//                   <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
//                 </button>
//               </div>

//               {/* Errors */}
//               {error && <div>{error}</div>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;
