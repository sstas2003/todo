import React from "react";
import "./style.scss";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import usePresenter from "./usePresenter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  let { state } = usePresenter();
  return (
    <Router>
      <div className="app">{state.isAuth ? <MainPage /> : <LoginPage />}</div>
    </Router>
  );
}

export default App;
