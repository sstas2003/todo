import { useDispatch, useSelector } from "react-redux";
import {
  state,
  list,
  isLoading,
  filters,
} from "../../store/todoListReducer/selectors";
import {
  setList,
  setIsLoading,
  setListItem,
  addListItem,
  deleteListItem,
  setFilters,
} from "../../store/todoListReducer/actions";
import { useEffect, useState } from "react";
import { fetchList } from "../../requests/rest/todo";
import { getUsers } from "../../requests/rest/auth";

function usePresenter({ userId }) {
  let [users, setUsers] = useState([]);
  let dispatch = useDispatch();

  const deleteItem = (obj) => dispatch(deleteListItem(obj));
  const addItem = (obj) => dispatch(addListItem(obj));
  const setItem = (obj) => dispatch(setListItem(obj));

  const getUserByID = (uID) => {
    return users.find((item) => item.id === uID);
  };

  useEffect(() => {
    if (userId) {
      fetchList(userId).then((data) => {
        dispatch(setList(data));
        dispatch(setIsLoading(false));
      });
    }
  }, [userId]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return {
    users,
    state: useSelector(state),
    list: useSelector(list),
    filters: useSelector(filters),
    setFilters: (obj) => dispatch(setFilters(obj)),
    isLoading: useSelector(isLoading),
    setList: (obj) => dispatch(setList(obj)),
    deleteItem,
    addItem,
    setItem,
    getUserByID,
  };
}
export default usePresenter;
