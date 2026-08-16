import React from "react";
import Style from "./Brand.module.css";
import Image from "next/image";
import images from "../../img";
import { Button } from "../NavBar/componentIndex";
const Brand = () => {
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div classname={Style.Brand_box_left}>
          <Image src={images.logo} alt="Brand logo" width={100} height={100} />
          <h1>Earn free crypto with Ciscrypt</h1>
          <p>A creative agency that leads and inspire</p>

          <div className={Style.Brand_box_left_btn}>
            <Button btnName="Create" handleClick={() => {}}></Button>
            <Button btnName="Discover" handleClick={() => {}}></Button>
          </div>
        </div>
        <div classname={Style.Brand_box_right}>
          <Image src={images.earn} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;
