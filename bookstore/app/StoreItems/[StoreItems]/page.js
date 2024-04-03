"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import NoDataFound from "@/components/NoDataFound";
import ReactStars from "react-stars";

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

  const handleAdd = (id) => {
    console.log("ok", id);
    if (storeItems) {
      console.log(storeItems);
    }
  };
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
              <div className={styles.ratingContainer}>
                <ReactStars
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  value={storeDetails.average_rating}
                  edit={false}
                />
                <p className={styles.ratingsText}>(10+ ratings)</p>
              </div>
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
                <div key={item.id} className={styles.itemDetails}>
                  <div className={styles.item}>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p>₨.{item.price}</p>
                      <p>
                        Class {item.standard}
                        <sup>th</sup>
                      </p>
                      <div className={styles.ratingContainer}>
                        <ReactStars
                          count={5}
                          size={24}
                          color2={"#ffd700"}
                          value={item.average_rating}
                          edit={false}
                        />
                        <p className={styles.ratingsText}>
                          ({item.user_count}+)
                        </p>
                      </div>
                      <p className={styles.itemDesc}>{item.itemDesc}</p>
                    </div>

                    <div className={styles.itemImage}>
                      <img
                        className={styles.img}
                        src={item.itemImages[0]?.img || ""}
                      />

                      <div className={styles.add}>
                        <p onClick={() => handleAdd(item.id)}>ADD</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemReviews}>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum. Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when
                      an unknown printer took a galley of type and scrambled it
                      to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                <NoDataFound />
              </div>
            )}
          </div>

          <div className={styles.endLine}></div>
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
