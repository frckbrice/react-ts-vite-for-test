import React from "react";
import Nav from "./Nav";
import useCart from "../Hooks/useCart";

type PropTypes = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropTypes) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>Avom's Co.</h1>
        <div className="header__price-bar">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </div>
    </header>
  );

  return content;
};

export default Header;
