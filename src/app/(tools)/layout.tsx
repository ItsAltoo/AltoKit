import Background from "@/components/Background";
import Header from "@/components/Header";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative">
      <Background>
        <Header />
        {children}
      </Background>
    </div>
  );
};

export default layout;
