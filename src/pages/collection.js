import React from "react";
import Style from "../styles/collection.module.css";
import images from "../../img";
import {
  Banner,
  CollectionProfile,
  NFTCardtwo,
} from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/NavBar/componentIndex";
import Filter from "../../components/Filter/Filter";

const Collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile NFTData={collectionArray} />
      <NFTCardtwo NFTData={collectionArray} />
      <Filter />
      <Slider />
      <Brand />
    </div>
  );
};

export default Collection;
