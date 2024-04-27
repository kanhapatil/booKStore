import React from "react";
import styles from "../../app/ShoppingCart/Checkout/[Checkout]/Checkout.module.css";

const BillingInfo = () => {
  return (
    <>
      <div className={styles.billingInfo}>
        <div className={styles.heading}>Billing Information</div>

        <form className={styles.form}>
          <div className={styles.userInfo1}>
            <input
              type="text"
              className={styles.input}
              placeholder="First Name"
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Last Name"
            />
          </div>

          <div className={styles.userInfo2}>
            <input
              type="text"
              className={styles.input}
              placeholder="Email Address"
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Phone Number"
            />
          </div>

          <div className={styles.address1}>
            <input
              type="text"
              className={styles.input}
              placeholder="Street Address"
            />
            <input type="text" className={styles.input} placeholder="Country" />
          </div>

          <p style={{ marginTop: "0.6rem" }}>
            &#43; Appartment, Building, Floor
          </p>

          <div className={styles.address2}>
            <input type="number" className={styles.input} placeholder="Zip" />
            <input type="text" className={styles.input} placeholder="City" />
            <input type="text" className={styles.input} placeholder="State" />
          </div>

          <div className={styles.addAddress}>
            <button className={styles.button1}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillingInfo;
