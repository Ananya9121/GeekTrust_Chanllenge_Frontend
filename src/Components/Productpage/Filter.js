import React, { useEffect, useState } from "react";
import "./Filter.css";

function Filter({
  productList,
  searchKeyword,
  setFilterproducts,
  filterProducts,
  isOpen,
  toggle,
}) {
  const colorList = [...new Set(productList.map((product) => product.color))];
  const genderList = [...new Set(productList.map((product) => product.gender))];
  const typeList = [...new Set(productList.map((product) => product.type))];
  const pricelist = ["Rs.0-Rs.250", "Rs.251-Rs.Rs.450", "Rs.451-Rs.500"];

  const filterAttributes = [
    { label: "color", value: colorList },
    { label: "gender", value: genderList },
    { label: "type", value: typeList },
    { label: "price", value: pricelist },
  ];

  const [checked, setChecked] = useState([]);

  const [filterList, setFilterlist] = useState({
    color: [],
    gender: [],
    type: [],
    price: [],
  });

  const handlePrice = (productPrice, price) => {
    const priceRange = price.map((item) => {
      return item
        .replace(/Rs./g, "")
        .split("-")
        .map((r) => {
          return Number(r);
        });
    });

    return priceRange.map((x) => productPrice >= x[0] && productPrice <= x[1]);
  };

  const handleFilteredproductlist = (filterList) => {
    let { color, gender, type, price } = filterList;
    let filteredProducts = [];

    if (searchKeyword.length) {
      if (
        color.length === 0 &&
        gender.length === 0 &&
        type.length === 0 &&
        price.length === 0
      ) {
        filteredProducts = [...productList];
      } else {
        filteredProducts = filterProducts.filter((product) => {
          return (
            (color.length === 0 || color.includes(product.color)) &&
            (gender.length === 0 || gender.includes(product.gender)) &&
            (type.length === 0 || type.includes(product.type)) &&
            (price.length === 0 ||
              handlePrice(product.price, price).includes(true))
          );
        });
      }
      setFilterproducts(filteredProducts);
    } else {

      if (
        color.length === 0 &&
        gender.length === 0 &&
        type.length === 0 &&
        price.length === 0
      ) {
        filteredProducts = [...productList];
      } else {
        filteredProducts = productList.filter((product) => {
          return (
            (color.length === 0 || color.includes(product.color)) &&
            (gender.length === 0 || gender.includes(product.gender)) &&
            (type.length === 0 || type.includes(product.type)) &&
            (price.length === 0 ||
              handlePrice(product.price, price).includes(true))
          );
        });
      }
      setFilterproducts(filteredProducts);
    }
  };

  const handleSelectfilter = (filterValue, category) => {
    const filterExist = filterList[category].indexOf(filterValue);
    if (filterExist === -1) {
      setFilterlist((prevState) => ({
        ...prevState,
        [category]: [...prevState[category], filterValue],
      }));
    } else {
      setFilterlist((prevState) => ({
        ...prevState,
        [category]: [
          ...prevState[category].filter((item) => item !== filterValue),
        ],
      }));
    }
  };

  useEffect(() => {
    handleFilteredproductlist(filterList);
  }, [filterList]);

  const handleCheck = (filterValue, category) => {
    const currentindex = checked.indexOf(filterValue);
    const newChecked = [...checked];

    if (currentindex === -1) {
      newChecked.push(filterValue);
    } else {
      newChecked.splice(currentindex, 1);
    }
    setChecked(newChecked);

    handleSelectfilter(filterValue, category);
  };

  if (toggle) {
    return (
      <div className={`toggle ${isOpen === true ? "active" : ""}`}>
        {filterAttributes.map((filterItems, index) => {
          return (
            <div style={{ textAlign: "start" }} key={index}>
              <div className="title">{filterItems.label.toUpperCase()}</div>
              <div className="coloroption">
                {filterItems.value.map((ele, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      checked={checked.indexOf(ele) === -1 ? false : true}
                      onChange={(e) => handleCheck(ele, filterItems.label)}
                    />
                    {ele}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="filters">
      {filterAttributes.map((filterItems, index) => {
        return (
          <div key={index}>
            <div className="title">{filterItems.label.toUpperCase()}</div>
            <div className="coloroption">
              {filterItems.value.map((ele, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={checked.indexOf(ele) === -1 ? false : true}
                    onChange={(e) => handleCheck(ele, filterItems.label)}
                  />
                  {ele}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
