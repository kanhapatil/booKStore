"use client";
import React, { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import axios from "axios";
import EmptyCart from "@/components/EmptyCart";
import Link from "next/link";

const ShoppingCart = () => {
  const [cart, setCart] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    const fetchShoppingCart = async () => {
      setUpdateFlag(false);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const cartResponse = await axios.get(
            "http://127.0.0.1:8000/cart/mycart/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCart(cartResponse.data);
        } else {
          console.log("Login yourself");
        }
      } catch (error) {
        console.log("Something wrong check it");
      }
    };

    fetchShoppingCart();
  }, [updateFlag]);

  if(cart){
    const data = cart;
    console.log(data);
  }

  const handleRemove = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const itemDelete = await axios.delete(
          `http://127.0.0.1:8000/cart/mycartitem/${cartItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (itemDelete.status === 200) {
          setUpdateFlag(true);
        }
      }
    } catch (error) {
      console.log("Error occurred while removing item from cart:", error);
    }
  };

  return (
    <>
      <div className={styles.nav}></div>
      {cart && cart.length > 0 ? (
        cart.map((mainCart, key) => (
          <section key={mainCart.id} className={styles.section}>
            <div className={styles.shoppingCart}>
              <div className={styles.heading}>{mainCart.store_name}</div>
              <p className={styles.subheading} >Shopping Cart</p>

              {mainCart.cart.map((items, key) => (
                <div key={items.id} className={styles.cart}>
                  <div className={styles.cartItem}>
                    <div className={styles.image}>
                      <img
                        src={`http://127.0.0.1:8000${items.item_images[0]}`}
                        alt=""
                      />
                    </div>
                    <div className={styles.details}>
                      <div className={styles.info}>
                        <p className={styles.name}>
                          <strong>{items.name}</strong>
                        </p>
                        <p>Quantity: {items.quantity}</p>
                      </div>
                      <div className={styles.inStock}>
                        <p>
                          <strong>✅In Stock</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cartPrice}>
                    <p>
                      <strong>${items.price}</strong>
                    </p>
                    <p
                      className={styles.remove}
                      onClick={() => handleRemove(items.id)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}

              <div className={styles.summary}>
                <div className={styles.info}>
                  <p>
                    <strong>Subtotal</strong>
                  </p>
                </div>
                <div className={styles.total}>
                  <p>
                    <strong>${mainCart.subtotal}</strong>
                  </p>
                </div>
              </div>

              <div className={styles.button}>
                <button>Checkout</button>
                <p className={styles.continue}>
                  <Link href="/">or continue shopping</Link>
                </p>
              </div>
            </div>
          </section>
        ))
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default ShoppingCart;
