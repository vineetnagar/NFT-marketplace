import React from "react";
import Style from "./searchBar.module.css";
import { BsSearch, BsArrowRight } from "react-icons/bs";
const SearchBar = () => {
  return (
    <div classame={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input type="text" placeholder="Type your Keyword..." />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
