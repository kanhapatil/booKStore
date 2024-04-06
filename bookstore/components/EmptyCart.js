import React from "react";
import Image from "next/image";

const EmptyCart = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "76vh",
        }}
      >
        <Image
          width={300}
          height={300}
          src="/images/EmptyCart.svg"
          alt="No Data Found"
          quality={100}
          priority
        />
      </div>
    </>
  );
};

export default EmptyCart;
