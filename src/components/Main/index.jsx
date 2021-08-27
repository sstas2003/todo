import React from "react";
import PageContainer from "../PageContainer";
import Sidebar from "../Sidebar";
import "./style.scss";

function Main(props) {
  return (
    <main className="main">
      <Sidebar />
      <PageContainer />
    </main>
  );
}

export default Main;
