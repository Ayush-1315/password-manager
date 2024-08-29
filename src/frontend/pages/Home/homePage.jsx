import { useEffect, useState } from "react";
import { PasswordForm } from "../../components/passwordForm/passwordForm";
import { usePassword } from "../../context/passwordContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import homeCSS from "./homePage.module.css";
import { userDashboardService } from "../../services/paswordServices";
import MobileLoader from "../../components/mobileLoader/mobileLoader";
export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [dashboard, setDashBoard] = useState({
    totalPassword: false,
    favourites: false,
  });
  const { createPassword } = usePassword();
  const { verifyToken, isLogin } = useAuth();
  useEffect(() => {
    verifyToken();
    (async () => {
      try {
        const response = await userDashboardService(
          isLogin?.user.id,
          isLogin?.token
        );
        if (response?.status === 200) {
          setDashBoard((prev) => ({ ...prev, ...response?.data.data }));
        } else {
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    document.title = "Anzen | Home";
    // eslint-disable-next-line
  }, [isLogin]);
  const addPassword = async (data) => {
    const { username, password, platform, description, website } = data;
    await createPassword(platform, username, password, description, website);
  };
  return (
    <>
      <div className={homeCSS.dashboard}>
        <div className={homeCSS.dashboardCard}>
        {dashboard.totalPassword ? (
            <span>{dashboard?.totalPassword}</span>
          ) : (
            <MobileLoader displayProp={"flex"} />
          )}
          <span>Total Saved Passwords</span>
        </div>
        <div className={homeCSS.dashboardCard}>
        {dashboard.totalPassword ? (
            <span>{dashboard?.favourites}</span>
          ) : (
            <MobileLoader displayProp={"flex"} />
          )}
          <span>Favourites</span>
        </div>
      </div>
      <div className={homeCSS.container}>
        <span onClick={() => setShowForm(true)} className={homeCSS.actionCard}>
          <i className="fa-solid fa-user-plus"></i>
          <span>Create Password</span>
        </span>
        <Link to="/browse-passwords" className={homeCSS.actionCard}>
          <i className="fa-solid fa-binoculars"></i>
          <span>Browse Passwords</span>
        </Link>
        <Link to="/favourites" className={homeCSS.actionCard}>
          <i className="fa-solid fa-star"></i>
          <span>Browse Favourites</span>
        </Link>
        {showForm && (
          <PasswordForm
            submitData={async (data) => {
              await addPassword(data);
              setShowForm(false);
            }}
            closeForm={() => setShowForm(false)}
          />
        )}
      </div>
    </>
  );
};
