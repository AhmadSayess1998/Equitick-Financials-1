import React from "react";
import Nav from "../components/shared/Nav";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
function Dashboard(props) {
  return (
    <div className="dashboard">
      <Nav />
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
