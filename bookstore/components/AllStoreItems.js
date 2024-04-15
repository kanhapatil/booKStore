import React from "react";
import styles from "../app/StoreItems/[StoreItems]/StoreItems.module.css";
import ReactStars from "react-stars";
import NoDataFound from "./NoDataFound";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";

const AllStoreItems = ({ storeItems, count, setCount }) => {
  const [idArray, setIdArray] = useState([]);

  const handleAdd = async (itemId) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (idArray.includes(itemId)) {
        toast.info("Item is already in the cart");
        return;
      }
      // Update count and idArray state
      setCount((prevCount) => prevCount + 1);
      setIdArray((prevIdArray) => [...prevIdArray, itemId]);
    }

    // Get store ID
    const storeId = window.location.href.split("/").pop();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please login yourself");
        return;
      }

      // Create cart
      const cartData = { store: Number(storeId) };
      const cartResponse = await axios.post(
        "http://127.0.0.1:8000/cart/mycart/",
        cartData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cartId = cartResponse.data.id || cartResponse.data.cart_id;

      // Add item to cart
      const cartItemData = { cart: cartId, item: itemId, quantity: 1 };
      const cartItemResponse = await axios.post(
        "http://127.0.0.1:8000/cart/mycartitem/",
        cartItemData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (cartItemResponse.status === 200) {
        toast.success("Item added successfully!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
  return (
    <>
      <ToastContainer />
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
                  <p className={styles.ratingsText}>({item.user_count}+)</p>
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

            {item.item_review && item.item_review.length > 0 ? (
              <div className={styles.itemReviews}>
                {item.item_review.map((review) => (
                  <div key={review.id} className={styles.review}>
                    <div>
                      <p>
                        <strong>User:</strong> {review.user}
                      </p>
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          color2={"#ffd700"}
                          value={review.rating}
                          edit={false}
                        />
                      </div>
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

      <div className={styles.endLine}></div>
      {count ? (
        <Link href="/ShoppingCart">
          <div className={styles.bottomCart}>
            <p className={styles.goCart}>View Cart</p>
            <p className={styles.goCart}>Items {count}</p>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default AllStoreItems;
