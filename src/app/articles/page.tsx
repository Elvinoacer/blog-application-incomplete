import { AllArticlesPage } from "@/components/articles/all-articles-page";
import ArticleSearchInput from "@/components/articles/article-search-input";
import FeaturedArticleCard from "@/components/home/featured-article-card";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Link from "next/link";

// Define the type for the autoblog data
interface Autoblog {
  id: string;
  topic: string;
  images: { url: string; description: string }[];
  createdAt: string;
  updatedAt: string;
}

// Async component to fetch and render all autoblogs
async function AutoblogsSection() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/autoblogs`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch autoblogs");
      return (
        <p className="text-center text-red-500">Failed to load articles.</p>
      );
    }

    const autoblogs: Autoblog[] = await res.json();

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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

type SearchPageProps = {
  searchParams: { search?: string; page?: string };
};

const ITEMS_PER_PAGE = 3; // Number of items per page

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams.search) || "";
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Articles
          </h1>
          {/* Search Bar */}
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
        </div>

        {/* Autoblogs Section */}
        <section className="mb-16">
          <Suspense fallback={<AllArticlesPageSkeleton />}>
            <AutoblogsSection />
          </Suspense>
        </section>

        {/* All article page  */}
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          All Articles
        </h2>
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>
        {/* <AllArticlesPageSkeleton/> */}
        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {/* Prev Button */}
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {/* Next Button */}
          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default page;

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg " />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}