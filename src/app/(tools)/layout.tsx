import Header from "@/components/Header";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  );
};

export default layout;
