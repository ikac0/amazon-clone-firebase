import React from "react";
import "./header.styles.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Header() {
  return (
    <div className="header">
      <img
        className="header-logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="amazon-logo"
      />
      <div className="header-search">
        <input className="header-search-input" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        <div className="header-option">
          <span className="header-option-line-one">Hello Илија</span>
          <span className="header-option-line-two">Sign in</span>
        </div>
        <div className="header-option">
          <span className="header-option-line-one">Returns</span>
          <span className="header-option-line-two">& Orders</span>
        </div>
        <div className="header-option">
          <span className="header-option-line-one">Your</span>
          <span className="header-option-line-two">Prime</span>
        </div>
        <div className="header-option-basket">
          <ShoppingBasketIcon />
          <span className="header-option-line-two header-basket-count">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
