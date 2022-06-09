import React, { useState } from "react";
import "./Productcard.css";

function Productcard({ productList,filterProducts,cartItems, handleAddtocart}) {


  return (
    <div className="products">
      <div className="row">
        {filterProducts.length ? (
          filterProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-header">
                <span className="card-title">{product.name}</span>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="card-body">
                <p>Rs.{product.price}</p>
                <button
                  className="btn"
                  onClick={() => handleAddtocart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "grey" }}>No Products Found</h4>
        )}
      </div>
    </div>
  );
}

export default Productcard;
