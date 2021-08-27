import * as type from "./types";

export const setIsLoading = (payload) => ({
  type: type.SET_IS_LOADING,
  payload,
});
export const setList = (payload) => ({ type: type.SET_LIST, payload });
export const setFilters = (payload) => ({ type: type.SET_FILTERS, payload });
export const setListItem = (payload) => ({ type: type.SET_LIST_ITEM, payload });
export const deleteListItem = (payload) => ({
  type: type.DELETE_LIST_ITEM,
  payload,
});
export const addListItem = (payload) => ({
  type: type.ADD_LIST_ITEM,
  payload,
});
