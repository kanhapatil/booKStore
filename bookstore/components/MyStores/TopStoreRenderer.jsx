import React from "react";
import { motion } from "framer-motion";
import styles from "./TopStore.module.css";
import Link from "next/link";
import NoDataFound from "../NoDataFound";


const TopStoreRenderer = ({ stores }) => {
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
                <Link href="/StoreItems" className={styles.card}>               
                  <img src={item.image} className={styles.card__image} alt="" />
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
                </Link>
              </li>
            ) : (
              <li key={item.id}>
                <a
                  className={styles.card}
                  style={{ opacity: "0.5", cursor: "not-allowed" }}
                >
                  <img src={item.image} className={styles.card__image} alt="" />
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
          <NoDataFound />
        )}
      </motion.ul>
    </>
  );
};

export default TopStoreRenderer;
