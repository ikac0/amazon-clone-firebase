import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./loginPage.styles.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    console.log("Singing IN");
  };
  const signUp = (e) => {
    e.preventDefault();
    console.log("Signing UP");
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-sign-in-button"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the this FAKE VERSION of Amazon Conditions
          of Use & Sale. Please see our Privacy Notice, our Cookies Notice and
          our Interest-Based Ads Notice.
        </p>
        <button onClick={signUp} className="login-sign-up-button">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
