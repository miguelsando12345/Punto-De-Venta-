import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="mt-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
