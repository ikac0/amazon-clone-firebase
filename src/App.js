import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import "./App.css";
import { useStateValue } from "./stateMenagement/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import Header from "./components/header/header.component";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import LoginPage from "./pages/login/LoginPage";
import PaymentPage from "./pages/payment/PaymentPage";
import OrdersPage from "./pages/orders/OrdersPage";

const promise = loadStripe(
  "pk_test_51HSAocDN9xeII8YoKwCrDINpHqe2GHVXeCD8VahY3k5velSOwGe5eQAKJZkNZReEuYpYuCcDZrIuCY9v4krTWakO00n0GTDXfQ"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // runs only ONCE when app component loads if [] is empty, or will run whenever the basket changes if we have basket in the [] or whatever we specify.
    //observing if we are logged in/ out/ in / out. whenever changes, it fires.
    auth.onAuthStateChanged((x) => {
      // x meaning userAuth
      if (x) {
        dispatch({
          type: "SET_USER",
          user: x,
        });
        //the user just logged in or the user was logged in
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        //the user is logged out / nonexisting/ null
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Header />
            <HomePage />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <PaymentPage />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <OrdersPage />
          </Route>
          <Route path="/checkout">
            <Header />
            <CheckoutPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
