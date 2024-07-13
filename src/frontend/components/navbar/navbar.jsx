import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.png";
import navbarCSS from "./navbar.module.css";
import { useAuth } from "../../context/authContext";
export const Navbar = () => {
  const {isLogin}=useAuth()
  return (
    <div className={navbarCSS.navbar}>
      <NavLink to="/" className={navbarCSS.logoContainer}>
        <img src={logo} alt="Anzen-logo" className={navbarCSS.logo} />
        <span>Anzen</span>
      </NavLink>
      <div className={navbarCSS.navbarOptions}>
        <div className={navbarCSS.startOptions}>
          {isLogin?<><NavLink to="/profile">Profile</NavLink></>:<>
          <NavLink to="/login">
            <span className={`${navbarCSS.login} ${navbarCSS.authButtons}`}>
              Login
            </span>
          </NavLink>
          <NavLink to="/signup">
            <span className={`${navbarCSS.signup} ${navbarCSS.authButtons}`}>
              <span>Sign Up</span>
            </span>
          </NavLink></>}
        </div>
      </div>
    </div>
  );
};
