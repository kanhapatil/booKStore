"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LogInImg from '@/components/LogInImg';
import styles from './Login.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [csrfToken, setCsrfToken] = useState(null); // Initialize with null as a fallback value

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/get_csrf/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address!').required('Email address is required!'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required!'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!csrfToken) {
          console.error('CSRF token is not available yet.');
          return;
        }

        console.log(csrfToken);

        const response = await axios.post(
          'http://127.0.0.1:8000/user/login/',
          values,
          {
            headers: {
              'X-CSRFToken': csrfToken,
            },
          }
        );

        if (response.status === 200) {
          console.log('Login successful');
        }
      } catch (error) {
        console.log(csrfToken);
        console.error('Login failed:', error.response.status);
      }
      resetForm();
    },
  });

  return (
    <>
      <LogInImg />

      <div className={styles.login}>
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
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <p className={styles.heading}>Log in form</p>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={styles.error}>{formik.errors.username}</div>
          )}

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}

          <div className={styles.account_text}>
            <p>
              &nbsp;&nbsp;Don't have an account? <Link href="/Signup">Signup</Link>
            </p>
            <p>Forget password?&nbsp;&nbsp;</p>
          </div>

          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken || ''} />

          <button type="submit" className={styles.btn} disabled={!csrfToken}>
            Log In <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
