import { useEffect, useState } from "react";
import { ForgotPasswordOTP } from "../../components/forgotOTPForm/forgotOTP";
import { ResetPassword } from "../../components/resetPassword/resetPassword";
import {
  resetPasswordService,
  sendForgotOTP,
} from "../../services/userServices";
import { useToaster } from "../../context/toasterContext";

export const ForgotPasswordPage = () => {
  const { setToasterData } = useToaster();
  const [user, setUser] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => {
    document.title = "Reset Password | Anzen";
  }, []);
  const forgotPasswordOTP = async (user) => {
    try {
      const response = await sendForgotOTP(user);
      if (response.status === 200) {
        setUser(response?.data?.username);
        setShowResetPassword(true);
        setToasterData({ message: "OTP sent", status: "success" });
      } else {
        console.log(response);
      }
    } catch (e) {
      switch(e.response.status){
        case 404: setToasterData({message:"User not found",status:"error"});
        break;
        default: setToasterData({message:"Network Error",status:"error"})
        break;
      }
    }
  };
  const resetPassword = async (otp, newPassword) => {
    try {
      const response = await resetPasswordService(user, otp, newPassword);
      if (response?.status === 204) {
        setConfirmReset(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {!confirmReset ? (
        <>
          {showResetPassword ? (
            <ResetPassword
              onSubmit={(otp, newPassword) => {
                resetPassword(otp, newPassword);
              }}
              onTimeout={() => {
                setToasterData((prev) => ({
                  ...prev,
                  message: "Timeout",
                  status: "warning",
                }));
                setShowResetPassword(false);
              }}
            />
          ) : (
            <ForgotPasswordOTP onSubmit={(data) => forgotPasswordOTP(data)} />
          )}
        </>
      ) : (
        <div>Password {user} reset success</div>
      )}
    </>
  );
};
