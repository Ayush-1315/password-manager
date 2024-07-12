import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.ico";
import navbarCSS from "./navbar.module.css";
import { useAuth } from "../../context/authContext";
export const Navbar = () => {
  const {isLogin}=useAuth()
  return (
    <div className={navbarCSS.navbar}>
      <NavLink to="/">
        <img src={logo} alt="Anzen-logo" className={navbarCSS.logo} />
      </NavLink>
      <div className={navbarCSS.navbarOptions}>
        <span className={navbarCSS.features}>Features</span>
        <div className={navbarCSS.startOptions}>
          {isLogin?<><NavLink to="/profile">Profile</NavLink></>:<>
          <NavLink to="/login">
            <span className={`${navbarCSS.login} ${navbarCSS.authButtons}`}>
              Login
            </span>
          </NavLink>
          <NavLink to="/signup">
            <span className={`${navbarCSS.signup} ${navbarCSS.authButtons}`}>
              <span>Signup</span>
              <i className={`${"fa-solid fa-right-to-bracket"}`}></i>
            </span>
          </NavLink></>}
        </div>
      </div>
    </div>
  );
};
