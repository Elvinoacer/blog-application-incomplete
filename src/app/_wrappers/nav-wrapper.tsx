"use client";

import { Navbar } from "@/components/home/header/navbar";
import { usePathname } from "next/navigation";

export function NavbarWrapper() {
  const pathName = usePathname();
  if (pathName.startsWith("/dashboard")) {
    console.log("Hurray");
    return null;
  } else {
    return <Navbar />;
  }
}
