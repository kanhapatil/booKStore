import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../app/ShoppingCart/Checkout/[Checkout]/Checkout.module.css";

const BillingInfo = () => {
  const [address, setAddress] = useState();
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:8000/user/address/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAddress(response.data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  if (address){
    console.log(address[0]["state"]);
  }
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
              value={address? address[0]["area"]: null}
              placeholder="Street Address"
            />
            <input type="text" className={styles.input} value="India" placeholder="Country" />
          </div>

          <p style={{ marginTop: "0.6rem" }}>
            &#43; Appartment, Building, Floor
          </p>

          <div className={styles.address2}>
            <input type="number" className={styles.input} value={address? address[0]["zipcode"]: null} placeholder="Zip" />
            <input type="text" className={styles.input} value={address? address[0]["city"]: null} placeholder="City" />
            <input type="text" className={styles.input} value={address? address[0]["state"]: null} placeholder="State" />
          </div>

          <div className={styles.addAddress}>
            <button className={styles.button1}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillingInfo;
