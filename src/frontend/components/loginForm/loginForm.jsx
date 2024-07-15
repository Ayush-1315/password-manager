import { useState } from "react";

import loginFormCSS from "./loginForm.module.css";
import { Link } from "react-router-dom";
export const Login = ({ onSubmit, signupLink, forgotLink }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    username: false,
    password: false,
  });
  const [passwordFocus, setPasswordFoucs] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState({
    username: false,
    password: false,
  });
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setFormValidation((prev) =>
      type !== "password"
        ? { ...prev, [type]: value.trim() !== "" }
        : { ...prev, [type]: value.trim() !== "" && value.trim().length >= 8 }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formValidation).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    const resetStateVariables = () => {
      setFormData(() => ({
        username: "",
        password: "",
      }));
      setIsLoading(false);
      setFocus(() => ({ username: false, password: false }));
      setPasswordFoucs(false);
      setShowPassword(false);
    };
    if (isFormValid) {
      setIsLoading(true);
      await onSubmit(formData);
      resetStateVariables();
      e.target.reset();
    } else {
      alert("Please enter valid credentials.");
    }
  };
  return (
    <div className={`${`glassCard`} ${loginFormCSS.loginForm}`}>
      <h2>Login</h2>
      <form onSubmit={(e) => submitHandler(e)}>
        <label
          htmlFor="username"
          className={
            formData.username !== "" || focus.username
              ? `${loginFormCSS.filled} ${loginFormCSS.loginLabels}`
              : loginFormCSS.loginLabels
          }
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          onChange={(e) => changeHandler("username", e.target.value)}
          onFocus={() => setFocus((prev) => ({ ...prev, username: true }))}
          onBlur={() => setFocus((prev) => ({ ...prev, username: false }))}
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
          formData?.password.trim().length < 8 ? (
            'Password must be 8 characters long'
          ):"‎ "}
       </div>
        <button disabled={isLoading}>Login</button>
        <Link to={forgotLink}>Forgot Password ?</Link>
        <Link to={signupLink}>Create Account</Link>
      </form>
    </div>
  );
};
