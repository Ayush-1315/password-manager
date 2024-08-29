import { useState } from "react";

import passwordFormCSS from "./passwordForm.module.css";
export const PasswordForm = ({ _id, passwordBody, submitData, closeForm }) => {
  const initialData = {
    _id: null,
    username: "",
    password: "",
    platform: "",
    website: "",
    description: "",
  };

  const initialFormValidator = {
    username: false,
    password: false,
    platform: false,
  };
  
  const [formData, setFormData] = useState(
    _id ? { ...passwordBody } : { ...initialData }
  );
  const [formValidator, setFormValidator] = useState(
    _id
    ? { username: passwordBody.username.length > 0,
      password: passwordBody.password.length>0,
      platform :passwordBody.platform.length>0,
    }
    : {
          ...initialFormValidator,
        }
  );
  const [focus, setFocus] = useState({
    username: false,
    password: false,
    platform: false,
    description: false,
    website: false,
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
    let isValid;
    if (_id) {
      isValid = Object.entries(formData).reduce((acc, curr) => {
        if (curr[0] !== "description" && curr[0] !== "remindAfterDays" && curr[0]!=="website" && curr[0]!=="isFavourite") {
          if (curr[1].trim().length > 0) {
            return acc;
          } else {
            return false;
          }
        } else {
          return acc;
        }
      }, true);
    } else {
      isValid = Object.values(formValidator).reduce(
        (acc, curr) => (curr ? acc : false),
        true
      );
    }
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
    <div className={passwordFormCSS.mainContainer} onClick={() => closeForm()}>
      <div
        className={`${`glassCard`} ${passwordFormCSS.formContainer}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{_id ? "Manage Password" : "Create new Password"}</h2>
        <form
          onSubmit={(e) => submitHandler(e)}
          className={passwordFormCSS.form}
        >
          <span className={passwordFormCSS.idContainer}>
            {_id ? <i>ID:{_id}</i> : "‎ "}
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
              required={true}
            />
          </div>
          <div
            className={
              passwordFocus
                ? `${passwordFormCSS.password} ${passwordFormCSS.focus}`
                : `${passwordFormCSS.password}`
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
              required={true}
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
              required={true}
            />
          </div>
          <div className={passwordFormCSS.fieldContainer}>
            <label
              htmlFor="website"
              className={
                formData.website !== "" || focus.website
                  ? `${passwordFormCSS.filled} ${passwordFormCSS.loginLabels}`
                  : passwordFormCSS.loginLabels
              }
            >
              Site
            </label>
            <input
              type="text"
              defaultValue={formData?.website}
              onChange={(e) => changeHandler("website", e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, website: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, website: false }))}
              required={true}
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
          <button>
            <i className="fa-solid fa-plus"></i>
            {_id ? <span>Update</span> : <span>Create</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
