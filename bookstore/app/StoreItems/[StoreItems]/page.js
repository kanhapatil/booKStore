"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import NoDataFound from "@/components/NoDataFound";

const StoreItems = () => {
  const [storeItems, setStoreItems] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = window.location.href.split("/").pop();

        const [itemsResponse, detailsResponse] = await Promise.all([
          axios.get(
            `http://127.0.0.1:8000/store/storerelateditem/?store_id=${id}`
          ),
          axios.get(`http://127.0.0.1:8000/store/mystore/${id}/`),
        ]);

        setStoreItems(itemsResponse.data);
        setStoreDetails(detailsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.header}></div>

      <div className={styles.container}>
        <div className={styles.myStore}>
          <div className={styles.storePoster}>
            {storeDetails && (
              <>
                <div className={styles.left}>
                  <img src={storeDetails.image1} alt="Store Image" />
                </div>
                <div className={styles.right}>
                  <div className={styles.top}>
                    <img src={storeDetails.image2} alt="Store Image" />
                  </div>
                  <div className={styles.bottom}>
                    <img src={storeDetails.image3} alt="Store Image" />
                  </div>
                </div>
              </>
            )}
          </div>

          {storeDetails && (
            <div className={styles.storeInformation}>
              <p className={styles.name}>{storeDetails.name}</p>
              <p className={styles.address}>
                {storeDetails.city}, {storeDetails.location}
              </p>
              <p className={styles.ratings}>⭐⭐⭐⭐(10+ ratings)</p>
              <button className={styles.button}>Direction</button> &nbsp;
              <button className={styles.button}>Share</button> &nbsp;
              <button className={styles.button}>Call</button>
            </div>
          )}

          <p className={styles.sub_heading}>⇤all items⇥</p>
          <div className={styles.search}>
            <input
              type="search"
              className={styles.input}
              placeholder="Search for items"
            />
          </div>

          <div className={styles.allItems}>
            {storeItems ? (
              storeItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p>₨.{item.price}</p>
                    <p>
                      Class {item.standard}
                      <sup>th</sup>
                    </p>
                    <p>⭐4.1(10)</p>
                    <p className={styles.itemDesc}>{item.itemDesc}</p>
                  </div>
                  <div className={styles.itemImage}>
                    <img
                      className={styles.img}
                      src={item.itemImages[0]?.img || ""}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                <NoDataFound />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
