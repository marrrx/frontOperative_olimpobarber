import React from "react";
import { Outlet } from "react-router-dom";
import { FooterComponent } from "../general/components/FooterComponent";
import { NavComponent } from "../general/components/NavComponent";

export const Layout = () => {
  return (
    <div className="layout-container">
      <NavComponent />
      <main className="layout-content">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
};
