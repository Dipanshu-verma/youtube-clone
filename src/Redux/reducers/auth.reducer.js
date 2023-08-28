import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_PROFILE,
  LOG_OUT,
} from "../ActionType";

const intial = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user"))
    : null,
  loading: false,
};
 

export const authreducer = (prevState = { ...intial }, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload,
        accessToken: null,
      };
    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload,
      };
    case LOG_OUT:
   
      return {
        ...prevState,
        accessToken: null,
        user: null,
      };
    default:
      return prevState;
  }
};
