import { useDispatch, useSelector } from "react-redux";
import { getState } from "../../store/appReducer/selectors";
import { authN } from "../../requests/rest/auth";
import { useState } from "react";
import { login } from "../../store/appReducer/actions";

function usePresenter(props) {
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  let dispatch = useDispatch();
  let loginAction = (data) => dispatch(login(data));

  const authNHandler = async (data) => {
    loginAction(await authN(data.email, data.password));
  };
  return {
    state,
    setState,
    authNHandler,
  };
}
export default usePresenter;
