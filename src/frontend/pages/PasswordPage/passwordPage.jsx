import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { usePassword } from "../../context/passwordContext";

import { PasswordCard } from "../../components/passwordCard/passwordCard";
import { PasswordForm } from "../../components/passwordForm/passwordForm";

export const PasswordPage = () => {
  const { passwordId, id } = useParams();
  const { passwordState, updatePassword, getPasswordInfo } = usePassword();
  
  const [viewPassword, setViewPassword] = useState("");
  const [password, setPassword] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  useEffect(() => {
    setPassword((prev) => ({
      ...prev,
      ...passwordState.passwords?.find(({ _id }) => _id === passwordId),
    }));
    document.title = "Anzen | Password";
  }, [passwordId, passwordState]);

  const showPassowrdDetails = async (showPassword) => {
    try {
      const data = await getPasswordInfo(id, passwordId, viewPassword);
      if (showPassword) {
        setPassword((prev) => ({ ...prev, ...data }));
      } else if (password.password) {
        setPassword((prev) => ({ ...prev, ...data }));
      } else {
        const { _id, username, platform, description } =data;
        setPassword((prev) => ({
          ...prev,
          _id,
          username,
          platform,
          description,
        }));
      }
      setEditFormData((prev) => ({ ...prev, ...data }));
    } catch (e) {
      console.log(e);
    } finally {
      setViewPassword("");
    }
  };
  const editPassword = async () => {
    await showPassowrdDetails();
    setIsEdit(true);
  };
  const onUpdatePassword = async (data) => {
    const { platform, description, username, password } = data;

    await updatePassword(
      id,
      passwordId,
      username,
      password,
      platform,
      description
    );
    setIsEdit(false);
  };

  return (
    <>
      {isEdit && (
        <PasswordForm
          _id={password._id}
          passwordBody={editFormData}
          closeForm={() => setIsEdit(false)}
          submitData={onUpdatePassword}
        />
      )}
      <Link to="/browse-passwords">Back</Link>
      {password && <PasswordCard {...password} />}
      <input
        type="text"
        onChange={(e) => setViewPassword(e.target.value)}
        value={viewPassword || ""}
      />
      <button onClick={() => showPassowrdDetails(true)}>View</button>
      <button onClick={() => editPassword()}>Edit Password</button>
    </>
  );
};
