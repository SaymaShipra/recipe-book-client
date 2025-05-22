import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
