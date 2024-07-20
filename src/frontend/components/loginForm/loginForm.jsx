import { useState, useRef, useEffect } from "react";

import loginFormCSS from "./loginForm.module.css";
import { Link } from "react-router-dom";
export const Login = ({
  onSubmit,
  signupLink,
  forgotLink,
  onNext,
  onTimeout,
}) => {
  const timerIdRef = useRef(null);
  const [timer, setTimer] = useState(299);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    otp: "",
  });
  const [showNext, setShowNext] = useState(false);
  const [formValidation, setFormValidation] = useState({
    username: false,
    password: false,
    otp: false,
  });
  const [passwordFocus, setPasswordFoucs] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    otp: false,
  });
  useEffect(() => {
    if (timer===0) {
      onTimeout();
    }
    // eslint-disable-next-line
  }, [timer]);
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setFormValidation((prev) =>
      type !== "password"
        ? { ...prev, [type]: value.trim() !== "" }
        : { ...prev, [type]: value.trim() !== "" && value.trim().length >= 8 }
    );
  };
  const resetStateVariables = () => {
    setFormData(() => ({
      username: "",
      password: "",
      otp: "",
    }));
    setIsLoading(false);
    setFocus(() => ({ username: false, password: false, otp: false }));
    setPasswordFoucs(false);
    setShowPassword(false);
    setShowNext(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formValidation).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    if (isFormValid) {
      setIsLoading(true);
      await onSubmit(formData);
      resetStateVariables();
      e.target.reset();
    } else {
      alert("Please enter valid credentials.");
    }
  };
  const nextAndTimer = () => {
    setShowNext(true);
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    timerIdRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(timerIdRef.current);
          resetStateVariables();
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };
  const handleNext = async (e) => {
    e.preventDefault();
    if (formValidation.username && formValidation.password) {
      await onNext(formData.username, formData.password, () => nextAndTimer());
    } else {
      alert(`Provide valid Credentials`);
    }
  };
  return (
    <div className={`${`glassCard`} ${loginFormCSS.loginForm}`}>
      <>
        <h2>Login</h2>
        <form onSubmit={(e) => submitHandler(e)}>
          {!showNext ? (
            <>
              <label
                htmlFor="username"
                className={
                  formData.username !== "" || focus.username
                    ? `${loginFormCSS.filled} ${loginFormCSS.loginLabels}`
                    : loginFormCSS.loginLabels
                }
              >
                Username or Email
              </label>
              <input
                type="text"
                name="username"
                onChange={(e) => changeHandler("username", e.target.value)}
                value={formData.username || ""}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, username: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, username: false }))
                }
                className={loginFormCSS.username}
                required={true}
              />
              <div
                className={
                  passwordFocus
                    ? `${loginFormCSS.passwordContainer} ${loginFormCSS.focus}`
                    : `${loginFormCSS.passwordContainer}`
                }
              >
                <label
                  htmlFor="password"
                  className={
                    formData.password !== "" || focus.password
                      ? `${loginFormCSS.filled} ${loginFormCSS.loginLabels}`
                      : loginFormCSS.loginLabels
                  }
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password || ""}
                  onFocus={() => {
                    setPasswordFoucs(true);
                    setFocus((prev) => ({ ...prev, password: true }));
                  }}
                  onBlur={() => {
                    setPasswordFoucs(false);
                    setFocus((prev) => ({ ...prev, password: false }));
                  }}
                  required={true}
                  onChange={(e) => changeHandler("password", e.target.value)}
                />
                {!showPassword ? (
                  <i
                    className="fa-regular fa-eye"
                    onClick={() => setShowPassword(true)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-eye-slash"
                    onClick={() => setShowPassword(false)}
                  ></i>
                )}
              </div>
              <div>
                {formData?.password.trim().length > 0 &&
                formData?.password.trim().length < 8
                  ? "Password must be 8 characters long"
                  : "‎ "}
              </div>
              <button disabled={isLoading} onClick={(e) => handleNext(e)}>
                Send OTP
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor="OTP"
                className={
                  formData.otp !== "" || focus.otp
                    ? `${loginFormCSS.filled} ${loginFormCSS.loginLabels}`
                    : loginFormCSS.loginLabels
                }
              >
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                id="OTP"
                className={loginFormCSS.otp}
                onChange={(e) => changeHandler("otp", e.target.value)}
                onFocus={() => {
                  setFocus((prev) => ({ ...prev, otp: true }));
                }}
                onBlur={() => {
                  setFocus((prev) => ({ ...prev, otp: false }));
                }}
                value={formData.otp || ""}
              />
              <span className={loginFormCSS.timer}>{`${Math.floor(
                timer / 60
              )}:${
                Math.floor((timer % 60) / 10) === 0
                  ? `0${timer % 60}`
                  : timer % 60
              }`}</span>
              <button>Login</button>
            </>
          )}
          <Link to={forgotLink}>Forgot Password ?</Link>
          <Link to={signupLink}>Create Account</Link>
        </form>
      </>
    </div>
  );
};
