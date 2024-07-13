import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../../assets/logo.png";
import navbarCSS from "./navbar.module.css";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
export const Navbar = () => {
  const { isLogin } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();
  return (
   <>
    <div className={navbarCSS.navbar}>
      <NavLink to="/" className={navbarCSS.logoContainer}>
        <img src={logo} alt="Anzen-logo" className={navbarCSS.logo} />
        <span>Anzen</span>
      </NavLink>
      <div className={navbarCSS.navbarOptions}>
        <div className={navbarCSS.startOptions}>
          {isLogin ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <span className={`${navbarCSS.login} ${navbarCSS.authButtons}`}>
                  Login
                </span>
              </NavLink>
              <NavLink to="/signup">
                <span
                  className={`${navbarCSS.signup} ${navbarCSS.authButtons}`}
                >
                  <span>Sign Up</span>
                </span>
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className={navbarCSS.showMore}>
        {!showMenu && (
          <i
            className={`${`fa-solid`} ${`fa-bars`}`}
            onClick={() => {
              setShowMenu(true);
              setAnimationClass(navbarCSS.dropDown);
            }}
          ></i>
        )}
        {showMenu && (
          <i
            className={`${`fa-solid`} ${`fa-xmark`}`}
            onClick={() => {
              setShowMenu(false);
              setAnimationClass(navbarCSS.waveOut);
            }}
          ></i>
        )}
      </div>
    </div>
    {showMenu && (
          <div className={`${navbarCSS.menu} ${animationClass}`}>
            <span
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
            >
              Login
            </span>
            <span
              onClick={() => {
                setShowMenu(false);
                navigate("/signup");
              }}
            >
              Signup
            </span>
          </div>
        )}
   </>
  );
};
