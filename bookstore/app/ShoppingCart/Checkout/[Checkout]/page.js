"use client";
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { useParams } from "next/navigation";
import axios from "axios";
import EmptyCart from "@/components/EmptyCart";
import OrderSummary from "@/components/CheckOuts/OrderSummary";
import BillingInfo from "@/components/CheckOuts/BillingInfo";

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

  return (
    <>
      <div className="navbar"></div>
      {
        cartData?
        <section className={styles.section}>
        <div className={styles.checkOut}>

          {/* Add billing info component */}
          <BillingInfo />

          {/* Add order summary component */}
          <OrderSummary cartData={cartData} />

        </div>
      </section>:<EmptyCart />
      }
    </>
  );
};

export default Checkout;
