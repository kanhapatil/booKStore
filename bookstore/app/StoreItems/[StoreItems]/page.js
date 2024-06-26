"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreDetails from "@/components/StoreDetails";
import AllStoreItems from "@/components/AllStoreItems";
import { useParams } from "next/navigation";


const StoreItems = () => {
  const [storeItems, setStoreItems] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [check, setCheck] = useState(false);
  const storeId = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = storeId.StoreItems;
        const token = localStorage.getItem("token");
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

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilter = (categoryName) => {
    setFilterValue(categoryName);
    setCheck(true);
  }

  return (
    <main className={styles.main}>
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
    </main>
  );
};

export default StoreItems;
