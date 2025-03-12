import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen  w-full border-black bg-gray-800 ">
      <Header />
      <div className="flex-1 w-full  h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
