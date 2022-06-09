import React, {useState } from "react";
import Filter from "./Dashboard/Filter";
import "./Searchbar.css";

function Searchbar({productList,setProductlist,setFilterproducts,filterProducts}) {
  const [searchKeyword, setSearchkeyword] = useState("");
  const searchParameter = ["name", "color", "gender", "type"];
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
}

  const handleSearch = (filterProducts, searchParameter, searchKeyword) => {
    const search=searchKeyword.toLowerCase()

    if (search.length) {
     
      let filteredProducts = filterProducts.filter((product) =>
      searchParameter.some((category) =>
      product[category].toLowerCase().includes(search)
));
setFilterproducts(filteredProducts)
    } else {
      setFilterproducts(productList)
    }
  };

  
  return (
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
          style={{ fontSize: "20px", color: "white", margin: "0.5rem"}}
        ></i>

      </button>
      <Filter productList={productList} setProductlist={setProductlist}  setFilterproducts={setFilterproducts} filterProducts={filterProducts} isOpen={isOpen} toggle/>
        </div>

      
    </div>
  );
}

export default Searchbar;
