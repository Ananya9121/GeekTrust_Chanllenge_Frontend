import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

function Header({ cartItems, totalQuantity, open }) {
  const history = useHistory();

  const handleProduct = () => {
    history.push("/");
  };

  const handleCart = () => {
    history.push("/Cart");
  };

  const totalQty = totalQuantity(cartItems);

  return (
    <div className="navbar">
      <div className="logo" onClick={handleProduct}>TeeRex Store</div>
      <ul>
        <li onClick={handleProduct}>Products</li>
        <li onClick={handleCart}>
          {open ? (
            "Shopping Cart"
          ) : (
            <span
              className="fa-stack fa-1x has-badge"
              data-count={cartItems.length ? totalQty : "0"}
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-shopping-cart "
              ></i>
            </span>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Header;
