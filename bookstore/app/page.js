"use client";
import Hero from "@/components/Hero";
import TopStore from "@/components/MyStores/TopStore";
import Footer from "@/components/Footer";
import {ContextProvider} from "@/components/Context";

const Page = () => {
  return (
    <ContextProvider>
      <>
        <Hero />
        <TopStore />
        <Footer />
      </>
    </ContextProvider>
  );
};

export default Page;
