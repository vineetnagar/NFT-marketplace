import React from "react";
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
} from "../../components/NavBar/componentIndex";

const index = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
    </div>
  );
};

export default index;
