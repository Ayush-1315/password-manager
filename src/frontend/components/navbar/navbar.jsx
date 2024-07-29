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
        <NavLink
          to={isLogin ? `/home` : `/`}
          className={navbarCSS.logoContainer}
        >
          <img src={logo} alt="Anzen-logo" className={navbarCSS.logo} />
          <span>Anzen</span>
        </NavLink>
        <div className={navbarCSS.navbarOptions}>
          <div className={navbarCSS.startOptions}>
            {isLogin ? (
              <>
                <NavLink to="/profile" className={navbarCSS.profile}>{isLogin?.user?.username[0]?.toUpperCase()}</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <span
                    className={`${navbarCSS.login} ${navbarCSS.authButtons}`}
                  >
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
          {isLogin ? (
            <NavLink to="/profile" className={navbarCSS.profile}>{isLogin?.user?.username[0]?.toUpperCase()}</NavLink>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      {
        <div
          className={`${navbarCSS.menu} ${animationClass}`}
          style={{ display: animationClass === "" && "none" }}
        >
          <span
            onClick={() => {
              setShowMenu(false);
              navigate("/login");
              setAnimationClass("");
            }}
          >
            Login
          </span>
          <span
            onClick={() => {
              setShowMenu(false);
              navigate("/signup");
              setAnimationClass("");
            }}
          >
            Signup
          </span>
        </div>
      }
    </>
  );
};
