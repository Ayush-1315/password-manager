import { useEffect } from "react";

import hero from "../../../assets/home.png";
import landingCSS from "./landingPage.module.css";

export const LandingPage = () => {
  useEffect(() => {
    document.title = "Anzen | Password Keeper";
  }, []);
  return (
    <>
      <div className={landingCSS.heroContainer}>
          <div className={landingCSS.heroContent}>
            <p>
              Your password
              {/* <i className={`${landingCSS.displayingIcons} ${`fa-solid fa-lock`}`}></i> */}
            </p>
            <p>
              {" "}
              - is your <span>password.</span>
            </p>
            <p>
            <p>Keep your passwords in a secure private vault - and simple access them with one click from all your devices.</p>
            </p>
          </div>   
        <div>
          <img src={hero} alt="hero" />
        </div>
      </div>
    </>
  );
};
