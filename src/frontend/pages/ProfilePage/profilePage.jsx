import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  authorizedProfileDelete,
  editUserProfile,
  sendDeleteOTP,
  updatePasswordService,
  userProfile,
} from "../../services/userServices";
import { ProfileCard } from "../../components/profileCard/profilecard";
import { EditProfile } from "../../components/editProfile/editProfile";
import { DeleteProfile } from "../../components/deleteProfile/deleteProfile";
import { UpdatePassword } from "../../components/updatePasswordForm/updatePasssword";
import { useToaster } from "../../context/toasterContext";
import { Modal } from "../../components/modal/modal";
import Loader from "../../components/loader/loader";

export const Profile = () => {
  const initialDeletOptions = {
    userId: "",
    username: "",
    email: "",
    password: "",
    otp: "",
    attempt: false,
  };

  const modalOptions = {
    editUser: false,
    updatePassword: false,
  };
  const { isLogin, logoffUser, verifyToken } = useAuth();
  const { setToasterData, toasterData } = useToaster();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProfile, setDeleteProfile] = useState({
    ...initialDeletOptions,
  });
  const [updatePassword, setUpdatePasssword] = useState({
    userId: "",
    username: "",
    password: "",
    newPassword: "",
    attempt: false,
  });

  const [showModal, setShowModal] = useState({ ...modalOptions });

  useEffect(() => {
    (async () => {
      try {
        const token = isLogin?.token;
        const userId = isLogin?.user?.id;
        const res = await userProfile(userId, token);
        if (res.status === 200 && res.data?.data?.user?.id !== "") {
          setUserData({ ...res?.data?.data?.user });
        } else {
          logoffUser();
        }
      } catch (e) {
        setUserData(false);
        if (e?.response?.status === 401) {
          setToasterData((prev) => ({
            ...prev,
            message: "Timeout",
            status: "warning",
          }));
        } else if (e?.response?.status === 404) {
          logoffUser();
        } else {
          setToasterData((prev) => ({
            ...prev,
            message: "Server Error",
            status: "Error",
            isNetwork: true,
          }));
        }
      } finally {
        setIsLoading(false);
      }
    })();
    verifyToken();
    document.title = `Profile | Anzen`;
    // eslint-disable-next-line
  }, [isLogin, logoffUser, setToasterData]);
  useEffect(() => {
    if (toasterData?.isNetwork) {
      logoffUser();
    }
  }, [toasterData, logoffUser]);
  const submitHandler = async (data) => {
    try {
      const id = isLogin?.user?.id;
      const token = isLogin?.token;
      const { firstName, lastName, email } = data;
      const response = await editUserProfile(
        id,
        firstName,
        lastName,
        email,
        token
      );
      setShowModal((prev) => ({ ...prev, editUser: false }));
      if (response?.status === 201) {
        setUserData((prev) => ({ ...prev, ...response?.data?.data }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteProfileOTP = async (userId, email, username) => {
    try {
      const response = await sendDeleteOTP(
        userId,
        email,
        username,
        isLogin?.token
      );
      if (response?.status === 200) {
        setDeleteProfile((prev) => ({
          ...prev,
          userId,
          email,
          username,
          attempt: true,
        }));
        setToasterData((prev) => ({
          ...prev,
          message: "OTP Sent",
          status: "success",
        }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const authorizeDeletProfile = async () => {
    try {
      const { userId, email, username, password, otp } = deleteProfile;
      const response = await authorizedProfileDelete(
        userId,
        email,
        username,
        password,
        otp,
        isLogin?.token
      );
      if (response?.status === 200) {
        logoffUser();
      } else {
        console.log(response);
      }
    } catch (e) {
      if (e?.response?.status === 400) {
        setToasterData((prev) => ({
          ...prev,
          message: "Invalid OTP",
          status: "error",
        }));
      } else {
        console.log(e);
      }
    }
  };

  const passwordUpdate = async () => {
    try {
      const { userId, username, password, newPassword } = updatePassword;
      const res = await updatePasswordService(
        userId,
        username,
        password,
        newPassword,
        isLogin?.token
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div>
        {showModal.editUser && userData && (
          <Modal
            component={
              <EditProfile
                userData={userData}
                onSubmit={(data) => {
                  submitHandler(data);
                }}
                onCancel={() =>
                  setShowModal((prev) => ({
                    ...prev,
                    editUser: false,
                  }))
                }
              />
            }
            onClose={() =>
              setShowModal((prev) => ({ ...prev, ...modalOptions }))
            }
          />
        )}
        {isLoading ? (
          <Loader/>
        ) : userData ? (
          <>
            <ProfileCard
              userData={userData}
              onEdit={() => {
                setShowModal((prev) => ({ ...prev, editUser: true }));
              }}
              onLogOff={() => logoffUser()}
              onDelete={(userId, email, username) =>
                deleteProfileOTP(userId, email, username)
              }
              onUpdatePassword={(userId, username) =>
                setUpdatePasssword((prev) => ({
                  ...prev,
                  userId,
                  username,
                  attempt: true,
                }))
              }
            />
            {updatePassword.attempt && (
              <Modal
                component={
                  <UpdatePassword
                    handleSubmit={(password, newPassword) => {
                      setUpdatePasssword((prev) => ({
                        ...prev,
                        password,
                        newPassword,
                      }));
                      passwordUpdate();
                    }}
                    handleCancel={() =>
                      setUpdatePasssword((prev) => ({
                        ...prev,
                        attempt: false,
                      }))
                    }
                  />
                }
                onClose={() =>
                  setUpdatePasssword((prev) => ({ ...prev, attempt: false }))
                }
              />
            )}
            {deleteProfile.attempt && (
              <Modal
                component={
                  <DeleteProfile
                    setDeleteData={(otp, password) => {
                      setDeleteProfile((prev) => ({ ...prev, otp, password }));
                      authorizeDeletProfile();
                    }}
                    handleCancel={() => {
                      setDeleteProfile({ ...initialDeletOptions });
                    }}
                  />
                }
                onClose={() => setDeleteProfile({ ...initialDeletOptions })}
              />
            )}
          </>
        ) : (
          <span>Sorry for Inconvinience, there are some server issues.</span>
        )}
      </div>
    </>
  );
};
