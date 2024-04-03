"use client";
import MainImg from "@/components/MainImg";
import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import { GoArrowSwitch } from "react-icons/go";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="bg-white">
        <MainImg />
        <div className={styles.mid_content}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { scale: 0.4, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
            }}
          >
            <div className={styles.heading}>
              <p>
                boo<span>KS</span>tore
              </p>
            </div>

            <div className={styles.sub_heading}>
              <p>Discover the best books & notes in Indore</p>
            </div>

            <div className={styles.search_bar}>
              <i className={styles.material_icons}></i>
              <select name="city" id="city" className={styles.select}>
                <option value="Indore">Indore</option>
                <option value="Khargone">Khargone</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Ujjain">Ujjain</option>
              </select>

              <input
                type="search"
                className={styles.input}
                placeholder="Search for stores, syllabus, book"
              />
            </div>

            <div className={styles.switch_to_store}>
              <p>Switch to store</p>
              <div className={styles.switcher}>
                <a href="http://127.0.0.1:8000/admin/login/">
                  <GoArrowSwitch />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
