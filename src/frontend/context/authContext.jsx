import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

import { loginAuth, signupAuth } from "../services/authServices";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("user")) ?? false
  );

  const logUser = async ({ username, password }) => {
    try {
      const response = await loginAuth(username, password);
      if (response?.status === 200) {
        const userData = response?.data?.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLogin(userData);
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      switch (e?.response?.status) {
        case 400:
          console.log(
            "Status: " +
              e?.response?.status +
              "\nMessage:" +
              e?.response?.data?.message
          );
          break;

        default:
          console.log("Server Crashed");
          break;
      }
    }
  };

  const logoffUser = () => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ logUser, isLogin, logoffUser,signupAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
