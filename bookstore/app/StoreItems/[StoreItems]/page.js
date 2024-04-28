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
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = window.location.href.split("/").pop();
        const token = localStorage.getItem("token");
        const requests = [
          axios.get(
            `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}&search=${searchValue}`
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

        const [itemsResponse, detailsResponse, cartResponse] = await Promise.all(requests);
        setStoreItems(itemsResponse.data);
        setStoreDetails(detailsResponse.data);
        setCount(token ? cartResponse.data.length : 0);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };
    fetchData();
  }, [searchValue]);


  if(storeItems){
    console.log(storeItems);
  }

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

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

          {/*<div>
            {storeItems && storeItems.length > 0 ? (
              storeItems.map((name, index) => (
                <p key={index}>{name.itemCategory[0].category}</p>
              ))
            ):null}
          </div>*/}
          <div className={styles.categories}>
            <p>School books</p>
            <p>Philosohpy</p>
            <p>Spiritual</p>
            <p>Play boy</p>
            <p>School books</p>
            <p>Philosohpy</p>
            <p>Spiritual</p>
            <p>Play boy</p>
            <p>School books</p>
            <p>Philosohpy</p>
            <p>Spiritual</p>
            <p>Play boy</p>
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
