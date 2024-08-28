import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  passwordReducerFunction,
  initialPasswordState,
} from "../reducers/passwordReducer";
import {
  addPasswordService,
  addToFavouritesService,
  deletePasswordService,
  getPasswordsService,
  removeFormFavouritesService,
  updateAccountPasswordService,
  viewPasswordService,
} from "../services/paswordServices";
import { useAuth } from "./authContext";
import { useToaster } from "./toasterContext";
import { debouncedSearchPassword } from "../utils/searchDebounce";
const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwordState, passwordDispatch] = useReducer(
    passwordReducerFunction,
    initialPasswordState
  );
  const latestRequestRef = useRef(null);
  const [totalPasswords, setTotalPasswords] = useState(0);

  const { setToasterData } = useToaster();
  const { isLogin } = useAuth();
  const { user, token } = isLogin;
  const { page, passwordSearch } = passwordState;

  useEffect(() => {
    const searchPassword = async (search) => {
      if (latestRequestRef.current) {
        latestRequestRef.current.abort();
      }
      const controller = new AbortController();
      latestRequestRef.current = controller;
      try {
        passwordDispatch({ type: "LOADING", payload: true });
        const response = await debouncedSearchPassword(search, user.id, token, {
          signal: controller.signal,
        });
        if (response?.status === 200) {
          if (passwordSearch.length >= 1) {
            passwordDispatch({
              type: "SET_PASSWORDS",
              payload: { data: response?.data?.data, isSmallDevice: false },
            });
          }
        }
      } catch (e) {
        if (e.name === "CanceledError") {
          console.log("Request was cancelled");
        } else {
          console.log(e);
        }
      } finally {
        if (latestRequestRef.current === controller) {
          passwordDispatch({ type: "LOADING", payload: false });
        }
      }
    };
    if (passwordSearch.trim().length !== 0) {
      searchPassword(passwordSearch);
    }

    return () => {
      if (latestRequestRef.current) {
        latestRequestRef.current.abort();
      }
    };
  }, [passwordSearch, token, user]);

  const getPasswords = async (inital, setIsLoading) => {
    if (isLogin && passwordSearch === "") {
      (async () => {
        if (inital) {
          passwordDispatch({ type: "LOADING", payload: true });
        } else {
          setIsLoading(true);
        }
        try {
          const response = await getPasswordsService(page, token, user?.id);
          if (inital) {
            passwordDispatch({ type: "LOADING", payload: false });
          } else {
            setIsLoading(false);
          }
          if (response?.status === 200) {
            setTotalPasswords(response?.data?.totalPasswords);
            passwordDispatch({
              type: "SET_PASSWORDS",
              payload: {
                data: response?.data?.data,
                isSmallDevice: window.screen.width <= 481,
              },
            });
          }
        } catch (e) {
          if (inital) {
            passwordDispatch({ type: "LOADING", payload: false });
          }
          setToasterData((prev) => ({
            ...prev,
            message: "Network Error",
            status: "error",
          }));
        } finally {
          if (!window.screen.width <= 481) {
            passwordDispatch({ type: "LOADING", payload: false });
          }
        }
      })();
    }
  };
  const createPassword = async (
    platform,
    username,
    password,
    description,
    website
  ) => {
    try {
      const response = await addPasswordService(
        user?.id,
        platform,
        username,
        password,
        description,
        website,
        token
      );
      if (response?.status === 201) {
        setToasterData((prev) => ({
          ...prev,
          message: "Password Saved",
          status: "success",
        }));
        if (passwordState.passwords.length % 12 !== 0) {
          passwordDispatch({
            type: "ADD_PASSWORD",
            payload: response?.data?.data,
          });
        }
      }
    } catch (e) {
      if (e.message === "Network Error") {
        setToasterData((prev) => ({
          ...prev,
          message: "Network Error",
          status: "error",
          isNetwork: true,
        }));
      }
    }
  };

  const updatePassword = async (
    passwordId,
    platform,
    password,
    username,
    website,
    description
  ) => {
    try {
      const response = await updateAccountPasswordService(
        user?.id,
        passwordId,
        token,
        platform,
        username,
        password,
        description,
        website
      );
      if (response?.status === 201) {
        passwordDispatch({
          type: "UPDATE_PASSWORD",
          payload: response?.data?.data,
        });
        setToasterData((prev) => ({
          ...prev,
          message: "Password Updated",
          status: "success",
        }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getPasswordInfo = async (userId, passwordId, accountPassword) => {
    try {
      const response = await viewPasswordService(
        userId,
        passwordId,
        token,
        accountPassword
      );
      if (response?.status === 200) {
        return response?.data;
      } else {
        console.log(response);
      }
    } catch (e) {
      if (e.response.status === 401) {
        setToasterData((prev) => ({
          ...prev,
          message: "Unauthorized Access",
          status: "warning",
        }));
      } else {
        console.log(e);
      }
    }
  };

  const deletePassword = async (passwordId) => {
    try {
      const response = await deletePasswordService(user.id, passwordId, token);
      if (response.status === 204) {
        setToasterData((prev) => ({
          ...prev,
          message: "Password Deleted",
          status: "success",
        }));
        passwordDispatch({ type: "DELETE_PASSWORD", payload: passwordId });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addToFavourites = async (passId) => {
    try {
      const response = await addToFavouritesService(user?.id, passId, token);
      passwordDispatch({ type: "ADD_TO_FAVOURITES", payload: passId });
      if (response.status === 200) {
        setToasterData((prev) => ({
          ...prev,
          message: "Added to Favourites",
          status: "success",
        }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeFromFavourites = async (passId) => {
    try {
      const response = await removeFormFavouritesService(
        user?.id,
        passId,
        token
      );
      passwordDispatch({ type: "REMOVE_FROM_FAVOURITES", payload: passId });
      if (response.status === 200) {
        setToasterData((prev) => ({
          ...prev,
          message: "Removed From Favourites",
          status: "success",
        }));
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PasswordContext.Provider
      value={{
        passwordState,
        createPassword,
        updatePassword,
        getPasswordInfo,
        deletePassword,
        passwordDispatch,
        getPasswords,
        addToFavourites,
        removeFromFavourites,
        totalPasswords,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => useContext(PasswordContext);
