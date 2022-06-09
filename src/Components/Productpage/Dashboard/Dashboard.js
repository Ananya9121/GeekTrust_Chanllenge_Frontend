import React from "react";
import Productcard from "./Productcard";
import "./Dashboard.css";
import Filter from "./Filter";

function Dashboard({
  productList,
  setProductlist,
  setFilterproducts,
  filterProducts,
  cartItems,
  handleAddtocart,
}) {
  return (
    <div className="dashboard">
      <Filter
        productList={productList}
        setProductlist={setProductlist}
        setFilterproducts={setFilterproducts}
        filterProducts={filterProducts}
      />
      <Productcard
        productList={productList}
        filterProducts={filterProducts}
        cartItems={cartItems}
        handleAddtocart={handleAddtocart}
      />
    </div>
  );
}

export default Dashboard;
