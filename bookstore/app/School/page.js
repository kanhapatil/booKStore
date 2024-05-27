"use client";
import React, { useEffect, useState } from "react";
import styles from "./School.module.css";
import axios from "axios";
import Link from "next/link";

const School = () => {
  const [schoolStore, setSchoolStore] = useState([]);
  useEffect(() => {
    const fetchSchoolStore = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/store/schools/"
        );
        setSchoolStore(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchSchoolStore();
  }, []);

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

          {schoolStore
            ? schoolStore.map((item, index) => (
                <div key={index} className={styles.school_store}>
                  {/* School information */}
                  <div className={styles.school}>
                    <img src={item.image} alt="school image" />
                    <div className={styles.name}>
                      <p>{item.school_name}</p>
                    </div>
                  </div>

                  {/* Store information */}
                  <div className={styles.store}>
                      <Link href={`StoreItems/${item.store.id}`}>
                      <img src={item.store.image1} alt="store image" />
                      </Link>
                      <div className={styles.name}></div>
                    </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </>
  );
};

export default School;
