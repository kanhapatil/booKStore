import React from "react";
import styles from "../../app/ShoppingCart/Checkout/[Checkout]/Checkout.module.css";

const OrderSummary = ({cartData}) => {
  return (
    <>
      <div className={styles.orderInfo}>
        <div className={styles.heading}>Order Summary</div>

        <div className={styles.info}>
          <table className={styles.top}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", width: "50%" }}>Products</th>
                <th style={{ width: "10%" }}>Quantity</th>
                <th style={{ textAlign: "right", width: "40%" }}>Subtotal</th>
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
            <h5 className={styles.h5}>
              <strong>${cartData ? cartData.subtotal : null}.00</strong>
            </h5>
          </div>

          <div className={styles.item}>
            <h6>
              <strong>Items</strong>
            </h6>
            <h5 className={styles.h5}>
              <strong>{cartData ? cartData.cart.length : null}</strong>
            </h5>
          </div>

          <div className={styles.date}>
            <h6>
              <strong>Date</strong>
            </h6>
            <h5 className={styles.h5}>
              <strong>{cartData ? cartData.date : null}</strong>
            </h5>
          </div>

          <div className={styles.placeOrder}>
            <button className={styles.button}>Order Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
