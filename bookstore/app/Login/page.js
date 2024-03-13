"use client";
import React from "react";
import LogInImg from "@/components/LogInImg";
import styles from "./Login.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

const Login = () => {
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
        >
          <p className={styles.heading}>Log in form</p>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />

          <div className={styles.account_text}>
            <p>
              &nbsp;&nbsp;Don't have an account?{" "}
              <Link href="/Signup">Signup</Link>
            </p>
            <p>Forget password?&nbsp;&nbsp;</p>
          </div>

          <button className={styles.btn}>
            Log In <span aria-hidden="true">&rarr;</span>
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
