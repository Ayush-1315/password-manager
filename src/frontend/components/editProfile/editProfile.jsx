import { useState } from "react";

import editUserCSS from "./editProfile.module.css";

export const EditProfile = ({ userData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ ...userData });
  const { id, username, firstName, lastName, email } = formData;
  const changeHandler = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };
  const initialFocus = {
    firstName: false,
    lastName: false,
    email: false,
  };

  const [focus, setFocus] = useState({ ...initialFocus });
  const submitHandler = (e) => {
    e.preventDefault();
    const email = formData.email;
    const firstName = formData.firstName;
    if (
      email &&
      email.includes("@") &&
      email.includes(".com") &&
      firstName.length !== 0
    ) {
      onSubmit(formData);
    } else {
      alert("Enter valid inputs");
    }
  };
  return (
    <div className={`${`glassCard`} ${editUserCSS.card}`}>
      <h2>Edit Profile</h2>
      <form onSubmit={submitHandler} className={editUserCSS.form}>
        <span>{"@" + username}</span>
        <span>
          <i>Anzen ID:</i> {id}
        </span>
        <div className={editUserCSS.fieldContainer}>
          <input
            type="text"
            defaultValue={firstName}
            onChange={(e) => changeHandler("firstName", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, firstName: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, firstName: false }))}
          />
          <label
            htmlFor="firstName"
            className={
              focus.firstName || formData.firstName !== ""
                ? `${editUserCSS.loginLabels} ${editUserCSS.filled}`
                : `${editUserCSS.loginLabels}`
            }
          >
            First Name
          </label>
        </div>
        <div>
          {formData.firstName.length === 0 ? (
            <span>This field is required</span>
          ) : (
            "‎"
          )}
        </div>
        <div className={editUserCSS.fieldContainer}>
          <input
            type="text"
            defaultValue={lastName}
            onChange={(e) => changeHandler("lastName", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, lastName: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, lastName: false }))}
          />
          <label
            htmlFor="lastName"
            className={
              focus.lastName || formData.lastName !== ""
                ? `${editUserCSS.loginLabels} ${editUserCSS.filled}`
                : `${editUserCSS.loginLabels}`
            }
          >
            {" "}
            Last Name
          </label>
        </div>
        <div className={editUserCSS.fieldContainer}>
          <input
            type="text"
            defaultValue={email}
            onChange={(e) => changeHandler("email", e.target.value)}
            onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
            onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
          />
          <label
            htmlFor="email"
            className={
              focus.email || formData.email !== ""
                ? `${editUserCSS.loginLabels} ${editUserCSS.filled}`
                : `${editUserCSS.loginLabels}`
            }
          >
            Email
          </label>
        </div>
        <div>
          {formData.email.length === 0 ? (
            <span>This field is required</span>
          ) : formData.email.includes("@") &&
            formData.email.includes(".com") ? (
            "‎"
          ) : (
            "Provide a valid email."
          )}
        </div>
        <div className={editUserCSS.actionBtns}>
          <button>
            <span>
              <i className="fa-solid fa-check"></i>
            </span>
            <span>Update Profile</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
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
