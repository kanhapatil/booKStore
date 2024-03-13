"use client"
import React, { use } from "react";
import {motion, useScroll} from "framer-motion";


const Xbar = () => {
    const {scrollYProgress} = useScroll();
  return (
    <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
  );
};

export default Xbar;
