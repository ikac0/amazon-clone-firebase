import React from "react";
import Product from "../../components/product/product.component";
import "./homePage.styles.css";

function HomePage() {
  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="banner"
        />
        <div className="home-row">
          <Product
            id="1234321321"
            title="LG IT Products 27MP89HM-S Full HD IPS Monitor (27 Inches)"
            price={319.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71T1aNvu2BL._AC_SX679_.jpg"
            rating={5}
          />
          <Product
            id="42342423"
            title="Bose QuietComfort 35 (Series II)"
            price={207.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71+iQZU-dVL._AC_SX679_.jpg"
          />
        </div>
        <div className="home-row">
          <Product
            id="23131231"
            title="Puma Women's Carina L Trainers"
            price={39.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/61Jo75NRdNL._AC_UY500_.jpg"
          />
          <Product
            id="22121151"
            title='MacBook Pro (16", 16GB RAM, 512GB memory)'
            price={2399.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_SX522_.jpg"
          />
          <Product
            id="4525252"
            title="Versatile Sliding Door Wardrobe"
            price={229.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/81imZYlpM5L._AC_SX679_.jpg"
          />
        </div>

        <div className="home-row">
          <Product
            id="5433434343"
            title="Uideazone Men's T-Shirt, Graphic Tees"
            price={16.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71SolItGi9L._AC_UX679_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
