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
      contact: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address!")
        .required("Email address is required!"),
      contact: Yup.number().required("Mobile number is required!"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required!"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("ok");
      } catch (error) {
        console.log("ok");
      }
    },
  });

  const [data, setData] = useState(null);
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
          setData(response.data);
          console.log(response.data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <LogInImg />
      <ToastContainer />
      <div className={styles.signup}>
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
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}

          <input
            type="number"
            placeholder="Mobile Number"
            className={styles.input}
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact && (
            <div className={styles.error}>{formik.errors.contact}</div>
          )}

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className={styles.error}>{formik.errors.confirmPassword}</div>
          )}

          <div className={styles.account_text}>
            <p>
              &nbsp;&nbsp;Already have an account?{" "}
              <Link href="/Login">Signin</Link>
            </p>
          </div>

          <button type="submit" className={styles.btn}>
            Update <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Signup;
