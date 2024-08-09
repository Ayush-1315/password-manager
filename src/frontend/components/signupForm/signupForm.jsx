import { useState } from "react";

import SignupCSS from "./signupForm.module.css";
import { Link } from "react-router-dom";
export const SignupForm = ({
  checkAvailability,
  isAvailable,
  submitData,
  siginLink,
}) => {
  const initialData = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  const validatorData = {
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    firstName: false,
  };
  const [focus, setFocus] = useState({ ...validatorData, lastName: false });
  const [formData, setFormData] = useState({ ...initialData });
  const [formValidator, setFormValidator] = useState({ ...validatorData });
  const [showNext, setShowNext] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value?.trim() }));
    setFormValidator((prev) => {
      if (type === "username") {
        if (value.length >= 4) {
          checkAvailability(value);
        }
        return { ...prev, [type]: value.trim().length > 4 && isAvailable };
      } else if (type === "password") {
        return { ...prev, [type]: value.trim().length >= 8 };
      } else if (type === "confirmPassword") {
        return {
          ...prev,
          [type]:
            value.trim().length >= 8 &&
            value.trim() === formData.password.trim(),
        };
      } else if (type === "email") {
        return {
          ...prev,
          [type]:
            value.trim().length > 0 &&
            value.includes("@") &&
            value.includes(".com"),
        };
      } else {
        return { ...prev, [type]: value.trim().length > 0 };
      }
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const allVerified = Object.values(formValidator).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    if (allVerified) {
      await submitData(formData);
      e.target.reset();
      setFormData(initialData);
      setFormValidator(validatorData);
      setShowPassword({
        password: false,
        confirmPassword: false,
      });
    } else {
      alert("Fill all fields accordingly");
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formValidator;
    if (username && password && confirmPassword) {
      setShowNext(true);
    } else {
      alert("Fill all the required details");
    }
  };
  return (
    <div className={`${`glassCard`} ${SignupCSS.formContainer}`}>
      <form onSubmit={(e) => submitHandler(e)} className={SignupCSS.form}>
        <h3>Signup</h3>
        {!showNext ? (
          <>
            <div
              className={
                focus.username
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="username"
                className={
                  formData.username !== "" || focus.username
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                Username
              </label>
              <input
                value={formData.username || ""}
                type="text"
                id="username"
                onChange={(e) => changeHandler("username", e.target.value)}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, username: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, username: false }))
                }
                required={true}
              />
            </div>
            <div className={SignupCSS.warning}>
              {!isAvailable && formData.username !== ""
                ? "This username is not available"
                : "‎"}
              <>
                {formData.username.length < 4 &&
                formData.username.length > 0 ? (
                  <span>Atleast 4 letters required</span>
                ) : (
                  "‎"
                )}
              </>
            </div>
            <div
              className={
                focus.password
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="password"
                className={
                  formData.password !== "" || focus.password
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                Password
              </label>
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                value={formData.password || ""}
                onChange={(e) => changeHandler("password", e.target.value)}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, password: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, password: false }))
                }
                required={true}
              />
              {!showPassword.password ? (
                <i
                  className="fa-regular fa-eye"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, password: true }))
                  }
                ></i>
              ) : (
                <i
                  className="fa-regular fa-eye-slash"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: false,
                    }))
                  }
                ></i>
              )}
            </div>
            <div className={SignupCSS.warning}>
              {formData.password.length > 0 && formData.password.length < 8
                ? "Atleast 8 letters required"
                : "‎"}
            </div>
            <div
              className={
                focus.confirmPassword
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="confirmPassword"
                className={
                  formData.confirmPassword !== "" || focus.confirmPassword
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                Confirm Password
              </label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={(e) =>
                  changeHandler("confirmPassword", e.target.value)
                }
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, confirmPassword: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, confirmPassword: false }))
                }
                required={true}
              />
              {!showPassword.confirmPassword ? (
                <i
                  className="fa-regular fa-eye"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmPassword: true,
                    }))
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
            <div className={SignupCSS.warning}>
              {formData.confirmPassword.length > 0 &&
              formData.confirmPassword !== formData.password
                ? "Password does not match"
                : "‎"}
            </div>
            <button onClick={(e) => handleNext(e)}>Next</button>
            <Link to={siginLink}>Already have an account?</Link>
          </>
        ) : (
          <>
            <div
              className={
                focus.firstName
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="firstName"
                className={
                  formData.firstName !== "" || focus.firstName
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName || ""}
                id="firstName"
                onChange={(e) => changeHandler("firstName", e.target.value)}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, firstName: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, firstName: false }))
                }
                required={true}
              />
            </div>
            <div className={SignupCSS.warning}>
              {formData.firstName.length < 4 && formData.firstName.length > 0
                ? "Atleast 4 letters required"
                : "‎"}
            </div>
            <div
              className={
                focus.lastName
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="lastName"
                className={
                  formData.lastName !== "" || focus.lastName
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName || ""}
                onChange={(e) => changeHandler("lastName", e.target.value)}
                onFocus={() =>
                  setFocus((prev) => ({ ...prev, lastName: true }))
                }
                onBlur={() =>
                  setFocus((prev) => ({ ...prev, lastName: false }))
                }
              />
            </div>
            <div className={SignupCSS.warning}>
                ‎
            </div>
            <div
              className={
                focus.email
                  ? `${SignupCSS.inputHolder} ${SignupCSS.focus}`
                  : `${SignupCSS.inputHolder}`
              }
            >
              <label
                htmlFor="email"
                className={
                  formData.email !== "" || focus.email
                    ? `${SignupCSS.filled} ${SignupCSS.signupLabels}`
                    : SignupCSS.signupLabels
                }
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => changeHandler("email", e.target.value)}
                onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
                onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
                value={formData.email || ""}
                required={true}
              />
            </div>
            <div className={SignupCSS.warning}>
              {formData.email.length > 0 ? (
                <>
                  {formData.email.includes("@") &&
                  formData.email.includes(".com")
                    ? "‎"
                    : "Enter a valid email"}
                </>
              ) : (
                "‎"
              )}
            </div>
            <div className={SignupCSS.buttonContainer}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowNext(false);
                }}
                className={SignupCSS.back}
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back</span>
              </button>
              <button>Signup</button>
            </div>
            <Link to={siginLink}>Already have an account?</Link>
          </>
        )}
      </form>
    </div>
  );
};
