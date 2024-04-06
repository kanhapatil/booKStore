import React from "react";
import styles from "./ShoppingCart.module.css";


const ShoppingCart = () => {
  return (
    <>
      <div className={styles.nav}></div>
      <section className={styles.section}>
        <div className={styles.shoppingCart}>
          <div className={styles.heading}>Shopping Cart</div>

          <div className={styles.cart}>
            <div className={styles.cartItem}>
              <div className={styles.image}>
                <img
                  src="https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg"
                  alt=""
                />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>
                  <p>
                    <strong>Modern Spaces</strong>
                  </p>
                  <p>Quantity: 3</p>
                </div>
                <div className={styles.inStock}>
                  <p>
                    <strong>In Stock</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.cartPrice}>
              <p>
                <strong>$399</strong>
              </p>
              <p className={styles.remove}>Remove</p>
            </div>
          </div>

          <div className={styles.cart}>
            <div className={styles.cartItem}>
              <div className={styles.image}>
                <img
                  src="https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg"
                  alt=""
                />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>
                  <p>
                    <strong>Modern Spaces</strong>
                  </p>
                  <p>Quantity: 3</p>
                </div>
                <div className={styles.inStock}>
                  <p>
                    <strong>In Stock</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.cartPrice}>
              <p>
                <strong>$399</strong>
              </p>
              <p className={styles.remove}>Remove</p>
            </div>
          </div>

          <div className={styles.cart}>
            <div className={styles.cartItem}>
              <div className={styles.image}>
                <img
                  src="https://template.canva.com/EADaopxBna4/1/0/251w-ujD6UPGa9hw.jpg"
                  alt=""
                />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>
                  <p>
                    <strong>Modern Spaces</strong>
                  </p>
                  <p>Quantity: 3</p>
                </div>
                <div className={styles.inStock}>
                  <p>
                    <strong>In Stock</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.cartPrice}>
              <p>
                <strong>$399</strong>
              </p>
              <p className={styles.remove}>Remove</p>
            </div>
          </div>

          <div className={styles.summary}>
            <div className={styles.info}>
              <p>
                <strong>Subtotal</strong>
              </p>
            </div>
            <div className={styles.total}>
              <p>
                <strong>$1299</strong>
              </p>
            </div>
          </div>

          <div className={styles.button}>
            <button>Checkout</button>
            <p style={{paddingTop:'5px'}}>or continue shopping</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
