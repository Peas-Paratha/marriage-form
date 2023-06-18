import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div
      style={{
        maxWidth: "500px",
        padding: "20px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
