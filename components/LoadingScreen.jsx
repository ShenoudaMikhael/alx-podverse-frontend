import { clashDisplay } from "@/app/fonts/fonts";
import { Radio } from "lucide-react";
import React from "react";

const LoadingScreen = ({ text }) => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <Radio className="w-10 h-10 animate-spin" />
      <p className={`${clashDisplay.className} text-2xl}`}>{text}</p>
    </div>
  );
};

export default LoadingScreen;
