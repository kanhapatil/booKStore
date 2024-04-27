"use client";
import React from "react";
import LogInImg from "@/components/LogInImg";
import styles from "./Profile.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        token ? null : router.push("/Login");
        if (token) {
          const response = await axios.get(
            "http://127.0.0.1:8000/user/address/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data[0]);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://127.0.0.1:8000/user/address/${data["id"]}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response) {
        toast.warning("Response is undefined!");
      }

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating profile.");
    }
  };

  return (
    <>
      <LogInImg />
      <ToastContainer />
      <div className={styles.profile}>
        <motion.form
          className={styles.form}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { scale: 0.4, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.2,
              },
            },
          }}
        >
          <p className={styles.heading}>User Profile</p>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            value={localStorage.getItem("email")}
          />

          <input
            type="text"
            placeholder="State"
            className={styles.input}
            value={data ? data["state"] : ""}
            onChange={(e) => setData({ ...data, state: e.target.value })}
          />

          <input
            type="text"
            placeholder="City"
            className={styles.input}
            value={data ? data["city"] : ""}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />

          <input
            type="text"
            placeholder="Area"
            className={styles.input}
            value={data ? data["area"] : ""}
            onChange={(e) => setData({ ...data, area: e.target.value })}
          />

          <input
            type="number"
            placeholder="House no."
            className={styles.input}
            value={data ? data["houseNo"] : ""}
            onChange={(e) => setData({ ...data, houseNo: e.target.value })}
          />

          <input
            type="number"
            placeholder="Zipcode"
            className={styles.input}
            value={data ? data["zipcode"] : ""}
            onChange={(e) => setData({ ...data, zipcode: e.target.value })}
          />

          <button type="submit" onClick={handleUpdate} className="btn">
            Update
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Signup;
