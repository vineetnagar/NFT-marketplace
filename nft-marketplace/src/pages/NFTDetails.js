import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//import Smart Contract
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import {
  Button,
  Category,
  Brand,
} from "../../components/NavBar/componentIndex";
import NFTDetailPage from "../../NFTDetailPage/NFTDetailPage";

const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady, router.query]);
  return (
    <div>
      <NFTDetailPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
