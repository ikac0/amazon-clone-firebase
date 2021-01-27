import React from "react";
import "./header.styles.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../stateMenagement/StateProvider";

function Header() {
  const [state, dispatch] = useStateValue();

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
        <Link to="/login">
          <div className="header-option">
            <span className="header-option-line-one">Hello Илија</span>
            <span className="header-option-line-two">Sign in</span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-option-line-one">Returns</span>
          <span className="header-option-line-two">& Orders</span>
        </div>
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
              {state.basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
