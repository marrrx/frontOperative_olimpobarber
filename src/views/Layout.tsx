import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FooterComponent } from "../general/components/FooterComponent";
import { NavComponent } from "../general/components/NavComponent";

export const Layout = () => {
  return (
    <div className="layout-container">
      <NavComponent />
      <main className="layout-content">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};
