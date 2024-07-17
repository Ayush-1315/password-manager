import { searchPasswordService } from "../services/paswordServices";
import { userAvailabilityService } from "../services/userServices";

const debouncer = (callback, delay) => {
  let timerId;
  return function (...args) {
    return new Promise((res, rej) => {
      clearTimeout(timerId);
      timerId = setTimeout(async () => {
        try {
          const result = await callback.apply(this, args);
          res(result);
        } catch (e) {
          rej(e);
        }
      }, delay);
    });
  };
};

const userAvailableCheck = async (username) => {
  try {
    const res = await userAvailabilityService(username);
    if (res.status === 200) {
      return res.data.available;
    } else {
      throw new Error(res);
    }
  } catch (e) {
    throw e;
  }
};


export const deboundedUserCheck = debouncer(userAvailableCheck, 1000);
export const debouncedSearchPassword=debouncer(searchPasswordService,1000);
