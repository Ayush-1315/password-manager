import { useEffect, useState } from "react";

import { useAuth } from "../../context/authContext";
import { usePassword } from "../../context/passwordContext";
import { PasswordHolder } from "../../components/password/password";
import { Modal } from "../../components/modal/modal";
import { VerifyPassword } from "../../components/verifyPassword/verifyPassword";
import { PasswordForm } from "../../components/passwordForm/passwordForm";

import { getAllFavouritesService } from "../../services/paswordServices";

import Loader from "../../components/loader/loader";
import favouritesPageCSS from "./favourites.module.css";

export const FavouritesPage = () => {
  const [favourites, setFavouries] = useState({
    isLoading: true,
    data: [],
  });
  const [accPassword, setAccPassword] = useState({ _id: "", password: "" });
  const [editPassword, setEditPassword] = useState({
    id: "",
    show: false,
  });
  const [showPassword, setShowPassword] = useState({
    id: "",
    show: false,
  });
  const [editFormData, setEditFormData] = useState(null);
  const { isLogin } = useAuth();
  const {
    deletePassword,
    removeFromFavourites,
    getPasswordInfo,
    updatePassword,
  } = usePassword();
  const handleEditPassword = async (password) => {
    try {
      const response = await getPasswordInfo(
        isLogin?.user?.id,
        editPassword?.id,
        password
      );
      setEditFormData(response);
    } catch (e) {
      console.log(e);
    } finally {
      setEditPassword({ id: "", show: false });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await getAllFavouritesService(
          isLogin?.user?.id,
          isLogin?.token
        );
        if (response.status === 200) {
          setFavouries((prev) => ({
            ...prev,
            data: response?.data?.data?.data,
          }));
        } else {
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setFavouries((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [isLogin]);
  const resetAccPassword = () => setAccPassword({ _id: "", password: "" });
  const handleDelete = async (id) => {
    await deletePassword(id);
    setFavouries((prev) => {
      const data = prev.data.filter(({ _id }) => _id !== id);
      return { ...prev, data };
    });
  };
  const toggleEdit = (passId) => {
    setEditPassword({ id: passId, show: true });
  };
  const handleShowPassword = async (password) => {
    try {
      const response = await getPasswordInfo(
        isLogin?.user?.id,
        showPassword?.id,
        password
      );
      setAccPassword({ _id: response?._id, password: response?.password });
    } catch (e) {
      console.log(e);
    } finally {
      setShowPassword({
        passId: "",
        show: false,
      });
    }
  };
  const onUpdatePassword = async (passwordBody) => {
    try {
      const { _id, username, password, platform, website, description } =
        passwordBody;
      await updatePassword(
        _id,
        platform,
        password,
        username,
        website,
        description
      );
    } catch (e) {
      console.log(e);
    } finally {
      setEditFormData(null);
    }
  };
  return (
    <div>
      {favourites.isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className={favouritesPageCSS.page}>
            {favourites.data.length > 0 ? (
              favourites.data.map((password) => (
                <PasswordHolder
                  key={password._id}
                  {...password}
                  isFavourite={true}
                  userId={isLogin?.user?.id}
                  onDelete={() => handleDelete(password._id)}
                  onView={(id) => setShowPassword({ id, show: true })}
                  viewPassword={
                    password._id === accPassword._id ? accPassword.password : ""
                  }
                  resetViewPassword={resetAccPassword}
                  onEdit={(pass) => toggleEdit(pass)}
                  removeFromFav={async (id) => {
                    await removeFromFavourites(id);
                    setFavouries((prev) => {
                      const data = prev.data.filter(({ _id }) => _id !== id);
                      return { ...prev, data };
                    });
                  }}
                />
              ))
            ) : (
              <div>
                <div className={favouritesPageCSS.magnifyingGlassContainer}>
                  <div className={favouritesPageCSS.magnifyingGlass}>
                    <div className={favouritesPageCSS.handle}></div>
                    <div className={favouritesPageCSS.glasss}>
                      <div className={favouritesPageCSS.emptySpace}></div>
                    </div>
                  </div>
                  <p>
                  Empty favorites.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {showPassword.show && (
        <Modal
          component={
            <VerifyPassword
              onSubmit={(password) => handleShowPassword(password)}
            />
          }
          onClose={() =>
            setShowPassword({
              passId: "",
              show: false,
            })
          }
        />
      )}
      {editPassword.show && !editFormData && (
        <Modal
          component={
            <VerifyPassword
              onSubmit={(password) => handleEditPassword(password)}
            />
          }
          onClose={() =>
            setEditPassword({
              passId: "",
              show: false,
            })
          }
        />
      )}
      {editFormData && (
        <PasswordForm
          _id={editFormData?._id}
          passwordBody={editFormData}
          closeForm={() => {
            setShowPassword({ id: "", show: false });
            setEditFormData(null);
          }}
          submitData={(update) => onUpdatePassword(update)}
        />
      )}
    </div>
  );
};
