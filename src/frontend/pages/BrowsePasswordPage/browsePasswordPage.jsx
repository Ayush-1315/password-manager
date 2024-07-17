import { useEffect } from "react";

import { useAuth } from "../../context/authContext";
import { usePassword } from "../../context/passwordContext";
import { PasswordHolder } from "../../components/password/password";
import BrowsePasswordCSS from "./browsePasswords.module.css";

export const BrowsePasswordPage = () => {
  const { isLogin } = useAuth();
  const { passwordState, deletePassword, passwordDispatch } = usePassword();

  useEffect(() => {
    document.title = `${isLogin?.user?.username} | Passwords`;
  }, [isLogin]);

  const handleDelete = async (id) => {
    await deletePassword(id);
  };
  const changeHandler = (value) => {
    passwordDispatch({ type: "SEARCH_PASSWORD", payload: value });
  };
  return (
    <>
    <input
            type="text"
            placeholder="search accounts"
            onChange={(e) => {
              changeHandler(e.target.value);
            }}
            value={passwordState?.passwordSearch || ""}
          />
      <div>
        {passwordState?.passwordLoading ? (
        "Loading"
      ) : (
        <>
          
          <div className={BrowsePasswordCSS.page}>
            {passwordState.passwords.length > 0
              ? passwordState.passwords.map((password) => (
                  <PasswordHolder
                    key={password._id}
                    {...password}
                    userId={isLogin?.user?.id}
                    onDelete={() => handleDelete(password._id)}
                  />
                ))
              : passwordState?.passwordSearch === ""
              ? "Get started by creating some passwords..."
              : "Nothing matched your search"}
          </div>
        </>
      )}
      </div>
    </>
  );
};
