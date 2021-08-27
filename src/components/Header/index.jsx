import React from "react";
import "./style.scss";
import usePresenter from "./usePresenter";
import UserPanel from "../UserPanel";

function Header() {
  let { state } = usePresenter();
  return (
    <header className="header">
      <div className={"center"}>{state.title}</div>
      <div className={"right"}>
        <UserPanel />
      </div>
    </header>
  );
}

export default Header;
