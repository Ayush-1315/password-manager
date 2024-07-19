import { useEffect, useRef, useState } from "react";

import ResetPasswordCSS from "./resetPassword.module.css";
export const ResetPassword = ({ onSubmit, onTimeout }) => {
  const isMounted = useRef(false);
  const timerIdRef = useRef(null);
  const [timer, setTimer] = useState(299);
  useEffect(() => {
    const startTimer = () => {
      isMounted.current = true;
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
      timerIdRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(timerIdRef.current);
            setFormData({
              otp: "",
              newPassword: "",
              confirmPassword: "",
            });
            setFocus(() => ({
              confirmPassword: false,
              newPassword: false,
              otp: false,
            }));
            setPasswordFoucs({
              newPassword: false,
              confirmPassword: false,
            });
            setShowPassword({
              newPassword: false,
              confirmPassword: false,
            });
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    };
    startTimer();
    return () => {
      isMounted.current = false;
      clearInterval(timerIdRef.current);
    };

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (timer === 0) onTimeout();
    // eslint-disable-next-line
  }, [timer]);

  const initialForm = {
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState({ ...initialForm });
  const [formValidation, setFormValidation] = useState({
    confirmPassword: false,
    newPassword: false,
    otp: false,
  });
  const [passwordFocus, setPasswordFoucs] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [focus, setFocus] = useState({
    confirmPassword: false,
    newPassword: false,
    otp: false,
  });
  const resetStateVariables = () => {
    setFormData({ ...initialForm });
    setFocus(() => ({
      confirmPassword: false,
      newPassword: false,
      otp: false,
    }));
    setPasswordFoucs({
      newPassword: false,
      confirmPassword: false,
      otp: false,
    });
    setShowPassword({
      newPassword: false,
      confirmPassword: false,
    });
  };
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    if (type === "confirmPassword") {
      setFormValidation((prev) => ({
        ...prev,
        [type]: value === formData.newPassword,
      }));
    } else if (type === "newPassword") {
      setFormValidation((prev) => ({ ...prev, [type]: value.length >= 8 }));
    } else {
      setFormValidation((prev) => ({ ...prev, [type]: value.length === 6 }));
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const isValid = Object.values(formValidation).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    if (isValid) {
      const { otp, newPassword } = formData;
      await onSubmit(otp, newPassword);
      e.target.reset();
      resetStateVariables();
    } else {
      alert("Provide valid credentials");
    }
  };
  return (
    <div className={`${`glassCard`} ${ResetPasswordCSS.card}`}>
      <form onSubmit={submitHandler}>
        <h3>Reset Password</h3>
        <div
          className={
            focus?.otp
              ? `${ResetPasswordCSS.resetContainer} ${ResetPasswordCSS.focus}`
              : `${ResetPasswordCSS.resetContainer}`
          }
        >
          <label
            htmlFor="OTP"
            className={
              formData.otp !== "" || focus.otp
                ? `${ResetPasswordCSS.filled} ${ResetPasswordCSS.resetOTPLabels}`
                : ResetPasswordCSS.resetOTPLabels
            }
          >
            OTP
          </label>
          <input
            type="text"
            name="OTP"
            id="OTP"
            onChange={(e) => changeHandler("otp", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, otp: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, otp: false }))}
            value={formData?.otp || ""}
          />
        </div>
        <div className={ResetPasswordCSS.warning}>
          {formData?.otp.length > 0 && formData.otp.length < 6 ? (
            <span>OTP should be of 6 digits</span>
          ) : (
            "‎ "
          )}
        </div>
        <div
          className={
            passwordFocus?.newPassword
              ? `${ResetPasswordCSS.resetContainer} ${ResetPasswordCSS.focus}`
              : `${ResetPasswordCSS.resetContainer}`
          }
        >
          <label
            htmlFor="newPassword"
            className={
              formData.newPassword !== "" || focus.newPassword
                ? `${ResetPasswordCSS.filled} ${ResetPasswordCSS.resetOTPLabels}`
                : ResetPasswordCSS.resetOTPLabels
            }
          >
            New Password
          </label>
          <input
            type={showPassword?.newPassword ? "text" : "password"}
            id="newPassword"
            onChange={(e) => changeHandler("newPassword", e.target.value)}
            onFocus={() => {
              setFocus((prev) => ({ ...prev, newPassword: true }));
              setPasswordFoucs((prev) => ({ ...prev, newPassword: true }));
            }}
            onBlur={() => {
              setFocus((prev) => ({ ...prev, newPassword: false }));
              setPasswordFoucs((prev) => ({ ...prev, newPassword: false }));
            }}
            value={formData?.newPassword || ""}
          />
          {!showPassword.newPassword ? (
            <i
              className="fa-regular fa-eye"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, newPassword: true }))
              }
            ></i>
          ) : (
            <i
              className="fa-regular fa-eye-slash"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  newPassword: false,
                }))
              }
            ></i>
          )}
        </div>
        <div className={ResetPasswordCSS.warning}>
          {formData?.newPassword.length < 8 &&
          formData?.newPassword.length > 0 ? (
            <span>Password should be of atleast 8 characters</span>
          ) : (
            "‎ "
          )}
        </div>
        <div
          className={
            focus?.confirmPassword
              ? `${ResetPasswordCSS.resetContainer} ${ResetPasswordCSS.focus}`
              : `${ResetPasswordCSS.resetContainer}`
          }
        >
          <label
            htmlFor="newPassword"
            className={
              formData.confirmPassword !== "" || focus.confirmPassword
                ? `${ResetPasswordCSS.filled} ${ResetPasswordCSS.resetOTPLabels}`
                : ResetPasswordCSS.resetOTPLabels
            }
          >
            Confirm Password
          </label>
          <input
            type={showPassword?.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            onChange={(e) => changeHandler("confirmPassword", e.target.value)}
            onFocus={() =>
              setFocus((prev) => ({ ...prev, confirmPassword: true }))
            }
            onBlur={() =>
              setFocus((prev) => ({ ...prev, confirmPassword: false }))
            }
            value={formData?.confirmPassword || ""}
          />
          {!showPassword.confirmPassword ? (
            <i
              className="fa-regular fa-eye"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, confirmPassword: true }))
              }
            ></i>
          ) : (
            <i
              className="fa-regular fa-eye-slash"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: false,
                }))
              }
            ></i>
          )}
        </div>
        <div className={ResetPasswordCSS.warning}>
          {formData?.confirmPassword.length > 0 &&
          formData?.confirmPassword !== formData?.newPassword ? (
            <span>Password does not match</span>
          ) : (
            "‎ "
          )}
        </div>
        <span className={ResetPasswordCSS.timer}>{`${Math.floor(timer / 60)}:${
          Math.floor((timer % 60) / 10) === 0 ? `0${timer % 60}` : timer % 60
        }`}</span>
        <button>Submit</button>
      </form>
    </div>
  );
};
