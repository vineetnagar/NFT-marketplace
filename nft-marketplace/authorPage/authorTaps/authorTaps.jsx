import React, { useState } from "react";
import Image from "next/image";
import Style from "./authorTaps.module.css";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

const AuthorTaps = ({
  setCollectables,
  setCreated,
  setLike,
  setFollower,
  setFollowing,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(false);

  const listArray = [
    "CreatedBy Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];
  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={() => openTab(e)}
            >
              Collectables
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={() => openTab(e)}
            >
              Created
            </button>
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={() => openTab(e)}
            >
              Liked
            </button>
            <button
              className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={() => openTab(e)}
            >
              Follower
            </button>
            <button
              className={`${activeBtn == 5 ? Style.active : ""}`}
              onClick={() => openTab(e)}
            >
              Following
            </button>
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDown()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={TbCopyleft.AuthorTaps_box_right_list}>
              {listArray.map(
                (el,
                (i) => (
                  <div
                    key={i + 1}
                    onClick={() => setSelectedMenu(el)}
                    className={Style.AuthorTaps_box_right_list_item}
                  ></div>
                )),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
