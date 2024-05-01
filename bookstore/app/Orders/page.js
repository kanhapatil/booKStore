"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./Orders.module.css";
import EmptyCart from "@/components/EmptyCart";
import Link from "next/link";

const Orders = () => {
  const [orderData, setOrderData] = useState();
  const router = useRouter();
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      token ? null : router.push("/Login");
      if (token) {
        const fetchOrders = async () => {
          const response = await axios.get(
            "http://127.0.0.1:8000/order/myorder/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrderData(response.data);
        };
        fetchOrders();
      } else {
        console.log("User not authenticated");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }, []);

  if (orderData) {
    console.log(orderData);
  }

  return (
    <>
      <div className="navbar"></div>
      <section className={styles.section}>
        {orderData && orderData.length > 0 ? (
          orderData.map((orders, key) => (
            <Link href={`Orders/OrderItems/${orders.id}`} className={styles.orders} key={key}>
              <div className={styles.topHeading}>
                <h4>{orders.storeName}</h4>
                <h5>{orders.date}</h5>
              </div>

              <div className={styles.orderInfo}>
                <div className={styles.item}>
                  <h5>Item</h5>
                  <h6>{orders.orderItem.length}</h6>
                </div>

                <div className={styles.total}>
                  <h5>Total</h5>
                  <h6>$1299</h6>
                </div>

                <div className={styles.status}>
                  <h5>Status</h5>
                  <h6>{orders.status === false ? "Pending" : "Accept"}</h6>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <EmptyCart />
        )}
      </section>
    </>
  );
};

export default Orders;
