// "use client"
// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import LogInImg from "@/components/LogInImg";
// import styles from "./Profile.module.css";
// import { useFormik } from 'formik';
// import { motion } from 'framer-motion';

// const Profile = () => {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//       const fetchUserData = async () => {
//           try {
//               const token = localStorage.getItem('token');
//               if (token) {
//                   const response = await axios.get("http://127.0.0.1:8000/user/address/", {
//                       headers: {
//                           'Authorization': `Bearer ${token}`
//                       }
//                   });
//                   setData(response.data);
//                   console.log(response.data);
//               } else {
//                   console.log("something went wrong");
//               }
//           } catch (error) {
//               console.error('Error fetching user data:', error);
//           }
//       };

//       fetchUserData();
//   }, []);

//   return (
//     <>
//     <LogInImg />
//     <div className={styles.signup}>
//         <motion.form
//           className={styles.form}
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: { scale: 0.4, opacity: 0 },
//             visible: {
//               scale: 1,
//               opacity: 1,
//               transition: {
//                 delay: 0.2,
//               },
//             },
//           }}
//         //   onSubmit={formik.handleSubmit}
//         >
//           <p className={styles.heading}>Registration form</p>

//           <input
//             type="email"
//             placeholder="Email Address"
//             className={styles.input}
//             {...formik.getFieldProps("email")}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <div className={styles.error}>{formik.errors.email}</div>
//           )}

//           <input
//             type="number"
//             placeholder="Mobile Number"
//             className={styles.input}
//             {...formik.getFieldProps("contact")}
//           />
//           {formik.touched.contact && formik.errors.contact && (
//             <div className={styles.error}>{formik.errors.contact}</div>
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             className={styles.input}
//             {...formik.getFieldProps("password")}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div className={styles.error}>{formik.errors.password}</div>
//           )}

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className={styles.input}
//             {...formik.getFieldProps("confirmPassword")}
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <div className={styles.error}>{formik.errors.confirmPassword}</div>
//           )}

//           <div className={styles.account_text}>
//             <p>
//               &nbsp;&nbsp;Already have an account?{" "}
//               <Link href="/Login">Signin</Link>
//             </p>
//           </div>

//           <button type="submit" className={styles.btn}>
//             Register <span aria-hidden="true">&rarr;</span>
//           </button>
//         </motion.form>
//       </div>
//     </>
//   )
// }

// export default Profile

"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LogInImg from "@/components/LogInImg";
import styles from "./Profile.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email address is required!"),
      state: Yup.string().required("State is required!"),
      city: Yup.string().required("City is required!"),
      area: Yup.string().required("Area is required!"),
      houseno: Yup.number().required("House no. is required!"),
      zipcode: Yup.number().required("Zipcode is required!"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("ok");
      } catch (error) {
        console.log("ok");
      }
    },
  });

  const [data, setData] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
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
          console.log(response.data[0]);
          console.log("my data", data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (data && data["state"]) {
    console.log(data["state"]);
  }

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
          onSubmit={formik.handleSubmit}
        >
          <p className={styles.heading}>User Profile</p>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            value={localStorage.getItem("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}

          <input
            type="text"
            placeholder="State"
            className={styles.input}
            value={data ? data["state"] : ""}
            onChange={(e) => setData({ ...data, state: e.target.value })}
          />

          {formik.touched.state && formik.errors.state && (
            <div className={styles.error}>{formik.errors.state}</div>
          )}

          <input
            type="text"
            placeholder="City"
            className={styles.input}
            value={data ? data["city"] : ""}
          />
          {formik.touched.city && formik.errors.city && (
            <div className={styles.error}>{formik.errors.city}</div>
          )}

          <input
            type="text"
            placeholder="Area"
            className={styles.input}
            value={data ? data["area"] : ""}
          />
          {formik.touched.area && formik.errors.area && (
            <div className={styles.error}>{formik.errors.area}</div>
          )}

          <input
            type="number"
            placeholder="House no."
            className={styles.input}
            value={data ? data["houseNo"] : ""}
          />
          {formik.touched.houseno && formik.errors.houseno && (
            <div className={styles.error}>{formik.errors.houseno}</div>
          )}

          <input
            type="number"
            placeholder="Zipcode"
            className={styles.input}
            value={data ? data["zipcode"] : ""}
          />
          {formik.touched.zipcode && formik.errors.zipcode && (
            <div className={styles.error}>{formik.errors.zipcode}</div>
          )}

          <button type="submit" className={styles.btn}>
            Update
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Signup;
