import React, { useState } from "react";
import Header from "../Shared/Header";
import "./Cart.css";

function Cart({
  cartItems,
  handleAdd,
  handleReduce,
  handleDelete,
  totalQuantity
}) {


  const getTotalCartValue = (cartItems = []) => {
    if (!cartItems.length) return 0;

    const total = cartItems
      .map((item) => item.price * item.productinCart)
      .reduce((total, n) => total + n);

    return total;
  };
  const totalPrice = getTotalCartValue(cartItems);

  const totalQty = totalQuantity(cartItems);

  return (
    <>
      <Header cartItems={cartItems} totalQuantity={totalQuantity} open />

      <div className="shoppingCart">
        <div className="heading">Shopping Cart</div>
        <div className="cart">
          {cartItems.length ? (
            <>
              <div className="outercart">
                <div className="innercart">
                  {cartItems.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="product">
                        <div className="productImage">
                          <img src={item.imageURL} alt={item.name} />
                        </div>
                        <div className="space"></div>
                        <div className="space"></div>

                        <div className="productDetail">
                          <div className="data1">
                            <p style={{ fontWeight: "bold" }}>{item.name}</p>
                            <p style={{ fontSize: "13.5px" }}>
                              Rs.{item.price}
                            </p>
                          </div>
                          <div className="space"></div>

                          <div className="data2">
                            <p>Quantity: {item.productinCart}</p>
                            <p>
                              {item.quantity === item.productinCart
                                ? `No Stock Left`
                                : `Stock: ${item.quantity}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="change"
                          onClick={(e) => handleAdd(item)}
                        >
                          +
                        </button>
                        <div className="space"></div>
                        <button
                          className="change"
                          onClick={(e) => handleReduce(item)}
                        >
                          -
                        </button>
                        <div className="space"></div>
                        <button
                          className="delete"
                          onClick={(e) => handleDelete(item)}
                        >
                          DELETE
                        </button>
                        <i
                          onClick={(e) => handleDelete(item)}
                          className="fa fa-trash deleteIcon"
                          style={{ fontSize: "20px", color: "gray" }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="seperator"></div>
                <div className="total data2">
                  <div className="totalqty">Total Cart Items: {totalQty}</div>
                  <div className="totalprice">
                    Total Cart Price: Rs.{totalPrice}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="noproduct">
              No items are added, please visit products page to add items...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
