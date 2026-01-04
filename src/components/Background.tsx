"use client";
import React, { useEffect, useState } from "react";

const imageDatas = [
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/4.webp",
  "/5.webp",
  "/6.webp",
  "/7.webp",
  "/8.webp",
  "/9.webp",
  "/10.webp",
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
