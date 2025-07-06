"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../../dark-mode";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false);
    window.addEventListener("routechange", handleRouteChange);
    return () => window.removeEventListener("routechange", handleRouteChange);
  }, []);

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
          : "border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <motion.span
                className="text-xl sm:text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Theco
                </span>
                <span className="text-foreground">ntemporary</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {["articles", "tutorials", "about", "dashboard"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Link
                      href={`/${item}`}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Right Section - Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ModeToggle />
            </motion.div>

            <SignedIn>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <UserButton afterSignOutUrl="/" />
              </motion.div>
            </SignedIn>
            <SignedOut>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SignInButton>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </motion.div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-button md:hidden text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setIsMobileMenuOpen((prev) => !prev);
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-container md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="py-4 space-y-4 border-t">
                {/* Mobile Navigation Links */}
                <motion.div
                  className="space-y-2 px-4"
                  initial="hidden"
                  animate="visible"
                >
                  {["articles", "tutorials", "about", "dashboard"].map(
                    (item, i) => (
                      <motion.div
                        key={item}
                        custom={i}
                        variants={navItemVariants}
                      >
                        <Link
                          href={`/${item}`}
                          className="block px-3 py-2 text-base font-medium text-foreground rounded-lg hover:bg-accent transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Link>
                      </motion.div>
                    )
                  )}
                </motion.div>

                {/* Mobile Theme Toggle */}
                <motion.div
                  className="px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ModeToggle />
                </motion.div>

                {/* Mobile Auth Buttons */}
                <SignedOut>
                  <motion.div
                    className="px-4 flex flex-col gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <SignInButton>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign up
                      </Button>
                    </SignUpButton>
                  </motion.div>
                </SignedOut>
                <SignedIn>
                  <motion.div
                    className="px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <UserButton afterSignOutUrl="/" />
                  </motion.div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
