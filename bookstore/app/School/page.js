"use client";
import React, { useEffect, useState } from "react";
import styles from "./School.module.css";
import axios from "axios";
import Link from "next/link";

const School = () => {
  const [schoolStore, setSchoolStore] = useState();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchSchoolStore = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/store/schools/?search=${filter}`
        );
        setSchoolStore(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchSchoolStore();
  }, [filter]);

  const handleOnChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <main className={styles.main}>
        <div className="navbar"></div>

        <div className={styles.container}>
        <p className={styles.sub_heading}>⇤all schools⇥</p>
          <div className={styles.search}>
            <input
              type="search"
              className={`${styles.input} ${styles.searchInput}`}
              onChange={handleOnChange}
              placeholder="Search by your school name or city"
            />
          </div>

          {schoolStore
            ? schoolStore.map((item, index) => (
                <Link
                  href={`StoreItems/${item.store.id}`}
                  className={styles.school_store}
                  key={index}
                >
                  {/* School information */}
                  <div className={styles.school}>
                    <img src={item.image} alt="school image" />

                    <div className={styles.name}>
                      <p>{item.school_name}</p>
                    </div>
                  </div>

                  {/* Store information */}
                  <div className={styles.store}>
                    <img src={item.store.image1} alt="school image" />

                    <div className={styles.name}>
                      <p>{item.store.name}</p>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </main>
    </>
  );
};

export default School;
