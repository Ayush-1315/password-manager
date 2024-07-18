import { useEffect, useState } from "react";
import toasterCSS from "./toaster.module.css";
import { useAuth } from "../../context/authContext";
import { useToaster } from "../../context/toasterContext";
export const Toaster = ({ message, status, isNetworkError }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const { logoffUser } = useAuth();
  const { resetToaster } = useToaster();
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
  }, [message, status, isNetworkError]);
  return (
    <div>
      {message && status && showToaster && (
        <div
          className={`${toasterCSS.toaster} ${animationClass} ${`glassCard`} ${
            status === "success"
              ? `${toasterCSS.success}`
              : status === "error"
              ? `${toasterCSS.error}`
              : `${toasterCSS.warning}`
          }`}
        >
          {status === "success" ? (
            <i className={`${`fa-solid`} ${`fa-circle-check`}`}></i>
          ) : status === "error" ? (
            <i className={`${`fa-solid`} ${`fa-circle-xmark`}`}></i>
          ) : (
            <i className={`${`fa-solid`} ${`fa-circle-exclamation`}`}></i>
          )}
          {message}
        </div>
      )}
    </div>
  );
};
