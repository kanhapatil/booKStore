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

  const handleSubmit = async () => {
    const descriptionValue = descriptionRef.current.value;
    console.log("Stars:", stars);
    console.log("Description:", descriptionValue);
    console.log(itemId ? itemId : null);
  
    const reviewData = {
      item: itemId,
      rating:2,
      description:descriptionValue
    };
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/store/reviewitem/${itemId}/`, reviewData);
      console.log(response.status);
    } catch (error) {
      console.error("There was an error submitting the review:", error);
    }
  
    handleClose();
  };
  

  useEffect(() => {
    const fetchItemReview = async () => {
        const response = await axios.get("http://127.0.0.1:8000/store/reviewitem/5/");
        console.log(response.data, "kanha");
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
