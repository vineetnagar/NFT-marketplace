import React, { useState, useEffect } from "react";
import Style from "./Follower.module.css";
import { FollowerTabCard } from "../NavBar/componentIndex";

import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";

const Follower = () => {
  const CardArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const FollowingArray = [1, 2, 3, 4, 5, 6];
  const NewsArray = [1, 2, 3, 4, 5];

  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };

  const openFollowing = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };

  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };
  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2>Top Creators List...</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={() => openPopular()}>
              <RiUserFollowFill />
              Popular
            </button>
            <button onClick={() => openFollower()}>
              <RiUserUnfollowFill />
              Following Popular
            </button>
            <button onClick={() => openNews()}>
              <RiAwardLine /> NoteWorthy Popular
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {CardArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}

          {news && (
            <div className={Style.followerTab_box}>
              {NewsArray.map((el, i) => (
                <FollowerTabCard key={i + 1} i={i} el={el} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div classAnme={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become Author</a>
        </div>
      </div>
    </div>
  );
};

export default Follower;
