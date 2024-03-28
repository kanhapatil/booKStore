"use client";
import React, { useEffect, useState } from "react";
import styles from "./TopStore.module.css";
import { motion } from "framer-motion";
import axios from "axios";

const TopStore = () => { 
  const [stores, setStores] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        if(token){
          const response = await axios.get(
            "http://127.0.0.1:8000/store/mystore/", 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStores(response.data);
        } else{
          const response = await axios.get("http://127.0.0.1:8000/store/mystore/");
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchStores();
  }, []);

  if (stores) {
    console.log(stores);
  }

  return (
    <>
      <motion.ul
        className={styles.cards}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0.4, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.4 } },
        }}
      >
        {stores ? (
          stores.map((item, key) =>
            item.status ? (
              <li key={item.id}>
                <a href="" className={styles.card}>
                  <img
                    src={item.image}
                    className={styles.card__image}
                    alt=""
                  />
                  <div className={styles.card__overlay}>
                    <div className={styles.card__header}>
                      <svg
                        className={styles.card__arc}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path />
                      </svg>
                      <img
                        className={styles.card__thumb}
                        src={`https://www.shutterstock.com/shutterstock/photos/536451070/display_1500/stock-photo-portrait-of-a-beautiful-brunette-woman-looking-for-a-book-in-store-536451070.jpg`}
                        alt=""
                      />
                      <div className={`${styles.card__header}, {styles.text}`}>
                        <h3 className={styles.card__title}>{item.name}</h3>
                        <span className={styles.card__status}>⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ) : (
              <li key={item.id}>
                <a className={styles.card} style={{'opacity':'0.5', 'cursor': 'not-allowed'}}>
                  <img
                    src={item.image}
                    className={styles.card__image}
                    alt=""
                  />
                  <div className={styles.card__overlay}>
                    <div className={styles.card__header}>
                      <svg
                        className={styles.card__arc}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path />
                      </svg>
                      <img
                        className={styles.card__thumb}
                        src={`https://www.shutterstock.com/shutterstock/photos/536451070/display_1500/stock-photo-portrait-of-a-beautiful-brunette-woman-looking-for-a-book-in-store-536451070.jpg`}
                        alt=""
                      />
                      <div className={`${styles.card__header}, {styles.text}`}>
                        <h3 className={styles.card__title}>{item.name}</h3>
                        <span className={styles.card__status}>⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )
          )
        ) : (
          <h1>No data</h1>
        )}
      </motion.ul>
    </>
  );
};

export default TopStore;
