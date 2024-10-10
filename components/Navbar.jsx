"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Radio, Menu, X, User } from "lucide-react";
import { clashDisplay } from "@/app/fonts/fonts";
import { ModeToggle } from "./ThemeToggleButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  //   Avatar Icon Menu
  const userAvatar = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
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
        <Link href="/create-podcast">
          <Button>Go Live</Button>
        </Link>
        {userAvatar}
        <ModeToggle />
      </nav>

      {/* HAMBURGER MENU */}
      <div className="md:hidden flex items-center">
        <Link href="/live">
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
