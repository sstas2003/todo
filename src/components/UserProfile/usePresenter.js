import { useSelector } from "react-redux";

import { getUser } from "../../store/appReducer/selectors";

function usePresenter() {
  let user = useSelector(getUser);
  return {
    user,
  };
}
export default usePresenter;
