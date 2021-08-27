import { useDispatch, useSelector } from "react-redux";
import { getState, getUser } from "../../store/appReducer/selectors";
import { tokenCheck } from "../../requests/rest/auth";
import { isAuth, setUser } from "../../store/appReducer/actions";
import { useEffect } from "react";

function usePresenter(props) {
  let state = useSelector(getState);
  let user = useSelector(getUser);
  let dispatch = useDispatch();
  let setIsAuthAction = (data) => dispatch(isAuth(data));
  let setUserAction = (data) => dispatch(setUser(data));

  const checkTokenHandler = async (token) => {
    return await tokenCheck(token);
  };

  useEffect(() => {
    checkTokenHandler(user.token)
      .then((data) => {
        setUserAction(data);
        setIsAuthAction(true);
      })
      .catch((data) => {
        setIsAuthAction(false);
      });
  }, []);

  return {
    state,
    user,
  };
}
export default usePresenter;
