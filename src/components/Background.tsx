"use client";
import React, { useEffect, useState } from "react";

const imageDatas = [
  "/bg/1.webp",
  "/bg/2.webp",
  "/bg/3.webp",
  "/bg/4.webp",
  "/bg/5.webp",
  "/bg/6.webp",
  "/bg/7.webp",
  "/bg/8.webp",
  "/bg/9.webp",
  "/bg/10.webp",
];

const Background = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageDatas.length);
    setBackgroundImage(`url(${imageDatas[randomIndex]})`);
  }, []);

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
      }}
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
