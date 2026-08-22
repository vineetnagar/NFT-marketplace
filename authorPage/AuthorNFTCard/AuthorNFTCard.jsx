import React, { useState } from "react";
import Style from "./AuthorNFTCard.module.css";
import images from "../../img";
import NFTCardTwo from "../../collectionPage/NFTCardtwo/NFTCardtwo";
import { FollowerTabCard } from "../../components/NavBar/componentIndex";
const AuthorNFTCard = ({
  collectables,
  created,
  like,
  follower,
  following,
}) => {
  const collectablesArray = [
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

  const createdArray = [
    images.nft_image_3,
    images.nft_image_2,
    images.nft_image_1,
  ];

  const likeArray = [
    images.nft_image_2,
    images.nft_image_1,
    images.nft_image_3,
  ];

  const followerArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];

  const followingArray = [
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectables && <NFTCardTwo NFTData={collectablesArray} />}
      {created && <NFTCardTwo NFTData={createdArray} />}
      {like && <NFTCardTwo NFTData={likeArray} />}
      {follower && <NFTCardTwo NFTData={followerArray} />}
      {following && <NFTCardTwo NFTData={followingArray} />}
    </div>
  );
};

export default AuthorNFTCard;
