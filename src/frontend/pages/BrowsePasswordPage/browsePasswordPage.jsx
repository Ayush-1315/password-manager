import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../context/authContext";
import { usePassword } from "../../context/passwordContext";
import { PasswordHolder } from "../../components/password/password";
import BrowsePasswordCSS from "./browsePasswords.module.css";

export const BrowsePasswordPage = () => {
  const { isLogin, verifyToken } = useAuth();
  const { token, user } = isLogin;
  const {
    passwordState,
    deletePassword,
    passwordDispatch,
    getPasswords,
    totalPasswords,
  } = usePassword();
  const { page, passwordSearch } = passwordState;
  const [totalPages, setPages] = useState(0);

  const totalPagesRef = useRef(totalPages);
  const pageRef = useRef(page);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    verifyToken();
    window.addEventListener("scroll", handleScroll);
    (async () => await passwordDispatch({ type: "SEARCH_PAGE", payload: 1 }))();
    document.title = `${isLogin?.user?.username} | Passwords`;
    setPages(() =>
      totalPasswords / 16 === 0
        ? totalPasswords / 16
        : Math.floor(totalPasswords / 16) + 1
    );
    totalPagesRef.current = Math.ceil(totalPasswords / 16);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [isLogin, totalPasswords]);

  useEffect(() => {
    const fetchData = async () => {
      await getPasswords(page === 1, (val) => {
        if(window.screen.width<=481)
          setIsLoading(val);
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
  return (
    <div onScroll={handleScroll}>
      <input
        type="text"
        placeholder="search accounts"
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
        value={passwordState?.passwordSearch || ""}
      />
      <div>
        {passwordState?.passwordLoading ? (
          "Loading"
        ) : (
          <>
            <div className={BrowsePasswordCSS.page}>
              {passwordState.passwords.length > 0
                ? passwordState.passwords.map((password) => (
                    <PasswordHolder
                      key={password._id}
                      {...password}
                      userId={isLogin?.user?.id}
                      onDelete={() => handleDelete(password._id)}
                    />
                  ))
                : passwordState.passwords.length === 0 &&
                  passwordSearch.length === 0
                ? "Get started by creating some passwords..."
                : "Nothing matched your search"}
            </div>
            {isLoading && (
              <div
                style={{
                  position: "fixed",
                  bottom: "0",
                  background: "red",
                  width: "100%",
                  textAlign: "center",
                  zIndex: 1000,
                  padding: "10px",
                  color: "white",
                }}
              >
                Loading
              </div>
            )}
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
    </div>
  );
};
