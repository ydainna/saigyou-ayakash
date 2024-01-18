"use client";

import Image from "next/image";
import { Bars3Icon, LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Drawer from "./Drawer";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="h-16 p-4 flex shadow-nav bg-paper text-primary mb-4 bg-opacity-75 backdrop-blur-sm sticky top-0">
        <div className="flex items-center md:hidden">
          <Bars3Icon className="h-6 w-6 cursor-pointer" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
        </div>
        <div className="flex flex-1 items-center justify-center space-x-8">
          <div className="hidden md:flex flex-row space-x-8">
            <button className="relative justify-center items-center text-md hover:bg-hover-nav-button px-1.5 py-2 rounded">Dashboard</button>
          </div>
          <div className="!ml-0 md:!ml-8">
            <Image src="/favicon.png" alt="Saigyou Ayakash" width={60} height={60} />
          </div>
          <div className="hidden md:flex flex-row space-x-8">
            <button className="relative justify-center items-center text-md hover:bg-hover-nav-button px-1.5 py-2 rounded">Collection</button>
            <button className="relative justify-center items-center text-md hover:bg-hover-nav-button px-1.5 py-2 rounded">Wishlist</button>
          </div>
        </div>
        <button className="flex items-center hover:bg-hover-nav-button px-1.5 py-2 rounded">
          <LockClosedIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </nav>
      {isDrawerOpen && <Drawer onClose={() => setIsDrawerOpen(false)} />}
    </>
  );
}
