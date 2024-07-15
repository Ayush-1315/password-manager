import { useState } from "react";
import { PasswordForm } from "../../components/passwordForm/passwordForm";
import { usePassword } from "../../context/passwordContext";

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const { createPassword } = usePassword();
  const addPassword = async (data) => {
    const { username, password, platform, description } = data;
    await createPassword(platform, username, password, description);
  };
  return (
    <>
    <span onClick={()=>setShowForm(true)}><i className="fa-solid fa-user-plus"></i></span>
      {showForm && (
        <PasswordForm
          submitData={(data) => addPassword(data)}
          closeForm={() => setShowForm(false)}
        />
      )}
    </>
  );
};
