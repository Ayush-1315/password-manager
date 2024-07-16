import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { usePassword } from "../../context/passwordContext";
import { PasswordHolder } from "../../components/password/password";

export const BrowsePasswordPage = () => {

  const { isLogin } = useAuth();
  const { passwordState } = usePassword();
  useEffect(() => {
    document.title = `${isLogin?.user?.username} | Passwords`;
  }, [isLogin]);
  console.log(passwordState);


  return (
    <>
      {passwordState?.passwordLoading
        ? "Loading"
        : passwordState.passwords.map((password) => (
            <PasswordHolder
              key={password._id}
              {...password}
              userId={isLogin?.user?.id}
            />
          ))}
    </>
  );
};
