"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import { ToastContainer, toast } from "react-toastify";
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
        if (token) {
          const [itemsResponse, detailsResponse, cartResponse] =
            await Promise.all([
              axios.get(
                `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}&search=${searchValue}`
              ),
              axios.get(`http://127.0.0.1:8000/store/mystore/${id}/`),
              axios.get(`http://127.0.0.1:8000/cart/mycartitem/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),
            ]);
          setStoreItems(itemsResponse.data);
          setStoreDetails(detailsResponse.data);
          setCount(cartResponse.data.length);
        } else {
          const [itemsResponse, detailsResponse] = await Promise.all([
            axios.get(
              `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}&search=${searchValue}`
            ),
            axios.get(`http://127.0.0.1:8000/store/mystore/${id}/`),
          ]);
          setStoreItems(itemsResponse.data);
          setStoreDetails(detailsResponse.data);
        }
      } catch (error) {
        console.log(error, "adkf");
      }
    };
    fetchData();
  }, [searchValue]);

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}></div>
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
