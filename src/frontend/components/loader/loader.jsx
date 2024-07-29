import React from 'react';
import loaderCSS from "./loader.module.css";

const Loader = () => {
  return (
    <div className={loaderCSS.loader}>
      <div className={loaderCSS.triangle}>
      <div className={`${loaderCSS.circle} ${loaderCSS.circle1}`}></div>
      <div className={`${loaderCSS.circle} ${loaderCSS.circle2}`}></div>
      <div className={`${loaderCSS.circle} ${loaderCSS.circle3}`}></div>
      </div>
    </div>
  );
};

export default Loader;
