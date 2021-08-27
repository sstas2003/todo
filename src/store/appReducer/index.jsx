import * as types from "./types";
import { state as initialState } from "./state";

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.IS_AUTH:
      return { ...state, isAuth: payload };
    case types.LOGIN:
      window.localStorage.setItem("token", payload?.token || "");
      return {
        ...state,
        isAuth: !!payload,
        user: { ...state.user, ...payload },
      };
    case types.LOGOUT:
      window.localStorage.setItem("token", "");
      return {
        ...state,
        isAuth: false,
        user: { ...state.user, ...payload },
      };
    case types.SET_USER:
      window.localStorage.setItem("token", payload.token);
      return { ...state, user: { ...state.user, ...payload } };
    default:
      return state;
  }
};
