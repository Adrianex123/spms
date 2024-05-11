"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isClick, setisClick] = useState(false);
  const togglenav = (): void => {
    setisClick(!isClick);
  };
  return (
    <main className="w-screen h-screen bg-cover bg-no-repeat flex  ">Home</main>
  );
}
