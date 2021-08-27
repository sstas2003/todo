import React from "react";
import "./style.scss";
import usePresenter from "./usePresenter";

function LoginForm() {
  let { state, setState, authNHandler } = usePresenter();

  return (
    <div className={"login-wrapper"}>
      <input
        type="text"
        value={state.email}
        placeholder={"Login"}
        onChange={(e) => {
          setState((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <input
        type="password"
        placeholder={"Password"}
        value={state.password}
        onChange={(e) => {
          setState((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <button
        onClick={() => {
          authNHandler(state).then();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;
