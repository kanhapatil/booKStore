"use client";
import React, { useState } from "react";
import styles from "./TopBook.module.css";


const TopBook = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },

    {
      id: 2,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },

    {
      id: 3,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },

    {
      id: 4,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },

    {
      id: 5,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },

    {
      id: 6,
      img: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    },
  ]);

  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);

  const handleAdd = (index) => {
    setClick(!click);
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count <= 1) {
      setClick(!click);
      setCount(count - 1);
    } else {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <>
      <section>
        <div className={styles.title}>
          <p>Top Collections</p>
        </div>
        <div className={styles.top_books}>
          {books.map((item, key) => (
            <div className={styles.book} key={item.id}>
              <div className={styles.book_img}>
                <img src={item.img} alt="" />
              </div>

              {click ? (
                <div className={styles.book_count}>
                  <p>
                    <span className={styles.decrease} onClick={handleDecrease}>
                      -
                    </span>
                    <span>{count}</span>
                    <span className={styles.increase} onClick={handleIncrease}>
                      +
                    </span>
                  </p>
                </div>
              ) : (
                <div className={styles.book_content}>
                  <p className={styles.add} onClick={() => handleAdd(key)}>
                    ADD
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TopBook;
