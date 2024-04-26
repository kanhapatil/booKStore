"use client";
import React, { useEffect, useState } from "react";
import navStyles from "../../ShoppingCart.module.css";
import styles from "./Checkout.module.css";
import { useParams } from "next/navigation";
import axios from "axios";
import EmptyCart from "@/components/EmptyCart";

const Checkout = () => {
  const id = useParams();
  const [cartData, setCartData] = useState();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `http://127.0.0.1:8000/cart/mycart/${id.Checkout}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCartData(response.data);
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchCart();
  }, []);

  if (cartData) {
    console.log(cartData);
  }

  return (
    <>
      <div className={navStyles.nav}></div>
      {
        cartData?
        <section className={styles.section}>
        <div className={styles.checkOut}>
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
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Country"
                />
              </div>

              <p style={{ marginTop: "0.6rem" }}>
                &#43; Appartment, Building, Floor
              </p>

              <div className={styles.address2}>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Zip"
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="City"
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="State"
                />
              </div>

              <div className={styles.addAddress}>
                <button className={styles.button1}>Submit</button>
              </div>
            </form>
          </div>

          <div className={styles.orderInfo}>
            <div className={styles.heading}>Order Summary</div>

            <div className={styles.info}>
              <table className={styles.top}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", width: "50%" }}>
                      Products
                    </th>
                    <th style={{ width: "10%" }}>Quantity</th>
                    <th style={{ textAlign: "right", width: "40%" }}>
                      Subtotal
                    </th>
                  </tr>
                </thead>
    
                <tbody>
                  {cartData && cartData.cart.length > 0
                    ? cartData.cart.map((items, index) => (
                        <tr key={index} className={styles.tableData}>
                          <td>{items.name}</td>
                          <td style={{ textAlign: "center" }}>{items.quantity}</td>
                          <td style={{ textAlign: "right" }}>${items.price}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>

            <div className={styles.subtotal}>
              <div className={styles.total}>
                <h6>
                  <strong>Total</strong>
                </h6>
                <h6>
                  <strong>${cartData?cartData.subtotal:null}.00</strong>
                </h6>
              </div>

              <div className={styles.item}>
                <h6>
                  <strong>Items</strong>
                </h6>
                <h6>
                  <strong>{cartData?cartData.cart.length:null}</strong>
                </h6>
              </div>

              <div className={styles.date}>
                <h6>
                  <strong>Date</strong>
                </h6>
                <h6>
                  <strong>{cartData?cartData.date:null}</strong>
                </h6>
              </div>

              <div className={styles.placeOrder}>
                <button className={styles.button}>Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>:<EmptyCart />
      }
    </>
  );
};

export default Checkout;
