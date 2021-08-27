import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/appReducer/actions";
import { getUser } from "../../store/appReducer/selectors";

function UserPanel() {
  let user = useSelector(getUser);
  let dispatch = useDispatch();
  let logoutAction = (data) => dispatch(logout(data));
  return (
    <div className="user-panel">
      <div className={"name"}>{user.name}</div>
      <div className={"avatar-wrapper"}>
        <img
          className={"avatar-img"}
          src={`${window.location.origin}${user.avatar}`}
          alt="user-avatar"
        />
      </div>
      <button
        className={"logout"}
        onClick={() => {
          logoutAction();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserPanel;
