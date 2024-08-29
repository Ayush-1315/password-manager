import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../context/authContext";
import { usePassword } from "../../context/passwordContext";
import { PasswordHolder } from "../../components/password/password";
import BrowsePasswordCSS from "./browsePasswords.module.css";
import vault from "../../../assets/vault.png";
import Loader from "../../components/loader/loader";
import MobileLoader from "../../components/mobileLoader/mobileLoader";
import { Modal } from "../../components/modal/modal";
import { VerifyPassword } from "../../components/verifyPassword/verifyPassword";
import { PasswordForm } from "../../components/passwordForm/passwordForm";

export const BrowsePasswordPage = () => {
  const { isLogin, verifyToken } = useAuth();
  const { token, user } = isLogin;
  const {
    passwordState,
    deletePassword,
    passwordDispatch,
    getPasswords,
    totalPasswords,
    getPasswordInfo,
    updatePassword,
    addToFavourites,
    removeFromFavourites,
  } = usePassword();
  const { page, passwordSearch } = passwordState;
  const [totalPages, setPages] = useState(0);
  const [showPassword, setShowPassword] = useState({
    id: "",
    show: false,
  });
  const [editPassword, setEditPassword] = useState({
    id: "",
    show: false,
  });
  const [editFormData, setEditFormData] = useState(null);
  const totalPagesRef = useRef(totalPages);
  const pageRef = useRef(page);

  const [isLoading, setIsLoading] = useState(false);
  const [accPassword, setAccPassword] = useState({ _id: "", password: "" });
  useEffect(() => {
    verifyToken();
    window.addEventListener("scroll", handleScroll);
    (async () => await passwordDispatch({ type: "SEARCH_PAGE", payload: 1 }))();
    document.title = `${isLogin?.user?.username} | Passwords`;
    setPages(() =>
      totalPasswords / 12 === 0
        ? totalPasswords / 12
        : Math.floor(totalPasswords / 12) + 1
    );
    totalPagesRef.current = Math.ceil(totalPasswords / 12);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [isLogin, totalPasswords]);

  useEffect(() => {
    const fetchData = async () => {
      await getPasswords(page === 1, (val) => {
        if (window.screen.width <= 481) setIsLoading(val);
      });
    };
    fetchData();
    pageRef.current = page;
    // eslint-disable-next-line
  }, [page, passwordSearch, isLogin, token, user]);

  const handleDelete = async (id) => {
    await deletePassword(id);
  };
  const changeHandler = (value) => {
    passwordDispatch({ type: "SEARCH_PASSWORD", payload: value });
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={
            page === i
              ? BrowsePasswordCSS.currentPage
              : BrowsePasswordCSS.pageNumbers
          }
          onClick={() => handlePage(i)}
        >
          {page === i ? i : ""}
        </span>
      );
    }
    return pages;
  };
  const handleNextPage = () => {
    if (pageRef.current < totalPagesRef.current) {
      passwordDispatch({ type: "SEARCH_PAGE", payload: pageRef.current + 1 });
    }
  };
  const handlePreviousPage = () => {
    if (pageRef.current > 1) {
      passwordDispatch({ type: "SEARCH_PAGE", payload: pageRef.current - 1 });
    }
  };
  const handlePage = (page) => {
    passwordDispatch({ type: "SEARCH_PAGE", payload: page });
  };
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight &&
      window.screen.width <= 481
    ) {
      handleNextPage();
    }
  };
  const handleShowPassword = async (password) => {
    try {
      const response = await getPasswordInfo(
        user?.id,
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
  const resetAccPassword = () => setAccPassword({ _id: "", password: "" });

  const toggleEdit = (passId) => {
    setEditPassword({ id: passId, show: true });
  };
  const handleEditPassword = async (password) => {
    try {
      const response = await getPasswordInfo(
        user?.id,
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
    <div onScroll={handleScroll}>
      <div className={BrowsePasswordCSS.searchBar}>
        <input
          type="text"
          placeholder="search accounts"
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
          value={passwordState?.passwordSearch || ""}
        />
      </div>
      <div>
        {passwordState?.passwordLoading ? (
          <Loader />
        ) : (
          <>
            <div className={BrowsePasswordCSS.page}>
              {passwordState.passwords.length > 0 ? (
                passwordState.passwords.map((password) => (
                  <PasswordHolder
                    key={password._id}
                    {...password}
                    userId={isLogin?.user?.id}
                    onDelete={() => handleDelete(password._id)}
                    onView={(id) => setShowPassword({ id, show: true })}
                    viewPassword={
                      password._id === accPassword._id
                        ? accPassword.password
                        : ""
                    }
                    resetViewPassword={resetAccPassword}
                    onEdit={(pass) => toggleEdit(pass)}
                    addToFav={(id) => addToFavourites(id)}
                    removeFromFav={(id) => removeFromFavourites(id)}
                  />
                ))
              ) : (
                  passwordState.passwords.length === 0 &&
                  passwordSearch.length === 0
                ) ? (
                <div>
                  <div className={BrowsePasswordCSS.vaultContainer}>
                    <img src={vault} alt="Vault" />
                    <p className={BrowsePasswordCSS.emptyText}>No passwords saved yet!</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={BrowsePasswordCSS.magnifyingGlassContainer}>
                    <div className={BrowsePasswordCSS.magnifyingGlass}>
                      <div className={BrowsePasswordCSS.handle}></div>
                      <div className={BrowsePasswordCSS.glasss}>
                        <div className={BrowsePasswordCSS.emptySpace}></div>
                      </div>
                    </div>
                    <p>No match found.</p>
                  </div>
                </div>
              )}
            </div>
            {isLoading && <MobileLoader />}
            {passwordSearch === "" && !(window.screen.width <= 481) && (
              <div className={BrowsePasswordCSS.buttons}>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                {renderPages()}
                <button
                  disabled={!(page < totalPages)}
                  onClick={handleNextPage}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
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
