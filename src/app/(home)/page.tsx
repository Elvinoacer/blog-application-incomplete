import HeroSection from "@/components/home/hero-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import FeaturedArticleCard from "@/components/home/featured-article-card";

// Define the type for the autoblog data
interface Autoblog {
  id: string;
  topic: string;
  images: { url: string; description: string }[];
  createdAt: string;
  updatedAt: string;
}

// Async component to fetch and render featured autoblogs
async function FeaturedAutoblogs() {
  try {
    // Fetch the 3 latest autoblogs
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/autoblogs?limit=3&${new Date().getTime()}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch autoblogs");
      return (
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-center text-red-500 px-4">
            Failed to load articles. Please try again later.
          </p>
        </div>
      );
    }

    const data = await res.json();
    const autoblogs: Autoblog[] = data.autoblogs;

    return (
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {autoblogs.map((blog) => (
          <FeaturedArticleCard
            key={blog.id}
            id={blog.id}
            topic={blog.topic}
            imageUrl={
              blog.images && blog.images.length > 0 ? blog.images[0].url : null
            }
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching autoblogs:", error);
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-center text-red-500 px-4">
          Error loading articles. Please try again later.
        </p>
      </div>
    );
  }
}

// Loading component for better user experience
function FeaturedArticlesLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 animate-pulse"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

const page = async () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <section className="relative py-12 md:py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
              Latest Content
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Featured Articles
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-4 md:text-xl">
              Discover our most popular and trending content across various
              topics
            </p>
          </div>

          {/* New Featured Autoblogs Section */}
          <Suspense fallback={<FeaturedArticlesLoading />}>
            <FeaturedAutoblogs />
          </Suspense>

          <div className="mt-12 md:mt-16 text-center">
            <Link href={"/articles"}>
              <Button
                variant="outline"
                className="rounded-full px-6 py-4 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-8 sm:py-5 sm:text-lg border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
