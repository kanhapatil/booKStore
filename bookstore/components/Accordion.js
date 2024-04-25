import React from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ title, data, isOpen, toggleAccordion }) => {
  return (
    <section className={styles.section}>
      <div className={styles.orders} onClick={toggleAccordion}>
        <div className={styles.orderInfo}>
          <div className={styles.storename}>Kanha book store</div>
          <div className={styles.orderDetails}>
            <h5>ITEMS 4</h5>
            <h5>Total $1299</h5>
            <h5>Apr 25, 2024</h5>
          </div>
        </div>
        <svg
          className={`w-4 h-4 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        {isOpen && (
          <div className={styles.ordersData}>
            <div className={styles.orderItems}>
              <div className={styles.image}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP_GLQMrxZmx93qFdNUUTpMqfHOUFNvs6Tw&s"
                  className={styles.img}
                />
              </div>
              <div className={styles.name}>The soul</div>
              <div className={styles.quantity}>3</div>
              <div className={styles.subtotal}>$299</div>
            </div>

            <div className={styles.orderItems}>
              <div className={styles.image}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP_GLQMrxZmx93qFdNUUTpMqfHOUFNvs6Tw&s"
                  className={styles.img}
                />
              </div>
              <div className={styles.name}>The soul</div>
              <div className={styles.quantity}>3</div>
              <div className={styles.subtotal}>$299</div>
            </div>

            <div className={styles.orderItems}>
              <div className={styles.image}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP_GLQMrxZmx93qFdNUUTpMqfHOUFNvs6Tw&s"
                  className={styles.img}
                />
              </div>
              <div className={styles.name}>The soul</div>
              <div className={styles.quantity}>3</div>
              <div className={styles.subtotal}>$299</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accordion;
