import { useEffect, useState } from "react";
import toasterCSS from "./toaster.module.css";
import { useAuth } from "../../context/authContext";
import { useToaster } from "../../context/toasterContext";
export const Toaster = ({ message, status,isNetworkError }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const {logoffUser}=useAuth();
  const {resetToaster}=useToaster()
  useEffect(() => {
    if (message?.trim() && status?.trim()) {
      setShowToaster(true);
      setAnimationClass(toasterCSS.dropDown);
      const timer = setTimeout(() => {
        setAnimationClass(toasterCSS.waveOut);
        if(isNetworkError){
            logoffUser();
          }
          resetToaster();
      }, 3000);
      return () => clearTimeout(timer);
    }
// eslint-disable-next-line
  }, [message, status,isNetworkError]);
  console.log(message, status);
  return (
    <>
      {message && status && showToaster && (
        <div className={`${toasterCSS.toaster} ${animationClass}`}>
          {message}
        </div>
      )}
    </>
  );
};
