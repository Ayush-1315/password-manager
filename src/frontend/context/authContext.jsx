import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

import { loginAuth, signupAuth } from "../services/authServices";
import { deboundedUserCheck } from "../utils/searchDebounce";
import { useToaster } from "./toasterContext";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setToasterData } = useToaster();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("user")) ?? false
  );
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const logUser = async ({ username, password }) => {
    try {
      const response = await loginAuth(username, password);
      if (response?.status === 200) {
        const userData = response?.data?.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLogin(userData);
        navigate("/home");
        setToasterData((prev) => ({
          ...prev,
          message: "LogIn Success",
          status: "success",
        }));
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
        case 404:
          console.log(`Invalid credentials`);
          break;
        default:
          if (e.message === "Network Error") {
            setToasterData((prev) => ({
              ...prev,
              message: "Network Error",
              status: "Error",
              isNetwork: true,
            }));
          } else {
            console.log("Server Crashed");
          }
          break;
      }
    }
  };

  const logoffUser = () => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/");
    setToasterData((prev) => ({
      ...prev,
      message: "Logoff Success",
      status: "success",
    }));
  };

  const signupUser = async ({
    username,
    password,
    email,
    firstName,
    lastName,
  }) => {
    try {
      const res = await signupAuth(
        username,
        password,
        email,
        firstName,
        lastName
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const checkUserAvailability = async (username) => {
    try {
      const res = await deboundedUserCheck(username);
      setUsernameAvailable(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        logUser,
        isLogin,
        logoffUser,
        signupUser,
        usernameAvailable,
        checkUserAvailability,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
