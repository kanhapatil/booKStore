"use client";
import React, { useState } from "react";
import Hero from "@/components/Hero";
import TopStore from "@/components/MyStores/TopStore";
import Footer from "@/components/Footer";


const Page = () => {
  const [filterCity, setFilterCity] = useState("");

  return (
    <>
      <Hero setFilterCity={setFilterCity} />
      <TopStore filterCity={filterCity} />
      <Footer />
    </>
  );
};

export default Page;