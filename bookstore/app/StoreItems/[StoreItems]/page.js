"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StoreItems.module.css";
import NoDataFound from "@/components/NoDataFound";
import ReactStars from "react-stars";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


const StoreItems = () => {
  const [storeItems, setStoreItems] = useState(null);
  const [storeDetails, setStoreDetails] = useState(null);
  const [count, setCount] = useState(0);
  const [click, setClick] = useState(false);

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

  const handleAdd = (itemId) => {
    setClick(true);
    setCount(count + 1);
    console.log("ok", count);
    const storeId = window.location.href.split("/").pop();

    try {
      const cartData = {
        store: Number(storeId),
      };

      const createCart = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const cartResponse = await axios.post(
            "http://127.0.0.1:8000/cart/mycart/",
            cartData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          let cartId;
          if (cartResponse.data.id) {
            cartId = cartResponse.data.id;
          } else {
            cartId = cartResponse.data.cart_id;
          }
          console.log("Cart Response:", cartResponse);
          const cartItemData = {
            cart: cartId,
            item: itemId,
            quantity: 1,
          };
          const cartItemResponse = await axios.post(
            "http://127.0.0.1:8000/cart/mycartitem/",
            cartItemData
          );
          console.log("CartItem Response:", cartItemResponse);
        } else {
          toast.warning("Please login yourself");
        }
      };
      createCart();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}></div>
      <ToastContainer />

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

                  {item.store_review && item.store_review.length > 0 ? (
                    <div className={styles.itemReviews}>
                      {item.store_review.map((review) => (
                        <div className={styles.review}>
                          <div key={review.id}>
                            <p>
                              <strong>User:</strong> {review.user}
                            </p>
                            <p>
                              <ReactStars
                                count={5}
                                size={24}
                                color2={"#ffd700"}
                                value={review.rating}
                                edit={false}
                              />
                            </p>
                            <p>
                              <strong>Description:</strong> {review.description}
                            </p>
                            <p>
                              <strong>Created at:</strong> {review.created_at}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                <NoDataFound />
              </div>
            )}
          </div>

          <div className={styles.endLine}></div>
          {
            click?<Link href="/ShoppingCart">
            <div className={styles.bottomCart}>
              <p className={styles.goCart}>View Cart</p>
              <p className={styles.goCart}>Items {count}</p>
            </div>
          </Link>:null
          }
        </div>
      </div>
    </div>
  );
};

export default StoreItems;