import React from "react";
import "./header.styles.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../stateMenagement/StateProvider";
import { auth } from "../../firebase/firebase";

function Header() {
  // we currently need only the basket and the user of the whole CURRENT STATE, that's why we destructure only those two in the [] below this line
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    } else {
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>
      <div className="header-search">
        <input className="header-search-input" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        <Link to={!user ? "/login" : "/"}>
          <div onClick={handleAuthentication} className="header-option">
            <span className="header-option-line-one">
              Hello {user ? user?.email : "Guest"}
            </span>
            <span className="header-option-line-two">
              {!user ? "Sign In" : "Sign Out"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header-option">
            <span className="header-option-line-one">Returns</span>
            <span className="header-option-line-two">& Orders</span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-option-line-one">Your</span>
          <span className="header-option-line-two">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header-option-basket">
            <ShoppingBasketIcon />
            <span className="header-option-line-two header-basket-count">
              {/* set the length of the current state of the basket. import it first
              on top of the scope */}
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
