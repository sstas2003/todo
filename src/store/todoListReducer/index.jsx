import * as types from "./types";
import { state as initialState } from "./state";

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LIST:
      return { ...state, list: [...payload] };
    case types.ADD_LIST_ITEM:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...payload,
            complete: false,
            id: state.list[state.list.length - 1].id + 1,
          },
        ],
      };
    case types.SET_LIST_ITEM: {
      let itemIndex = state.list.findIndex((item) => item.id === payload.id);
      let newList = [...state.list];
      if (itemIndex !== -1) {
        newList[itemIndex] = { ...newList[itemIndex], ...payload };
      }
      return { ...state, list: newList };
    }
    case types.DELETE_LIST_ITEM:
      let newList = state.list.filter((item) => item.id !== payload.id);
      return { ...state, list: newList };
    case types.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.target.name]: payload.target.value,
        },
      };
    case types.SET_IS_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};
