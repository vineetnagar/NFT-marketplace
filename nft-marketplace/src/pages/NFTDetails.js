import React from "react";
import Style from "../styles/NFTDetails.module.css";
import {
  Button,
  Category,
  Brand,
} from "../../components/NavBar/componentIndex";
import NFTDetailPage from "../../NFTDetailPage/NFTDetailPage";

const NFTDetails = () => {
  return (
    <div>
      <NFTDetailPage />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
