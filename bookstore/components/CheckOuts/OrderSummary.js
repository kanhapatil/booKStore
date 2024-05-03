import styles from "../../app/ShoppingCart/Checkout/[Checkout]/Checkout.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePDF } from "react-to-pdf";

const OrderSummary = ({ cartData }) => {
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const handleOrder = async (storeId, cartId) => {
    console.log("Store id:", storeId);
    console.log("Cart id:", cartId);

    const data = {
      store: storeId,
      cart: cartId,
    };
    console.log(data);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.post(
          "http://127.0.0.1:8000/order/myorder/",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        router.push("/Orders");
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  if (cartData) {
    console.log(cartData);
  }

  return (
    <>
      <div className={styles.orderInfo} ref={targetRef}>
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
            <button
              className={styles.button}
              onClick={() => handleOrder(cartData.store, cartData.id)}
            >
              Order Now
            </button>

            <button className={styles.button} onClick={() => toPDF()}>
              Receipt
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
