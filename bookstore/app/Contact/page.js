"use client"
import LogInImg from "@/components/LogInImg";
import styles from "./Contact.module.css";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SlEnvolope } from "react-icons/sl";
import { CiMobile3 } from "react-icons/ci";
import { MdLocationCity } from "react-icons/md";



const Contact = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      contact: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required!"),
        contact: Yup.string()
        .matches(/^[0-9]+$/, "Invalid mobile number")
        .required("Mobile Number Required!"),
      subject: Yup.string().required("Subject is required!"),
      message: Yup.string().required("Please enter a message!"),
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/user/contact/",
          values
        );
        resetForm();
        toast.success("Message sent successfully!");
      } catch (error) {
        if (error.response) {
          toast.error("Something happen wrong, try again!");
        }
      }
    },
  });

  return (
    <>
      <LogInImg />
      <ToastContainer />
      <div className={styles.contact}>
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
          <p className={styles.heading}>get in touch</p>

          <input
            type="email"
            placeholder="Email Address"
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email
                ? styles.errorInput
                : ""
            }`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}

          <input
            type="text"
            placeholder="Mobile Number"
            className={`${styles.input} ${
              formik.touched.contact && formik.errors.contact
                ? styles.errorInput
                : ""
            }`}
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact && (
            <div className={styles.error}>{formik.errors.contact}</div>
          )}

          <select
            name="subject"
            id="query-select"
            className={`${styles.select} ${
              formik.touched.subject && formik.errors.subject
                ? styles.errorInput
                : ""
            }`}
            {...formik.getFieldProps("subject")}
          >
            <option value="">--Please choose a query type--</option>
            <option value="Query">Query</option>
            <option value="Open store">Open store</option>
          </select>
          {formik.touched.subject && formik.errors.subject && (
            <div className={styles.error}>{formik.errors.subject}</div>
          )}

          <textarea
            className={`${styles.textarea} ${
              formik.touched.message && formik.errors.message
                ? styles.errorInput
                : ""
            }`}
            placeholder="Enter Message"
            {...formik.getFieldProps("message")}
          ></textarea>
          {formik.touched.message && formik.errors.message && (
            <div className={styles.error}>{formik.errors.message}</div>
          )}

          <button type="submit" className="btn">
            Send Message <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.form>
      </div>

      <div className={styles.box}>
          <div className={styles.box1}>
            <SlEnvolope style={{'fontSize':'2rem'}} />
            <h2>kanhap569@gmail.com</h2>
          </div>

          <div className={styles.box2}>
            <CiMobile3 style={{'fontSize':'2rem'}} />
            <h2>+91 9111-7152-45</h2>
          </div>

          <div className={styles.box3}>
            <MdLocationCity style={{'fontSize':'2rem'}} />
            <h2>Vijay nagar scheme no. 78, Slice 4</h2>
          </div>
      </div>
    </>
  );
};

export default Contact;
