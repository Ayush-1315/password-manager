export const initialPasswordState = {
  passwordLoading: true,
  passwords: [],
  passwordSearch: "",
  page: 1,
};

export const passwordReducerFunction = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return { ...state, passwordLoading: payload };
    case "SET_PASSWORDS":
      const { isSmallDevice, data } = payload;
      return {
        ...state,
        passwords:
          isSmallDevice && state.page !== 1
            ? [...state.passwords, ...data]
            : [...data],
      };
    case "PASSWORD_SEARCH":
      return { ...state, passwordSearch: payload };
    case "SHOW_MORE":
      return { ...state, page: state.page + 1 };
    case "DELETE_PASSWORD":
      return {
        ...state,
        passwords: state.passwords.filter(({ _id }) => _id !== payload),
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        passwords: state.passwords.map((password) =>
          password?._id === payload?._id ? { ...payload } : password
        ),
      };
    case "ADD_PASSWORD":
      return {
        ...state,
        passwords: [...state.passwords, payload],
      };
    case "SEARCH_PASSWORD":
      return {
        ...state,
        passwordSearch: payload,
      };
    case "SEARCH_PAGE":
      return {
        ...state,
        page: payload,
      };
    case "ADD_TO_FAVOURITES":
      return {
        ...state,
        passwords: state.passwords.map((password) =>
          password?._id === payload
            ? { ...password, isFavourite: true }
            : password
        ),
      };
    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        passwords: state.passwords.map((password) =>
          password?._id === payload
            ? { ...password, isFavourite: false }
            : password
        ),
      };
    default:
      return state;
  }
};
