import React from "react";
import Image from "next/image";

const LogInImg = () => {
  return (
    <div style={{ "position": "relative", "width": "100%", "height": "100vh" }}>
      <Image
        style={{'opacity':'1', 'filter': 'blur(4px)'}}
        src="/images/main.jpg"
        layout="fill"
        objectFit="cover"
        alt="Picture of the author"
        quality={100}
        priority
      />
    </div>
  );
};

export default LogInImg;
