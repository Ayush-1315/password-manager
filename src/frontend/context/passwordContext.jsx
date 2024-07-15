import { createContext, useContext, useEffect, useReducer } from "react";

import {
  passwordReducerFunction,
  initialPasswordState,
} from "../reducers/passwordReducer";
import {
  addPasswordService,
  getPasswordsService,
} from "../services/paswordServices";
import { useAuth } from "./authContext";
import { useToaster } from "./toasterContext";
const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordState, passwordDispatch] = useReducer(
    passwordReducerFunction,
    initialPasswordState
  );

const {setToasterData}=useToaster();
  const { isLogin } = useAuth();
  const { user, token } = isLogin;
  const { page } = passwordState;
  console.log(passwordState);
  useEffect(() => {
    if (isLogin) {
      (async () => {
        passwordDispatch({ type: "LOADING", payload: true });
        try {
          const response = await getPasswordsService(page, token, user?.id);
          passwordDispatch({ type: "LOADING", payload: false });
          if (response?.status === 200) {
            passwordDispatch({
              type: "SET_PASSWORDS",
              payload: response?.data?.data,
            });
          }
        } catch (e) {
          passwordDispatch({ type: "LOADING", payload: false });
          console.log(e);
        } finally {
          passwordDispatch({ type: "LOADING", payload: false });
        }
      })();
    }
  }, [page, token, user,isLogin]);

  const createPassword = async (platform, username, password, description) => {
    try {
      const response = await addPasswordService(
        user?.id,
        platform,
        username,
        password,
        description,
        token
      );
      if(response?.status===204){
        setToasterData(prev=>({
            ...prev,
            message:"Password Saved",
            status:"success"
        }))
      }
    } catch (e) {
      if(e.message==="Network Error"){
        setToasterData(prev=>({
            ...prev,
            message:"Network Error",
            status:"error",
            isNetwork:true
        }))
      }
    }
  };
  return (
    <PasswordContext.Provider value={{ passwordState, createPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);
