import React from 'react';
import mobileLoaderCSS from "./mobileLoader.module.css";

const MobileLoader = () => {
  return (
    <div className={mobileLoaderCSS.mobileLoader}>
      <div className={mobileLoaderCSS.spinner}></div>
    </div>
  );
};

export default MobileLoader;
