import React from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../../components/NavBar/componentIndex";
import { SearchBar } from "../../searchPage/searchBarIndex";
import { Filter } from "../../components/NavBar/componentIndex";
import NFTCardTwo from "../../collectionPage/NFTCardtwo/NFTCardtwo";
import { Banner } from "../../collectionPage/collectionIndex";
import images from "../../img";
const SearchPage = () => {
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
    <div className={Style.SearchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default SearchPage;
