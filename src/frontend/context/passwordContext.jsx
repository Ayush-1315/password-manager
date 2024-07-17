import { createContext, useContext, useEffect, useReducer } from "react";

import {
  passwordReducerFunction,
  initialPasswordState,
} from "../reducers/passwordReducer";
import {
  addPasswordService,
  deletePasswordService,
  getPasswordsService,
  updateAccountPasswordService,
  viewPasswordService,
} from "../services/paswordServices";
import { useAuth } from "./authContext";
import { useToaster } from "./toasterContext";
import { debouncedSearchPassword } from "../utils/searchDebounce";
const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordState, passwordDispatch] = useReducer(
    passwordReducerFunction,
    initialPasswordState
  );

  const { setToasterData } = useToaster();
  const { isLogin } = useAuth();
  const { user, token } = isLogin;
  const { page, passwordSearch } = passwordState;
  console.log(passwordState);
  useEffect(() => {
    if (isLogin && passwordSearch==="") {
      (async () => {
        console.log("Load Called")
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
  }, [page, token, user, isLogin,passwordSearch]);
  console.log(passwordSearch)
  useEffect(() => {
    const searchPassword = async (search) => {
      try {
        console.log("search Called")
        passwordDispatch({type:"LOADING",payload:true})
        const response = await debouncedSearchPassword(search, user.id, token);
        if(response?.status===200){
          passwordDispatch({type:"SET_PASSWORDS",payload:response?.data?.data})
          
        }
      } catch (e) {
        console.log(e);
      }
      finally{
        passwordDispatch({type:"LOADTING",payload:false})
      }
    };
    if (passwordSearch.trim().length !== 0) searchPassword(passwordSearch);
  }, [passwordSearch, token, user]);

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
      if (response?.status === 201) {
        setToasterData((prev) => ({
          ...prev,
          message: "Password Saved",
          status: "success",
        }));
        if (passwordState.passwords.length % 12 !== 0) {
          passwordDispatch({
            type: "ADD_PASSWORD",
            payload: response?.data?.data,
          });
        }
      }
    } catch (e) {
      if (e.message === "Network Error") {
        setToasterData((prev) => ({
          ...prev,
          message: "Network Error",
          status: "error",
          isNetwork: true,
        }));
      }
    }
  };

  const updatePassword = async (
    userId,
    passwordId,
    username,
    password,
    platform,
    description
  ) => {
    try {
      const response = await updateAccountPasswordService(
        userId,
        passwordId,
        token,
        platform,
        username,
        password,
        description
      );
      if (response?.status === 201) {
        passwordDispatch({
          type: "UPDATE_PASSWORD",
          payload: response?.data?.data,
        });
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getPasswordInfo = async (userId, passwordId, accountPassword) => {
    try {
      const response = await viewPasswordService(
        userId,
        passwordId,
        token,
        accountPassword
      );
      if (response?.status === 200) {
        return response?.data;
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deletePassword = async (passwordId) => {
    try {
      const response = await deletePasswordService(user.id, passwordId, token);
      if (response.status === 204) {
        setToasterData((prev) => ({
          ...prev,
          message: "Password Deleted",
          status: "success",
        }));
        passwordDispatch({ type: "DELETE_PASSWORD", payload: passwordId });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        passwordState,
        createPassword,
        updatePassword,
        getPasswordInfo,
        deletePassword,
        passwordDispatch,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);
