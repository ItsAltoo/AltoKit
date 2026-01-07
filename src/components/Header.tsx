"use client";
import { Button } from "./ui/button";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="lg:absolute top-0 left-0 w-full flex justify-between lg:p-4 z-10">
      <Button
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        variant="outline"
        className="m-4 rounded-full cursor-pointer"
        size={"icon-lg"}
      >
        <ArrowLeft />
      </Button>

      <Button
        onClick={() => router.push("/")}
        variant="outline"
        className="m-4 rounded-full cursor-pointer"
        size={"icon-lg"}
      >
        <HomeIcon />
      </Button>
    </div>
  );
};

export default Header;
