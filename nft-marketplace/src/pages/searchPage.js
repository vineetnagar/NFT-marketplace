import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../../components/NavBar/componentIndex";
import { SearchBar } from "../../searchPage/searchBarIndex";
import { Filter } from "../../components/NavBar/componentIndex";
import NFTCardTwo from "../../collectionPage/NFTCardtwo/NFTCardtwo";
import { Banner } from "../../collectionPage/collectionIndex";
import images from "../../img";

//Smart contract import
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const SearchPage = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    const getNFTs = async () => {
      try {
        const items = await fetchNFTs();
        console.log(items);
        setNfts(items.reverse());
        setNftsCopy(items);
      } catch (error) {
        console.log("Error fetching NFTs on search page:", error);
      }
    };
    getNFTs();
  }, [fetchNFTs]);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase()),
    );
    if (filteredNFTs.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTs);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };
  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  // ];
  return (
    <div className={Style.SearchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default SearchPage;
