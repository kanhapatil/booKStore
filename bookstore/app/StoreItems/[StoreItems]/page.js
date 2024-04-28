"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreDetails from "@/components/StoreDetails";
import AllStoreItems from "@/components/AllStoreItems";


const StoreItems = () => {
  const [storeItems, setStoreItems] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = window.location.href.split("/").pop();
        const token = localStorage.getItem("token");
        console.log("chalo");
        const requests = [
          axios.get(
            `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}&search=${searchValue}&itemCategory__category=${filterValue}`
          ),
          axios.get(`http://127.0.0.1:8000/store/mystore/${id}/`),
        ];

        if (token) {
          requests.push(
            axios.get(`http://127.0.0.1:8000/cart/mycartitem/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          );
        }

        const [itemsResponse, detailsResponse, cartResponse] =
          await Promise.all(requests);
        setStoreItems(itemsResponse.data);
        setCategory(itemsResponse.data[0].categoryName);
        setStoreDetails(detailsResponse.data);
        setCount(token ? cartResponse.data.length : 0);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    setCheck(false);
    fetchData();
  }, [searchValue, check]);

  if(storeItems){
    console.log(storeItems);
  }

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilter = (categoryName) => {
    console.log(categoryName);
    setFilterValue(categoryName);
    setCheck(true);
  }

  return (
    <div className={styles.main}>
      <div className="navbar"></div>
      <ToastContainer />

      <div className={styles.container}>
        <div className={styles.myStore}>
          {/* Store details component start */}
          {storeDetails && <StoreDetails storeDetails={storeDetails} />}
          {/* Store details component end */}

          <p className={styles.sub_heading}>⇤all items⇥</p>
          <div className={styles.search}>
            <input
              type="search"
              className={`${styles.input} ${styles.searchInput}`}
              onChange={handleOnChange}
              placeholder="Search for name, standard, price"
            />
          </div>

          <div className={styles.categories}>
            {category && category.length > 0
              ? category.map((categoryName, index) => (
                  <p key={index} onClick={() => handleFilter(categoryName)}>{categoryName}</p>
                ))
              : null}
            <p onClick={() => handleFilter("")}>Remove</p>
          </div>

          {/* Store Items component start */}
          <div className={styles.allItems}>
            <AllStoreItems
              storeItems={storeItems}
              count={count}
              setCount={setCount}
            />
          </div>
          {/* Store Items component end */}
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
