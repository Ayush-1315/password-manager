import React from "react";
import mobileLoaderCSS from "./mobileLoader.module.css";

const MobileLoader = ({ displayProp }) => {
  return (
    <div
      className={mobileLoaderCSS.mobileLoader}
      style={{ display: typeof displayProp === "string" ? displayProp : "" }}
    >
      <div className={mobileLoaderCSS.spinner}></div>
    </div>
  );
};

export default MobileLoader;
