import { AllArticlesPage } from "@/components/articles/all-articles-page";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

type SearchPageProps = {
  searchParams: { search?: string; page?: string };
};

const ITEMS_PER_PAGE = 6; // Increased items per page for better mobile layout

const getPaginationItems = (currentPage: number, totalPages: number) => {
  const pageNumbers: (number | string)[] = [];
  const maxVisiblePages = 5; // Max number of page buttons to show (excluding '...')

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      totalPages,
      currentPage + Math.floor(maxVisiblePages / 2)
    );

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }
  }
  return pageNumbers;
};

const Page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams.search) || "";
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12 space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Discover Articles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Explore our collection of insightful articles on various topics
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Suspense>
              <ArticleSearchInput />
            </Suspense>
          </div>
        </div>

        {/* Search results info */}
        {searchText && (
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              {total > 0 ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-foreground">{total}</span>
                  articles matching{" "}
                  <span className="font-semibold text-foreground">
                    "{searchText}"
                  </span>
                </>
              ) : (
                <>
                  No articles found for{" "}
                  <span className="font-semibold text-foreground">
                    "{searchText}"
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* All article page */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:mb-8">
            {searchText ? "Search Results" : "All Articles"}
          </h2>
          <Suspense fallback={<AllArticlesPageSkeleton />}>
            <AllArticlesPage articles={articles} />
          </Suspense>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total}{" "}
              articles
            </p>

            <div className="flex items-center gap-1">
              {/* Prev Button */}
              <Link
                href={`?search=${searchText}&page=${currentPage - 1}`}
                passHref
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  className="gap-1 rounded-full px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
              </Link>

              {/* Page Numbers - Show less on mobile */}
              <div className="hidden sm:flex items-center gap-1">
                {paginationItems.map((item, index) =>
                  typeof item === "number" ? (
                    <Link
                      key={item}
                      href={`?search=${searchText}&page=${item}`}
                      passHref
                    >
                      <Button
                        variant={currentPage === item ? "default" : "outline"}
                        size="sm"
                        className={`h-9 w-9 rounded-full p-0 ${
                          currentPage === item ? "font-bold" : ""
                        }`}
                      >
                        {item}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      key={`ellipsis-${index}`}
                      variant="outline"
                      size="sm"
                      disabled
                      className="h-9 w-9 rounded-full p-0"
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  )
                )}
              </div>

              {/* Mobile page indicator */}
              <div className="sm:hidden flex items-center gap-2 mx-2">
                <span className="text-sm font-medium">{currentPage}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{totalPages}</span>
              </div>

              {/* Next Button */}
              <Link
                href={`?search=${searchText}&page=${currentPage + 1}`}
                passHref
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  className="gap-1 rounded-full px-3"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Browse by category section */}
        {!searchText && (
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-semibold text-foreground sm:text-2xl">
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                "Technology",
                "Business",
                "Health",
                "Science",
                "Arts",
                "Sports",
              ].map((category) => (
                <Link
                  key={category}
                  href={`?search=${category}`}
                  className="block p-4 text-center rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <span className="text-sm font-medium">{category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg border-0 shadow-sm"
        >
          <div className="p-5 sm:p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 aspect-video w-full rounded-xl bg-gradient-to-br from-muted to-muted/70" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-5 w-4/5 rounded-md mb-3" />
            <Skeleton className="h-4 w-3/5 rounded-md mb-4" />

            {/* Article Category Skeleton */}
            <Skeleton className="mb-4 h-5 w-20 rounded-full" />

            {/* Article Excerpt Skeleton */}
            <div className="space-y-2 mb-5">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-4/5 rounded-md" />
              <Skeleton className="h-3 w-3/5 rounded-md" />
            </div>

            {/* Author & Metadata Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
