import React from "react";
import Style from "./Category.module.css";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";
import images from "../../img";

const Category = () => {
  const CategoryArray = [
    { background: images.creatorbackground1 },
    { background: images.creatorbackground2 },
    { background: images.creatorbackground3 },
    { background: images.creatorbackground4 },
    { background: images.creatorbackground5 },
    { background: images.creatorbackground6 },
    { background: images.creatorbackground7 },
    { background: images.creatorbackground8 },
  ];
  return (
    <div className={Style.box_category}>
      <div className={Style.category}>
        {CategoryArray.map((el, i) => (
          <div className={Style.category_box} key={1 + 1}>
            <Image
              src={el.background}
              className={Style.category_box_img}
              alt="Background image"
              width={350}
              height={80}
              objectFit="cover"
            />

            <div className={Style.category_box_title}>
              <span>
                <BsCircleFill />
              </span>
              <div className={Style.category_box_title_info}>
                <h4>Enterainment</h4>
                <small>1995 NFTS</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
