import { useEffect, useState } from "react";
import { PasswordForm } from "../../components/passwordForm/passwordForm";
import { usePassword } from "../../context/passwordContext";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const { createPassword } = usePassword();
  useEffect(() => {
    document.title = "Anzen | Home";
  }, []);
  const addPassword = async (data) => {
    const { username, password, platform, description } = data;
    await createPassword(platform, username, password, description);
  };
  return (
    <>
      <span onClick={() => setShowForm(true)}>
        <i className="fa-solid fa-user-plus"></i>
      </span>
      <Link to="/browse-passwords">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Link>
      {showForm && (
        <PasswordForm
          submitData={async(data) => {
            await addPassword(data);
            setShowForm(false);
          }}
          closeForm={() => setShowForm(false)}
        />
      )}
    </>
  );
};
