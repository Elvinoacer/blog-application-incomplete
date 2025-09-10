"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-indigo-950 md:min-h-[90vh]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl animate-pulse-slow md:h-[500px] md:w-[500px]" />
        <div className="absolute right-1/4 bottom-0 h-[250px] w-[250px] rounded-full bg-gradient-to-l from-purple-600/15 to-blue-600/15 blur-3xl animate-pulse-slow md:h-[400px] md:w-[400px]" />
      </div>

      {/* Floating particles */}
      {isMounted && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-16 md:flex-row md:py-24 lg:py-32">
        {/* Content */}
        <div className="z-10 flex-1 space-y-6 text-center md:space-y-8 md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Explore the World Through
              <span className="block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Words
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl lg:mx-0">
              Discover insightful articles, thought-provoking stories, and
              expert perspectives on technology, lifestyle, and innovation.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button
              size="lg"
              className="rounded-full px-8 py-5 text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              Start Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 dark:text-white"
            >
              Explore Topics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 text-white md:max-w-md md:pt-8">
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                1K+
              </div>
              <div className="text-xs text-gray-400 sm:text-sm">
                Published Articles
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                50+
              </div>
              <div className="text-xs text-gray-400 sm:text-sm">
                Expert Writers
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                10M+
              </div>
              <div className="text-xs text-gray-400 sm:text-sm">
                Monthly Readers
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 mt-12 flex-1 md:mt-0">
          <div
            className={cn(
              "relative mx-auto h-64 w-64 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent",
              "border border-primary/20 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/10",
              "transition-transform duration-700 hover:scale-105",
              "sm:h-80 sm:w-80 md:h-96 md:w-96"
            )}
          >
            <Image
              src={
                "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Illustration for the blog"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform md:bottom-8">
        <div className="h-8 w-8 animate-bounce rounded-full border-2 border-white/50 flex items-center justify-center">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(3deg);
          }
          66% {
            transform: translateY(10px) rotate(-3deg);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
export default HeroSection;
