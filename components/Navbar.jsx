"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Radio, Menu, X } from "lucide-react";
import { clashDisplay } from "@/app/fonts/fonts";
import { ModeToggle } from "./ThemeToggleButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API, { domain } from "@/api/endpoints";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const [hideGoliveButton, setHideGoliveButton] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://avatar.iran.liara.run/public"
  );
  useEffect(() => {
    API.getAllPodcasts().then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          API.getProfile().then((res) => {
            if (res.ok) {
              res.json().then((profile) => {
                if (profile.profilePic)
                  setProfilePic(`${domain}/${profile.profilePic}`);
                for (const podcast of data.podcasts) {
                  if (
                    profile.id === podcast.user.id &&
                    podcast.is_live === true
                  ) {
                    setHideGoliveButton(true);
                  }
                }
              });
            }
          });
        });
      }
    });
  }, []);

  const router = useRouter();

  const signOut = () => {
    Cookies.remove("token");
    router.push("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  //   Avatar Icon Menu
  const userAvatar = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              className="w-full h-full object-cover"
              src={profilePic}
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={() => signOut()} variant="ghost">
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="px-4 md:px-10 h-14 flex items-center justify-between">
      {/* LOGO */}
      <Link className="flex items-center justify-center" href="/homepage">
        <span className={`${clashDisplay.className} text-2xl font-black`}>
          P
        </span>
        <Radio className="h-7 w-7" />
        <span className={`${clashDisplay.className} text-2xl font-black`}>
          dverse
        </span>
      </Link>

      {/* NAV ITEMS */}
      <nav className="hidden md:flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/homepage"
        >
          Home
        </Link>
        <Link
          className={hideGoliveButton ? "hidden" : ""}
          href="/create-podcast"
        >
          <Button>Go Live</Button>
        </Link>
        {userAvatar}
        <ModeToggle />
      </nav>

      {/* HAMBURGER MENU */}
      <div className="md:hidden flex items-center">
        <Link href="/create-podcast">
          <Button size="sm">Go Live</Button>
        </Link>
        {userAvatar}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-background border-b border-border z-50 md:hidden">
          <nav className="flex flex-col p-4">
            <Link
              className="text-sm font-medium py-2 hover:underline underline-offset-4"
              href="/homepage"
            >
              Home
            </Link>
            <div className="py-2">
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
