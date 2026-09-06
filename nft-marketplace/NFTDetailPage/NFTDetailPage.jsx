import React from "react";
import Style from "./NFTDetailPage.module.css";
import { NFTDescription, NFTDetailsImage, NFTTabs } from "./NFTDetailsIndex";

const NFTDetailPage = ({ nft }) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImage nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetailPage;
