import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase";

import "./loginPage.styles.css";

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    console.log("signing in in process, started");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .then(console.log("i am signed in now successfully"))
      .catch((error) => alert(error.message));
  };
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        //if there was an authentitation, meaning its not empty:
        if (auth) {
          history.push("/"); // to force to redirect to the homepage
        }
      })
      .catch((error) => alert(error.message));
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
      <div className="provided-details">
        <p className="provided-details-intro">Please use:</p>
        <div className="provided-details-details">
          <p>Email: ile@ile.com</p>
          <p>Password: 12341234</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
