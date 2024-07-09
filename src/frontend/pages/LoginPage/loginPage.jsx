import { useEffect } from "react";

import { Login } from "../../components/loginForm/loginForm";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
export const LoginPage = () => {
  const { logUser,isLogin} = useAuth();
  const navigate=useNavigate();
  useEffect(() => {
    isLogin && navigate("/home")
    document.title = "Anzen | Login";
  }, [isLogin,navigate]);

  return (
    <>
      <div>
        <Login onSubmit={(data)=>logUser(data)}/>
      </div>
    </>
  );
};
