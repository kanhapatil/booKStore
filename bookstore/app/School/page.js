import React from "react";
import styles from "./School.module.css";

const School = () => {
  return (
    <>
      <main className={styles.main}>
        <div className="navbar"></div>

        <div className={styles.container}>
          <div className={styles.search}>
            <input
              type="search"
              className={`${styles.input} ${styles.searchInput}`}
              placeholder="Search by your school name or store name"
            />
          </div>

          <div className={styles.school_store}>
            <div className={styles.school}></div>
            <div className={styles.store}></div>
          </div>

          <div className={styles.school_store}>
            <div className={styles.school}></div>
            <div className={styles.store}></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default School;
