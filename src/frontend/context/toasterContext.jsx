import { useState, useContext, createContext } from "react";

const ToasterContext = createContext();
export const ToasterProvider = ({ children }) => {
  const initialToaster = { message: "", status: "", isNetwork: false };
  const [toasterData, setToasterData] = useState({...initialToaster});

  const resetToaster=()=>{
    setToasterData({...initialToaster})
  }

  return (
    <ToasterContext.Provider value={{ toasterData, resetToaster,setToasterData }}>
      {children}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => useContext(ToasterContext);
