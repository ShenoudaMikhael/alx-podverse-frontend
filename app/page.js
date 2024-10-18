'use client';
import LoginForm from "@/components/LoginForm";
import { clashDisplay } from "./fonts/fonts";
import { ModeToggle } from "@/components/ThemeToggleButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/api/endpoints";
import { Suspense } from "react";
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
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
    <>
      <ShaderGradientCanvas
        importedfiber={{ ...fiber, ...drei, ...reactSpring }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = 'none';  // Disable interactions
        }}
        style={{ width: '100%', height: '100vh', position: 'relative' }}
      >
        <ShaderGradient
          animate="on"
          brightness={1}
          cAzimuthAngle={180}
          cDistance={4}
          cPolarAngle={80}
          cameraZoom={9.1}
          color1={shaderColors.color1}
          color2={shaderColors.color2}
          color3={shaderColors.color3}
          envPreset="city"
          frameRate={10}
          grain="off"
          lightType="env"
          positionX={0}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1.5}
          uFrequency={0}
          uSpeed={0.2}
          uStrength={1.7}
          uTime={8}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
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
    </>
  );
}
