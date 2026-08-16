import React from "react";
import Style from "./Banner.module.css";
import Image from "next/image";
const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          alt="background"
          width={1300}
          height={400}
          objectFit="cover"
        />
      </div>

      <div className={Style.banner_img_mobile}>
        <Image
          src={bannerImage}
          alt="background"
          width={1300}
          height={900}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Banner;
