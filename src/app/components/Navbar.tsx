"use client";

import Image from "next/image";
import { Bars3Icon, LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Drawer from "./Drawer";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="h-16 p-4 flex bg-paper text-primary mb-4">
        <div className="flex items-center md:hidden">
          <Bars3Icon className="h-6 w-6 cursor-pointer" onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
        </div>
        <div className="flex flex-1 items-center justify-center space-x-8">
          <div className="hidden md:flex flex-row space-x-8">
            <div className="text-md">DASHBOARD</div>
          </div>
          <div className="!ml-0 md:!ml-8">
            <Image src="/favicon.png" alt="Saigyou Ayakash" width={60} height={60} />
          </div>
          <div className="hidden md:flex flex-row space-x-8">
            <div className="text-md">COLLECTION</div>
            <div className="text-md">WISHLIST</div>
          </div>
        </div>
        <div className="flex items-center">
          <LockClosedIcon className="h-6 w-6 cursor-pointer" />
        </div>
      </nav>
      {isDrawerOpen && <Drawer onClose={() => setIsDrawerOpen(false)} />}
    </>
  );
}
