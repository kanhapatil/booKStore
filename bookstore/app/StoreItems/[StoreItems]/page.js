"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import NoDataFound from "@/components/NoDataFound";
import { FaDirections } from "react-icons/fa";

const StoreItems = () => {
  const id = window.location.href.split("/").pop();
  const [storeItems, setStoreItems] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchStoreItems = async () => {
        try {
          // Get store items data
          const response = await axios.get(
            `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}`
          );
          if (response.status === 200) {
            setStoreItems(response.data);
          }

          // Get store details
          const response2 = await axios.get(
            `http://127.0.0.1:8000/store/mystore/${id}/`
          );
          if (response2.status === 200) {
            setStoreDetails(response2.data);
          }
        } catch (error) {
          console.log("Data not fetched", error.response.status);
        }
      };
      fetchStoreItems();
    } else {
      console.log("Id is not available");
    }
  }, [id]);

  useEffect(() => {
    if (storeItems) {
      console.log("");
    }
  }, [storeItems, storeDetails]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}></div>

        <div className={styles.container}>
          <div className={styles.myStore}>
            <div className={styles.storePoster}>
              <div className={styles.left}>
                <img
                  src={storeDetails ? storeDetails.image1 : null}
                  alt="Store Image"
                />
              </div>

              <div className={styles.right}>
                <div className={styles.top}>
                  <img
                    src={storeDetails ? storeDetails.image2 : null}
                    alt="Store Image"
                  />
                </div>

                <div className={styles.bottom}>
                  <img
                    src={storeDetails ? storeDetails.image3 : null}
                    alt="Store Image"
                  />
                </div>
              </div>
            </div>
            {/* Store information */}
            <div className={styles.storeInformation}>
              <p className={styles.name}>
                {storeDetails ? storeDetails.name : null}
              </p>
              <p className={styles.address}>
                {storeDetails ? storeDetails.city : null},{" "}
                {storeDetails ? storeDetails.location : null}
              </p>
              <p className={styles.ratings}>⭐⭐⭐⭐(10+ ratings)</p>
              <button className={styles.button}>Direction</button> &nbsp;
              <button className={styles.button}>Share</button> &nbsp;
              <button className={styles.button}>Call</button>
            </div>

            {/* Search bar */}
            <p className={styles.sub_heading}>⇤all items⇥</p>
            <div className={styles.search}>
              <input type="search" className={styles.input} placeholder="Search for items" />
            </div>

            {/* Store items */}
            <div className={styles.allItems}>
              <div className={styles.item}></div>
              <div className={styles.item}></div>
              <div className={styles.item}></div>
            </div>
          </div>
          {/*<div className={styles.allItems}>
            {storeItems ? (
              storeItems.map((item, key) => (
                <div key={item.id} className={styles.items}>
                  <img src={item.itemImages[0].img} className={styles.image} />
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                <NoDataFound />
              </div>
            )}
            </div>*/}
        </div>
      </div>
    </>
  );
};

export default StoreItems;
