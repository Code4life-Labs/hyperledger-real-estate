// import React from "react";
import { Outlet } from "react-router-dom";

// Import from components
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";

/**
 * Use this functional component to render main layout
 * @returns 
 */
export default function MainLayout() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}