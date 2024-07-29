import { useState } from "react";

import deleteProfileCSS from "./deleteProfile.module.css";
export const DeleteProfile = ({ setDeleteData, handleCancel }) => {
  const [formData, setFormData] = useState({
    OTP: "",
    password: "",
  });
  const [formValidator, setFormValidator] = useState({
    OTP: false,
    password: false,
  });
  const [focus, setFocus] = useState({
    password: false,
    otp: false,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
    setFormValidator((prev) =>
      type === "OTP"
        ? { ...prev, [type]: value.trim().length === 6 }
        : { ...prev, [type]: value.trim().length >= 8 }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
    e.target.reset();
  };

  const clickHandler = () => {
    const { OTP, password } = formValidator;
    if (OTP && password) {
      setDeleteData(formData.OTP, formData.password);
    }
  };
  return (
    <div className={`${`glassCard`} ${deleteProfileCSS.card}`}>
      {!confirmDelete ? (
        <form
          onSubmit={(e) => submitHandler(e)}
          className={deleteProfileCSS.form}
        >
          <h2>Delete your Anzen Account</h2>
          <br />
          <div className={deleteProfileCSS.fieldContainer}>
            <label
              htmlFor="password"
              className={
                focus.password || formData.password !== ""
                  ? `${deleteProfileCSS.loginLabels} ${deleteProfileCSS.filled}`
                  : `${deleteProfileCSS.loginLabels}`
              }
            >
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => changeHandler("password", e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
            />
          </div>
          <div className={deleteProfileCSS.fieldContainer}>
            <label
              htmlFor="OTPverification"
              className={
                focus.otp || formData.OTP !== ""
                  ? `${deleteProfileCSS.loginLabels} ${deleteProfileCSS.filled}`
                  : `${deleteProfileCSS.loginLabels}`
              }
            >
              Verify OTP
            </label>
            <input
              type="text"
              id="OTPverification"
              onChange={(e) => changeHandler("OTP", e.target.value)}
              onFocus={() => setFocus((prev) => ({ ...prev, otp: true }))}
              onBlur={() => setFocus((prev) => ({ ...prev, otp: false }))}
            />
          </div>
          <div className={deleteProfileCSS.actionBtns}>
            <button disabled={!(formValidator?.password && formValidator?.OTP)}>
              <span>
                <i className="fa-solid fa-trash"></i>
              </span>
              <span>Delete Account</span>
            </button>
            <button onClick={handleCancel}>
              <span>
                <i className="fa-solid fa-xmark"></i>
              </span>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div
          className={`${deleteProfileCSS.actionBtns} ${deleteProfileCSS.form}`}
        >
          <p className={deleteProfileCSS.message}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <button onClick={() => clickHandler()}>
            <span>
              <i className="fa-solid fa-check"></i>
            </span>
            <span>Confirm Delete</span>
          </button>
          <button onClick={() => handleCancel()}>
            <span>
              <i className="fa-solid fa-xmark"></i>
            </span>
            <span>Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};
