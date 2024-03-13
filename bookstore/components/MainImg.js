import React from "react";
import Image from "next/image";

const MainImg = () => {
  return (
    <div style={{ "position": "relative", "width": "100%", "height": "66vh" }}>
      <Image
        style={{'opacity':'1', 'filter': 'blur(4px)'}}
        src="/images/hero.jpg"
        layout="fill"
        objectFit="cover"
        alt="Picture of the author"
        quality={100}
        priority
      />
    </div>
  );
};

export default MainImg;
