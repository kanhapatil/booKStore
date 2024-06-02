"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "./OrderItems.module.css";
import EmptyCart from "@/components/EmptyCart";
import PopupModal from "@/components/PopupModal";

const page = () => {
  const id = useParams();
  const [orderItems, setOrderItems] = useState();
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/order/myorderitem/?order_id=${id.OrderItems}`
        );
        setOrderItems(response.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    };

    fetchOrderItems();
  }, []);

  const handleOpen = (itemId) => {
    setOpen(true);
    setItemId(itemId);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="navbar"></div>

      <section className={`${styles.section} ${open ? styles.sectionOpaque : ""}`}>
        {orderItems && orderItems.length > 0 ? (
          <main className={styles.main}>
            <header className={styles.header}>
              <div className={styles.address}>
                <h2>Address</h2>
                <p>Vijay nagar scheme 78</p>
                <p>Slice - 4</p>
                <p>452010</p>
              </div>
              <div className={styles.purchased}>
                <h1>Purchase order</h1>
                <p>Purchase order# - PO-001</p>
              </div>
            </header>

            <div className={styles.info}>
              <div className={styles.deliver}>
                <h2>Deliver To:</h2>
                <p>Warehouse 1</p>
                <p>744 Drew court</p>
                <p>White city</p>
                <p>KS 66874</p>
              </div>
              <div className={styles.dates}>
                <h2>
                  Order date : <span>01-05-2024</span>
                </h2>
                <h2>
                  Delivery date : <span>02-05-2024</span>
                </h2>
              </div>
            </div>

            <div className={styles.items}>
              <table>
                <thead>
                  <tr>
                    <th>SR No.</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Review</th>
                  </tr>
                </thead>

                <tbody>
                  {orderItems && orderItems.length > 0
                    ? orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.item ? item.item.name : null}</td>
                          <td>{item.quantity}</td>
                          <td>${item.item ? item.item.price : null}</td>
                          <td>
                            $
                            {item.item ? item.item.price * item.quantity : null}
                          </td>
                          <td className={styles.clickme} onClick={() => handleOpen(item.id)}>
                            Click me
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>

            <div className={styles.total}>
              <div className={styles.button1}>
                <p>Download receipt</p>
              </div>

              <div className={styles.button2}>
                <p>Total</p>
                <p>$1299</p>
              </div>
            </div>
          </main>
        ) : (
          <EmptyCart />
        )}
      </section>

      {/* Popup modal */}
      {open && <PopupModal handleClose={handleClose} itemId={itemId} />}
    </>
  );
};

export default page;
