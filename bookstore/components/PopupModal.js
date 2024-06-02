"use client"
import React, { useState, useRef, useEffect } from "react";
import styles from "./PopupModal.module.css";
import ReactStars from "react-stars";
import axios from "axios";

const PopupModal = ({ handleClose, itemId }) => {
  const [itemReview, setItemReview] = useState();
  const [stars, setStars] = useState(0);
  const descriptionRef = useRef(null);

  const handleStarChange = (newRating) => {
    setStars(newRating);
  };

  const handleSubmit = () => {
    const descriptionValue = descriptionRef.current.value;
    console.log("Stars:", stars);
    console.log("Description:", descriptionValue);
    console.log(itemId?itemId:null);

    handleClose();
  };

  useEffect(() => {
    const fetchItemReview = async () => {
        const response = await axios.get("http://127.0.0.1:8000/store/reviewitem/");
        console.log(response.data);
    }
    fetchItemReview();
  },[])

  return (
    <>
      <div className={styles.popup_modal}>
        <button className={styles.close_btn} onClick={handleClose}>
          &times;
        </button>

        <div className={styles.reviews}>
          <ReactStars
            count={5}
            size={34}
            color2={"#ffd700"}
            onChange={handleStarChange}
            value={stars}
          />
          <textarea
            className={styles.textarea}
            rows="4"
            ref={descriptionRef}
          ></textarea>
          <button className={styles.btn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
