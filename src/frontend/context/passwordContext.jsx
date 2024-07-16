import { createContext, useContext, useEffect, useReducer } from "react";

import {
  passwordReducerFunction,
  initialPasswordState,
} from "../reducers/passwordReducer";
import {
  addPasswordService,
  getPasswordsService,
  updateAccountPasswordService,
  viewPasswordService,
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
      if(response?.status===201){
        setToasterData(prev=>({
            ...prev,
            message:"Password Saved",
            status:"success"
        }))
        if(passwordState.passwords.length%10!==0){
          passwordDispatch({type:"ADD_PASSWORD",payload:response?.data?.data})
        }
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

  const updatePassword=async(userId,passwordId,username,password,platform,description)=>{
    try{
      const response=await updateAccountPasswordService(userId,passwordId,isLogin?.token,platform,username,password,description);
      if(response?.status===201){
        passwordDispatch({type:"UPDATE_PASSWORD",payload:response?.data?.data})
      }
      else{
        console.log(response)
      }
    }catch(e){
      console.log(e);
    }
  }
  const getPasswordInfo=async(userId,passwordId,accountPassword)=>{
    try{
      const response=await viewPasswordService(userId,passwordId,isLogin?.token,accountPassword);
      if(response?.status===200){
        return response?.data;
      }
      else{
        console.log(response)
      }
    }catch(e){
      console.log(e)
    }
  }
  return (
    <PasswordContext.Provider value={{ passwordState, createPassword,updatePassword,getPasswordInfo }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);
