"use client";
import React from "react";
import Hero from "@/components/Hero";
import TopStore from "@/components/MyStores/TopStore";
import TopBook from "@/components/TopBook";
import Footer from "@/components/Footer";


const Page = () => {
  return (
    <>
      <Hero />
      <TopStore />
      <TopBook />
      <Footer />
    </>
  );
};

export default Page;