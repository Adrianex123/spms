"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { links } from "./link";
import IconLogo from "@/images/logo-icon.png";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="hidden border-r md:block bg-blue-900 sticky top-0 left-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-slate-500 px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-white text-lg"
          >
            <Image src={IconLogo} alt="Logo" className="h-6 w-6 font-bold" />
            <span className="">NORSU SPMS</span>
          </Link>
          <Button
            size="icon"
            className="ml-auto h-8 w-8 bg-blue-900 hover:bg-white group border border-white"
          >
            <Bell className="h-4 w-4 group-hover:text-black" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-2xl font-bold transition-all hover:text-primary"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
