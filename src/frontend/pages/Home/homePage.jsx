import { useEffect, useState } from "react";
import { PasswordForm } from "../../components/passwordForm/passwordForm";
import { usePassword } from "../../context/passwordContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import homeCSS from "./homePage.module.css"
export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const { createPassword } = usePassword();
  const { verifyToken } = useAuth();
  useEffect(() => {
    verifyToken();
    document.title = "Anzen | Home";
    // eslint-disable-next-line
  }, []);
  const addPassword = async (data) => {
    const { username, password, platform, description,website} = data;
    await createPassword(platform, username, password, description,website);
  };
  return (
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
  );
};
