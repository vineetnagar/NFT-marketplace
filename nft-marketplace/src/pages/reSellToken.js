import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Style from "../styles/reSellToken.module.css";
import formStyle from "../../AccountPage/Form/Form.module.css";
import { Button } from "../../components/NavBar/componentIndex";
import Image from "next/image";

import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const reSellToken = () => {
  const { currentAccount, createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    setPrice(data.price);
    setImage(data.image);
  };
  useEffect(() => {
    fetchNFT();
  }, [id]);

  const reSell = async () => {
    await createSale(tokenURI, price, true, id);
    router.push("/author");
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1> ReSell Your Token,SetPrice</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="vineet nagar"
            className={formStyle.Form_box_input_userName}
          />
        </div>
        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="resell nft" width={400} height={400} />
          )}
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="ReSell NFT" handleClick={() => reSell()} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
