import { useState } from "react";

import passwordFormCSS from "./passwordForm.module.css";
export const PasswordForm = ({ id, passwordBody, submitData, closeForm }) => {
  const initialData = {
    id: null,
    username: "",
    password: "",
    platform: "",
    description: "",
  };

  const initialFormValidator = {
    username: false,
    password: false,
    platform: false,
  };

  const [formData, setFormData] = useState(
    id ? { ...passwordBody } : { ...initialData }
  );
  const [formValidator, setFormValidator] = useState({
    ...initialFormValidator,
  });
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    platform: false,
    description: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocus, setPasswordFoucs] = useState(false);
  const changeHandler = (type, value) => {
    if (type !== "description") {
      setFormData((prev) => ({ ...prev, [type]: value?.trim() }));
      setFormValidator((prev) => ({
        ...prev,
        [type]: value?.trim().length > 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [type]: value?.trim() }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = Object.values(formValidator).reduce(
      (acc, curr) => (curr ? acc : false),
      true
    );
    if (isValid) {
      await submitData(formData);
      e.target.reset();
      setFormData({ ...initialData });
      setFormValidator({ ...initialFormValidator });
    } else {
      alert("Fill details correctly");
    }
  };
  return (
    <div className={passwordFormCSS.mainContainer} onClick={()=>closeForm()}>
      <div
        className={`${`glassCard`} ${passwordFormCSS.formContainer}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{id ? "Manage Password" : "Create new Password"}</h2>
        <form
          onSubmit={(e) => submitHandler(e)}
          className={passwordFormCSS.form}
        >
          <span className={passwordFormCSS.idContainer}>
            {id ? <i>ID</i> : "‎ "}
          </span>
          <div className={passwordFormCSS.fieldContainer}>
            <label
              htmlFor="username"
              className={
                formData.username !== "" || focus.username
                  ? `${passwordFormCSS.filled} ${passwordFormCSS.loginLabels}`
                  : passwordFormCSS.loginLabels
              }
            >
              Username
            </label>
            <input
              type="text"
              defaultValue={formData?.username}
              onChange={(e) => changeHandler("username", e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, username: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, username: false }))}
            />
          </div>
          <div
            className={
              passwordFocus
                ? `${passwordFormCSS.passwordContainer} ${passwordFormCSS.focus}`
                : `${passwordFormCSS.passwordContainer}`
            }
          >
            <label
              htmlFor="password"
              className={
                formData.password !== "" || focus.password
                  ? `${passwordFormCSS.filled} ${passwordFormCSS.loginLabels}`
                  : passwordFormCSS.loginLabels
              }
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={passwordFormCSS.passwordField}
              defaultValue={formData?.password}
              onChange={(e) => changeHandler("password", e.target.value)}
              onFocus={() => {
                setPasswordFoucs(true);
                setFocus((prev) => ({ ...prev, password: true }));
              }}
              onBlur={() => {
                setPasswordFoucs(false);
                setFocus((prev) => ({ ...prev, password: false }));
              }}
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
          <div className={passwordFormCSS.fieldContainer}>
            <label
              htmlFor="platform"
              className={
                formData.platform !== "" || focus.platform
                  ? `${passwordFormCSS.filled} ${passwordFormCSS.loginLabels}`
                  : passwordFormCSS.loginLabels
              }
            >
              Platform
            </label>
            <input
              type="text"
              defaultValue={formData?.platform}
              onChange={(e) => changeHandler("platform", e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, platform: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, platform: false }))}
            />
          </div>
          <div className={passwordFormCSS.fieldContainer}>
            <label
              htmlFor="description"
              className={
                formData.description !== "" || focus.description
                  ? `${passwordFormCSS.filled} ${passwordFormCSS.loginLabels}`
                  : passwordFormCSS.loginLabels
              }
            >
              Description
            </label>
            <textarea
              defaultValue={formData?.description}
              onChange={(e) => changeHandler("description", e.target.value)}
              onFocus={() =>
                setFocus((prev) => ({ ...prev, description: true }))
              }
              onBlur={() =>
                setFocus((prev) => ({ ...prev, description: false }))
              }
            />
          </div>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};