import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  authorizedProfileDelete,
  editUserProfile,
  sendDeleteOTP,
  userProfile,
} from "../../services/userServices";
import { ProfileCard } from "../../components/profileCard/profilecard";
import { EditProfile } from "../../components/editProfile/editProfile";
import { DeleteProfile } from "../../components/deleteProfile/deleteProfile";

export const Profile = () => {
  const { isLogin, logoffUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userTimeout, setUserTimeout] = useState(false);
  const [timer, setTimer] = useState(5);
  const [deleteProfile, setDeleteProfile] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
    otp: "",
    attempt: false,
  });
  const timerIdRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const token = isLogin?.token;
        const userId = isLogin?.user?.id;
        const res = await userProfile(userId, token);
        console.log(res)
        if (res.status === 200 && res.data?.data?.user?.id!=="") {
          setUserData({ ...res?.data?.data?.user });
        }
        else{
          logoffUser()
        }
      } catch (e) {
        setUserData(false);
        if (e?.response?.status === 401) {
          setUserTimeout(true);

          if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
          }
          timerIdRef.current = setInterval(() => {
            setTimer((prev) => {
              console.log(`Timer value ${prev}`);
              if (prev === 0) {
                clearInterval(timerIdRef.current);
                logoffUser();
                return 0;
              } else {
                return prev - 1;
              }
            });
          }, 1000);
        }
        else if(e?.response?.status===404){
          logoffUser();
        }
      } finally {
        setIsLoading(false);
      }
    })();
    document.title = `Profile | Anzen`;
  }, [isLogin, logoffUser]);
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
      setEditProfileForm(false);
      if (response?.status === 201) {
        setUserData((prev) => ({ ...prev, ...response?.data?.data }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancelHandler = () => {
    setEditProfileForm(false);
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
      if(response?.status===200){
        logoffUser();
      }
      else{
        console.log(response)
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {userTimeout ? (
        <span>Token Expired {timer}</span>
      ) : (
        <div>
          {editProfileForm && userData && (
            <EditProfile
              userData={userData}
              onSubmit={(data) => {
                submitHandler(data);
              }}
              onCancel={cancelHandler}
            />
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : userData ? (
            <>
              <ProfileCard
                userData={userData}
                onEdit={() => {
                  setEditProfileForm(true);
                }}
                onLogOff={() => logoffUser()}
                onDelete={(userId, email, username) =>
                  deleteProfileOTP(userId, email, username)
                }
              />
              {deleteProfile.attempt && (
                <DeleteProfile
                  setDeleteData={(otp, password) => {
                    setDeleteProfile((prev) => ({ ...prev, otp, password }));
                    authorizeDeletProfile()
                  }}
                />
              )}
            </>
          ) : (
            <span>Sorry for Inconvinience, there are some server issues.</span>
          )}
        </div>
      )}
    </>
  );
};
