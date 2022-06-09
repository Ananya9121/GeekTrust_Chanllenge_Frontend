import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productpage.css";
import { config } from "../../App";
import Header from "../Shared/Header";
import Searchbar from "./Searchbar";
import Dashboard from "./Dashboard/Dashboard";


function Productpage({cartItems,handleAddtocart,totalQuantity}) {
  const url = `${config.API}`;
  const [productList, setProductlist] = useState([]);
  const [filterProducts, setFilterproducts] = useState([]);


  
 const callAPI = async (url) => {
  try {
    let responseAPI = await axios.get(url);
    setProductlist(responseAPI.data);
  } catch (e) {
    alert(e.message);
  }
};

  useEffect(() => {
    callAPI(url);
  }, []);

  
  useEffect(() => {
    setFilterproducts([...productList]);
  }, [productList]);

  return (
    <div className="container">
      <Header cartItems={cartItems} totalQuantity={totalQuantity}  />

      <Searchbar productList={productList} setProductlist={setProductlist} setFilterproducts={setFilterproducts} filterProducts={filterProducts}
      />

<Dashboard productList={productList} setProductlist={setProductlist} setFilterproducts={setFilterproducts} filterProducts={filterProducts} cartItems={cartItems} handleAddtocart={handleAddtocart}/>
      
    </div>
  );
}

export default Productpage;
