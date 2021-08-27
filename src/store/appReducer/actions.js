import * as type from "./types";

export const isAuth = (data) => ({ type: type.IS_AUTH, payload: data });
export const setUser = (data) => ({ type: type.SET_USER, payload: data });
export const login = (data) => ({ type: type.LOGIN, payload: data });
export const logout = (data) => ({ type: type.LOGOUT, payload: data });
