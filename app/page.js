import LoginForm from "@/components/LoginForm";
import { clashDisplay } from "./fonts/fonts";

const loginPage =
  <div className="w-screen h-screen flex ">
    <div className="p-10 hidden bg-[#D9D9D9] w-[50%] lg:flex gap-6 flex-col items-center justify-center">
      <h1 className={`${clashDisplay.className} text-5xl font-bold`}>
        Podverse
      </h1>
      <h2 className="text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </h2>
    </div>
    <div className="p-10 w-full lg:w-[50%] flex gap-5 flex-col justify-center items-center">
      <h1 className={`lg:hidden text-4xl font-bold ${clashDisplay.className}`}>
        Welcome to Podverse
      </h1>
      <LoginForm />
    </div>
  </div>;

export default function Home() {
  return (
    loginPage
  );
}
