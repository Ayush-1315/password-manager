import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
