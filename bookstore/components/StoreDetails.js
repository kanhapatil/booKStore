import React from "react";
import styles from "../app/StoreItems/[StoreItems]/StoreItems.module.css";
import ReactStars from "react-stars";


const StoreDetails = ({storeDetails}) => {
  return (
    <>
      <div className={styles.storePoster}>
        {storeDetails && (
          <>
            <div className={styles.left}>
              <img src={storeDetails.image1} alt="Store Image" />
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                <img src={storeDetails.image2} alt="Store Image" />
              </div>
              <div className={styles.bottom}>
                <img src={storeDetails.image3} alt="Store Image" />
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        {storeDetails && (
          <div className={styles.storeInformation}>
            <p className={styles.name}>{storeDetails.name}</p>
            <p className={styles.address}>
              {storeDetails.city}, {storeDetails.location}
            </p>
            <div className={styles.ratingContainer}>
              <ReactStars
                count={5}
                size={24}
                color2={"#ffd700"}
                value={storeDetails.average_rating}
                edit={false}
              />
              <p className={styles.ratingsText}>({storeDetails.review_counts})</p>
            </div>
            <button className={styles.button}>Direction</button> &nbsp;
            <button className={styles.button}>Share</button> &nbsp;
            <button className={styles.button}>
              <a href={`tel:${storeDetails.contact}`}>Call</a>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StoreDetails;
