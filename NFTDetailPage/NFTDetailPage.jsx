import React from "react";
import Style from "./NFTDetailPage.module.css";
import { NFTDescription, NFTDetailsImage, NFTTabs } from "./NFTDetailsIndex";

const NFTDetailPage = () => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImage />
        <NFTDescription />
      </div>
    </div>
  );
};

export default NFTDetailPage;
