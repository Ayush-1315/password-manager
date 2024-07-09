import { Link } from "react-router-dom";

import logo from "../../../assets/logo.ico";
import navbarCSS from "./navbar.module.css";
export const Navbar = () => {
  return (
    <div className={navbarCSS.navbar}>
      <Link to="/">
        <img src={logo} alt="Anzen-logo" className={navbarCSS.logo} />
      </Link>
      <div className={navbarCSS.navbarOptions}>
        <span className={navbarCSS.features}>Features</span>
        <div className={navbarCSS.startOptions}>
          <Link to="/login">
          <span className={`${navbarCSS.login} ${navbarCSS.authButtons}`}>
            Login
          </span>
          </Link>
          <Link to="/signup">
          <span className={`${navbarCSS.signup} ${navbarCSS.authButtons}`}>
            <span>Signup</span>
            <i className={`${"fa-solid fa-right-to-bracket"}`}></i>
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
