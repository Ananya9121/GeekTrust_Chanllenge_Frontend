import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productpage.css";
import { config } from "../../App";
import Header from "../Shared/Header";
import Filter from "./Filter";
import Productcard from "./Productcard";

function Productpage({ cartItems, handleAddtocart, totalQuantity }) {
  const url = `${config.API}`;
  const [productList, setProductlist] = useState([]);
  const [filterProducts, setFilterproducts] = useState([]);
  const [searchKeyword, setSearchkeyword] = useState("");
  const searchParameter = ["name", "color", "gender", "type"];
  const [isOpen, setIsopen] = useState(false);

  const callAPI = async (url) => {
    try {
      let responseAPI = await axios.get(url);
      setProductlist(responseAPI.data);
    } catch (e) {
      alert(e.message);
    }
  };

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const handleSearch = (filterProducts, searchParameter, searchKeyword) => {
    const search = searchKeyword.toLowerCase();

    if (search.length) {
      let filteredProducts = filterProducts.filter((product) =>
        searchParameter.some((category) =>
          product[category].toLowerCase().includes(search)
        )
      );
      setFilterproducts(filteredProducts);
    } else {
      setFilterproducts(productList);
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
      <Header cartItems={cartItems} totalQuantity={totalQuantity} />

      <div className="searchbar">
        <input
          className="input"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearchkeyword(e.target.value)}
        />
        <div className="space"></div>
        <button
          className="searchbutton"
          onClick={(e) =>
            handleSearch(filterProducts, searchParameter, searchKeyword)
          }
        >
          <i
            className="fa fa-search"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
        </button>
        <div className="space"></div>
        <div className="filterToggle">
          <button className="filterbutton" onClick={ToggleSidebar}>
            <i
              className="fa fa-filter"
              style={{ fontSize: "20px", color: "white", margin: "0.5rem" }}
            ></i>
          </button>
          <Filter
            productList={productList}
            searchKeyword={searchKeyword}
            setProductlist={setProductlist}
            setFilterproducts={setFilterproducts}
            filterProducts={filterProducts}
            isOpen={isOpen}
            toggle
          />
        </div>
      </div>

      
      <div className="dashboard">
      <Filter
        productList={productList}
        searchKeyword={searchKeyword}
        setFilterproducts={setFilterproducts}
        filterProducts={filterProducts}
      />
      <Productcard
        filterProducts={filterProducts}
        handleAddtocart={handleAddtocart}
      />
    </div>
    </div>
  );
}

export default Productpage;
