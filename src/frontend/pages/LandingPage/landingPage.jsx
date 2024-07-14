import { useEffect } from "react";
import { Link } from "react-router-dom";

import landingCSS from "./landingPage.module.css";
import logo from "../../../assets/logo.png";
import paypal from "../../../assets/logo1.png";
import figma from "../../../assets/logo2.png";
import facebook from "../../../assets/logo3.png";
import google from "../../../assets/logo4.png";
import udemy from "../../../assets/logo5.png";
import spotify from "../../../assets/logo6.png";

export const LandingPage = () => {
  useEffect(() => {
    document.title = "Anzen | Password Keeper";
  }, []);
  return (
    <div className={landingCSS.hero}>
      <div className={landingCSS.heroContainer}>
        <h1>
          Take control of your digital security 
          with our password manager
        </h1>
        <p>
          Collaboration is made easy with our cloud storage platform.  You
          can easily access your passwords from anywhere with the security of
          Anzen Password Manager.
        </p>
        <Link to="/signup" className={landingCSS.tryNow}>
          Try Anzen Now <i className={`${`fa-solid`} ${`fa-key`}`}></i>
        </Link>
      </div>
      <div className={landingCSS.cardContainer}>
        <div className={`${`glassCard`} ${landingCSS.cards}`}>
          <div className={`${`subGlasscard`} ${landingCSS.subCards} `}>
            <h1>350 K</h1>
            <p>
              Many people use Anzen for <br />
              secure their passwords.
            </p>
          </div>
          <div className={`${`subGlasscard`} ${landingCSS.subCards} `}>
            <h1>98%</h1>
            <p>
              Anzen's user were saved during <br />
              various fraud attempts.
            </p>
          </div>
        </div>
        <div className={`${`glassCard`} ${landingCSS.cards}`}>
          <div className={landingCSS.circle}>
            <div className={landingCSS.innerCircle}>
              <img src={logo} alt="Anzen" className={landingCSS.cardLogos}/>
              <img src={paypal} alt="Paypal" className={landingCSS.cardLogos}/>
              <img src={figma} alt="Figma" className={landingCSS.cardLogos}/>
              <img src={facebook} alt="Facebook" className={landingCSS.cardLogos}/>
              <img src={google} alt="Google" className={landingCSS.cardLogos}/>
              <img src={udemy} alt="Udemy" className={landingCSS.cardLogos}/>
              <img src={spotify} alt="Spotify" className={landingCSS.cardLogos}/>
            </div>
          </div>
        </div>
        <div className={`${`glassCard`} ${landingCSS.cards}`}>
          <img src={spotify} alt="Spotify" className={landingCSS.sampleCardLogo}/>
          <span>accounts.spotify.com</span>
          <div className={landingCSS.samplePassword}>
            <span>•••••••••</span>
            <span><i className="fa-regular fa-eye"></i></span>
          </div>
          <div className={landingCSS.sampleSuggestion}>
            <span>Strong Password</span>
            <span><i className="fa-solid fa-square-check"></i></span>
          </div>
          <div className={landingCSS.passwordStatus}>
            <div className={landingCSS.passwordBar}></div>
            <div className={landingCSS.passwordBar}></div>
            <div className={landingCSS.passwordBar}></div>
          </div>
          <p>
            Your password is one of the most important lines of defense against online threats. It's crucial to have a strong and secure password to keep your personal information safe.
          </p>
        </div>
      </div>
    </div>
  );
};
