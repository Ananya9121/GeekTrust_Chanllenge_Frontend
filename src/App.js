import "./App.css";
import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Productpage from "./Components/Productpage/Productpage";

export const config = {
  API: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
};

function App() {
  const [cartItems, setCartitems] = useState([]);

  const handleAddtocart = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);

    if (productExist) {
      alert("Product is alredy in the cart, please check the shopping cart!");
    } else {
      setCartitems([...cartItems, { ...product, productinCart: 1 }]);
    }
  };

  const handleAdd = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist && productExist.productinCart < product.quantity) {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart + 1 }
            : item
        )
      );
      // alert(`${productExist.productinCart} items in the cart!`)
    } else {
      alert("Stock is over, please check later for more stock!");
    }
  };

  const handleReduce = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist.productinCart === 1) {
      setCartitems(cartItems.filter((item) => item.id !== product.id));
      // alert("Product removed from the shopping cart!");
    } else {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart - 1 }
            : item
        )
      );
    }
  };

  const handleDelete = (product) => {
    setCartitems(cartItems.filter((item) => item.id !== product.id));
    // alert("Product removed from the shopping cart!");
  };

  const totalQuantity = (cartItems) => {
    if (!cartItems.length) return 0;

    const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);

    return totalItem;
  };

  return (
    <>
      <Switch>
        <Route  path="/Cart">
          <Cart
            cartItems={cartItems}
            handleAdd={handleAdd}
            handleReduce={handleReduce}
            handleDelete={handleDelete}
            totalQuantity={totalQuantity}
          />
        </Route>
        <Route exact path="/">
          <Productpage
            cartItems={cartItems}
            handleAddtocart={handleAddtocart}
            totalQuantity={totalQuantity}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
