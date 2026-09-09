import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import images from "../../img";
import Style from "./Error.module.css";

import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div classNam={Style.Error_box_info}>
          <Image
            src={images.errorGif}
            alt="error"
            width={200}
            height={200}
            objectFit="cover"
            className={Style.Error_box_info_img}
          />
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
