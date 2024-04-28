"use client";
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const loading = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "76vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#7a1f1f"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};

export default loading;
