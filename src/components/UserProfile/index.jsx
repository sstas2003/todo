import React from "react";
import "./style.scss";
import usePresenter from "./usePresenter";

function UserProfile() {
  let { user } = usePresenter();
  return (
    <div className="user-profile">
      <div className={"profile-avatar"}>
        <img src={`${window.location.origin}${user.avatar}`} alt="avatar" />
      </div>
      <div className={"profile-detail"}>
        <div className={"profile-detail-input"}>
          <b>Name:</b> {user.name}
        </div>
        <div className={"profile-detail-input"}>
          <b>First name:</b> {user.firstName}
        </div>
        <div className={"profile-detail-input"}>
          <b>Email:</b> {user.email}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
