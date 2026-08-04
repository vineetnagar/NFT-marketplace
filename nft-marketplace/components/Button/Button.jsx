import React from "react";

import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, className = "" }) => {
  return (
    <div className={Style.box}>
      <div
        className={`${Style.button} ${className}`.trim()}
        onClick={() => {
          handleClick();
        }}
      >
        {btnName}
      </div>
    </div>
  );
};

export default Button;
