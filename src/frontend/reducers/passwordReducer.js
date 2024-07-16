export const initialPasswordState = {
  passwordLoading: false,
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
      return { ...state, passwords: [...payload] };
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
    default:
      return state;
  }
};
