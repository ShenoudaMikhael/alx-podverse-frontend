'use client';
import LoginForm from "@/components/LoginForm";
import { clashDisplay } from "./fonts/fonts";
import { ModeToggle } from "@/components/ThemeToggleButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/endpoints";
import { Suspense } from "react";
import { useTheme } from "next-themes";


export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [shaderColors, setShaderColors] = useState({
    color1: "#020617",
    color2: "#f8fafc",
    color3: "#1e293b",
  });

  useEffect(() => {
    //check if logged in.
    API.isLoggedIn().then(result => {
      if (result.ok) {
        router.push('/homepage');
      }
    })
  }, [router]);

  useEffect(() => {
    if (theme.theme === 'light') {
      setShaderColors({
        color1: "#e2e8f0",
        color2: "#cbd5e1",
        color3: "#64748b",
      });
    } else if (theme.theme === 'dark') {
      setShaderColors({
        color1: "#020617",
        color2: "#0f172a",
        color3: "#1e293b",
      });
    }
  }, [theme.theme]);


  return (
    <div className="w-screen min-h-screen h-auto flex absolute top-0 ">
      <div className=" p-10 hidden w-[50%] lg:flex gap-6 flex-col items-center justify-center">
        <h1 className={`${clashDisplay.className} xl:text-8xl md:text-7xl font-bold`}>
          PODVERSE
        </h1>
        <h2 className="xl:text-2xl md:text-lg font-bold">
          AN INTERACTIVE EXPERIENCE FOR ALL!
        </h2>
      </div>
      <div className="p-10 w-full lg:w-[50%] flex gap-5 flex-col justify-center items-center">
        <ModeToggle /> {/* to toggle between light and dark */}
        <h1 className={`lg:hidden text-4xl font-bold ${clashDisplay.className}`}>
          Welcome to Podverse
        </h1>
        <Suspense fallback="Loading...">
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
