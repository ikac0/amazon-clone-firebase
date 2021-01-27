import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./components/header/header.component";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
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
