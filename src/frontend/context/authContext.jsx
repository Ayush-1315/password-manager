import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

import {
  loginAuth,
  signupAuth,
  verifyTokenService,
} from "../services/authServices";
import { deboundedUserCheck } from "../utils/searchDebounce";
import { useToaster } from "./toasterContext";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setToasterData, toasterData } = useToaster();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("user")) ?? false
  );
  const { token } = isLogin;
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const logUser = async ({ username, password, otp }) => {
    try {
      const response = await loginAuth(username, password, otp);
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
          setToasterData((prev) => ({
            ...prev,
            message: "Invalid OTP",
            status: "warning",
          }));
          break;
        case 401:
          setToasterData((prev) => ({
            ...prev,
            message: "Invalid credentials",
            status: "warning",
          }));
          break;
        case 404:
          setToasterData((prev) => ({
            ...prev,
            message: "User does not exist",
            status: "error",
          }));
          break;
        default:
          if (e.message === "Network Error") {
            setToasterData((prev) => ({
              ...prev,
              message: "Network Error",
              status: "error",
              isNetwork: true,
            }));
          } else {
            setToasterData((prev) => ({
              ...prev,
              message: "Server Error",
              status: "error",
            }));
          }
          break;
      }
    }
  };

  const logoffUser = (expired) => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/");
    if (!toasterData.isNetwork && !expired) {
      setToasterData((prev) => ({
        ...prev,
        message: "Logoff Success",
        status: "success",
      }));
    }
  };

  const signupUser = async ({
    username,
    password,
    email,
    firstName,
    lastName,
  }) => {
    try {
      const response = await signupAuth(
        username,
        password,
        email,
        firstName,
        lastName
      );
      if (response?.status === 201) {
        const userData = response?.data?.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLogin(userData);
        navigate("/home");
        setToasterData((prev) => ({
          ...prev,
          message: "LogIn Success",
          status: "success",
        }));
      } else {
        console.log(response);
        
      }
    } catch (e) {
      console.log(e);
      if (e.status) {
        setToasterData((prev) => ({
          ...prev,
          message: "Error",
          status: "error",
        }));
    }
    else{
      setToasterData((prev) => ({
        ...prev,
        message: "Network Error",
        status: "error",
      }));
    }
    }
  };
  const checkUserAvailability = async (username) => {
    try {
      const res = await deboundedUserCheck(username);
      setUsernameAvailable(res);
    } catch (e) {
      console.log(e);
      if (e.status) {
        setToasterData((prev) => ({
          ...prev,
          message: "Error",
          status: "error",
        }));
    }
    else{
      setToasterData((prev) => ({
        ...prev,
        message: "Network Error",
        status: "error",
      }));
    }
    }
  };

  const verifyToken = async () => {
    try {
      await verifyTokenService(token);
    } catch (e) {
      if (e?.response?.status === 401) {
        setToasterData((prev) => ({
          ...prev,
          message: "Session Timeout",
          status: "warning",
        }));
        logoffUser(true);
      } else {
        setToasterData((prev) => ({
          ...prev,
          message: "Network Error",
          status: "error",
        }));
        logoffUser(true);
      }
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
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
