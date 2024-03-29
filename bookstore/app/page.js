"use client";
import React from "react";
import Hero from "@/components/Hero";
import TopStore from "@/components/MyStores/TopStore";
import TopBook from "@/components/TopBook";


const Page = () => {
  return (
    <>
      <Hero />
      <TopStore />
      <TopBook />
    </>
  );
};

export default Page;