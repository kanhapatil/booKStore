import React from "react";
import navStyles from "../../ShoppingCart.module.css";
import styles from "./Checkout.module.css";

const Checkout = () => {
  return (
    <>
      <div className={navStyles.nav}></div>
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
                  <tr>
                    <td>Hindi</td>
                    <td style={{ textAlign: "center" }}>2</td>
                    <td style={{ textAlign: "right" }}>$299</td>
                  </tr>

                  <tr>
                    <td>Mathematics, Hindi</td>
                    <td style={{ textAlign: "center" }}>1</td>
                    <td style={{ textAlign: "right" }}>$499</td>
                  </tr>

                  <tr>
                    <td>English</td>
                    <td style={{ textAlign: "center" }}>1</td>
                    <td style={{ textAlign: "right" }}>$199</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.subtotal}>
              <div className={styles.total}>
                <h6>
                  <strong>Total</strong>
                </h6>
                <h6>
                  <strong>$1200</strong>
                </h6>
              </div>

              <div className={styles.item}>
                <h6>
                  <strong>Items</strong>
                </h6>
                <h6>
                  <strong>3</strong>
                </h6>
              </div>

              <div className={styles.date}>
                <h6>
                  <strong>Date</strong>
                </h6>
                <h6>
                  <strong>Apr 24, 2024</strong>
                </h6>
              </div>

              <div className={styles.placeOrder}>
                <button className={styles.button}>Order Now</button>
                <button className={styles.button}>Receipt</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
