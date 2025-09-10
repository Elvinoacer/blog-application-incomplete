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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/autoblogs?limit=3&${new Date().getTime()}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch autoblogs");
      return (
        <p className="text-center text-red-500">Failed to load articles.</p>
      );
    }

    const data = await res.json();
    const autoblogs: Autoblog[] = data.autoblogs;

    return (
      <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
    return <p className="text-center text-red-500">Error loading articles.</p>;
  }
}

const page = async () => {
  return (
    <main>
      <HeroSection />
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Articles
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover our most popular and trending content
            </p>
          </div>

          {/* New Featured Autoblogs Section */}
          <Suspense
            fallback={<p className="text-center">Loading articles...</p>}
          >
            <FeaturedAutoblogs />
          </Suspense>

          <div className="mt-12 text-center">
            <Link href={"/articles"}>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
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
