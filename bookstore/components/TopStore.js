"use client";
import React, { useState } from "react";
import styles from "./TopStore.module.css";
import { motion } from "framer-motion";

const TopStore = () => {
  const [stores, setStores] = useState([
    {
      id: 1,
      img: "https://www.shutterstock.com/shutterstock/photos/536451070/display_1500/stock-photo-portrait-of-a-beautiful-brunette-woman-looking-for-a-book-in-store-536451070.jpg",
      title: "Jessica Parker",
      status: "1 hour ago",
    },

    {
      id: 2,
      img: "https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1709596800&semt=sph",
      title: "Jessica Parker",
      status: "1 hour ago",
    },

    {
      id: 3,
      img: "https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Jessica Parker",
      status: "1 hour ago",
    },

    {
      id: 4,
      img: "https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1709596800&semt=sph",
      title: "Jessica Parker",
      status: "1 hour ago",
    },
  ]);
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
        {stores.map((item, key) => (
          <li key={item.id}>
            <a href="" className={styles.card}>
              <img
                src={item.img}
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
                    src="https://i.imgur.com/7D7I6dI.png"
                    alt=""
                  />
                  <div className={`${styles.card__header}, {styles.text}`}>
                    <h3 className={styles.card__title}>{item.title}</h3>
                    <span className={styles.card__status}>{item.status}</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default TopStore;