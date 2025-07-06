"use client";

import { BlogFooter } from "@/components/home/blog-footer";
import { usePathname } from "next/navigation";

export function FooterWrapper() {
  const pathName = usePathname();
  if (pathName.startsWith("/dashboard") || pathName.startsWith("/analytics")) {
    console.log("Hurray");
    return null;
  } else {
    return <BlogFooter />;
  }
}
