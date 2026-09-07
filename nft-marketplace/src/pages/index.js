import React, { useState, useContext, useEffect } from "react";
import Style from "../styles/index.module.css";
import { Loader } from "../../components/NavBar/componentIndex";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  Follower,
  AudioLive,
  Slider,
  Brand,
  Video,
  Loader,
} from "../../components/NavBar/componentIndex";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const index = () => {
  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

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

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life,"
      />
      <AudioLive />
      <Follower />
      <Title
        heading="Explore NFT's Video"
        paragraph="Click on play icon and enjoy NFT's video"
      />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life,"
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default index;
