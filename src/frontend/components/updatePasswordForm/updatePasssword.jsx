import { useState } from "react";

import updatePasswordCSS from "./updatePassword.module.css";
export const UpdatePassword = ({ handleSubmit, handleCancel }) => {
  const initialData = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const initialFocus = {
    password: false,
    newPassword: false,
    confirmPassword: false,
  };
  const [formData, setFormData] = useState({ ...initialData });
  const [focus, setFocus] = useState({ ...initialFocus });
  const { password, newPassword, confirmPassword } = formData;
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };
  const isValid =
    password.trim().length >= 8 &&
    newPassword.trim().length >= 8 &&
    newPassword === confirmPassword;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isValid) {
      await handleSubmit(password, newPassword);
      e.target.reset();
      setFormData({ ...initialData });
    } else {
      alert("Provide all details");
    }
    console.log(isValid);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    handleCancel();
  };

  return (
    <div className={`${`glassCard`} ${updatePasswordCSS.card}`}>
      <h2>Update Profile Password</h2>
      <form
        onSubmit={(e) => submitHandler(e)}
        className={updatePasswordCSS.form}
      >
        <div className={updatePasswordCSS.fieldContainer}>
          <label
            htmlFor="currentPassword"
            className={
              focus.password || formData.password !== ""
                ? `${updatePasswordCSS.loginLabels} ${updatePasswordCSS.filled}`
                : `${updatePasswordCSS.loginLabels}`
            }
          >
            Current Password
          </label>
          <input
            type="text"
            name="currentPassword"
            id="currentPassword"
            onChange={(e) => changeHandler("password", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
          />
        </div>
        <div className={updatePasswordCSS.fieldContainer}>
          <label
            htmlFor="newPassword"
            className={
              focus.newPassword || formData.newPassword !== ""
                ? `${updatePasswordCSS.loginLabels} ${updatePasswordCSS.filled}`
                : `${updatePasswordCSS.loginLabels}`
            }
          >
            New Password
          </label>
          <input
            type="text"
            id="newPassword"
            onChange={(e) => changeHandler("newPassword", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, newPassword: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, newPassword: false }))}
          />
        </div>
        <div className={updatePasswordCSS.fieldContainer}>
          <label
            htmlFor="confirmPassword"
            className={
              focus.confirmPassword || formData.confirmPassword !== ""
                ? `${updatePasswordCSS.loginLabels} ${updatePasswordCSS.filled}`
                : `${updatePasswordCSS.loginLabels}`
            }
          >
            Confirm Password
          </label>
          <input
            type="text"
            id="confirmPassword"
            onChange={(e) => changeHandler("confirmPassword", e.target.value)}
            onFocus={() =>
              setFocus((prev) => ({ ...prev, confirmPassword: true }))
            }
            onBlur={() =>
              setFocus((prev) => ({ ...prev, confirmPassword: false }))
            }
          />
        </div>
        <div className={updatePasswordCSS.actionBtns}>
          <button disabled={!isValid}><span>
              <i className="fa-solid fa-check"></i>
            </span>
            <span>Update Password</span></button>
          <button onClick={cancelHandler}>
            <span>
              <i className="fa-solid fa-xmark"></i>
            </span>
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};
