"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Clock, ArrowRight, Eye, Heart, Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// I am using any here because the articles prop can be either an article or an autoblog.
// This is not ideal, but it is the quickest way to get the code to compile.
export function AllArticlesPage({ articles }: { articles: any[] }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (articles.length === 0) return <NoSearchResults />;

  return (
    <div className="grid gap-6 sm:gap-8">
      {articles.map((result) => {
        if (result.type === "article") {
          return (
            <Card
              key={result.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 border-0 cursor-pointer"
              onMouseEnter={() => setHoveredCard(result.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.open(`/articles/${result.id}`, "_self")}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Container */}
                <div className="relative h-48 w-full md:w-64 md:h-auto overflow-hidden">
                  <Image
                    src={result.featuredImage as string}
                    alt={result.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {result.category}
                    </span>
                  </div>

                  {/* Read time */}
                  <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {result.readTime || "5 min read"}
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 p-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                    {result.category}
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {result.title}
                  </h3>

                  {/* Excerpt - if available */}
                  {result.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {result.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={result.author.imageUrl as string} />
                        <AvatarFallback className="text-xs">
                          {result.author.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {result.author.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(result.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Engagement stats */}
                    <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{result.views || "1.2k"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{result.likes || "243"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read more button - visible on hover */}
                  <div
                    className={`mt-4 flex items-center text-primary transition-opacity duration-300 ${
                      hoveredCard === result.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-sm font-medium">Read article</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Card>
          );
        } else if (result.type === "autoblog") {
          return (
            <Card
              key={result.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:bg-gray-800 border-0 cursor-pointer"
              onMouseEnter={() => setHoveredCard(result.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => window.open(`/autoblogs/${result.id}`, "_self")}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Container */}
                <div className="relative h-48 w-full md:w-64 md:h-auto overflow-hidden">
                  <Image
                    src={
                      ((result.images as any)[0]?.url as string) ||
                      "/placeholder-article.jpg"
                    }
                    alt={result.topic}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />

                  {/* Autoblog badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Autoblog
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 p-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-2">
                    Autoblog
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-blue-500 transition-colors mb-3 line-clamp-2">
                    {result.topic}
                  </h3>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>5 min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>1.5k views</span>
                    </div>
                  </div>

                  {/* Read more button - visible on hover */}
                  <div
                    className={`flex items-center text-blue-500 transition-opacity duration-300 ${
                      hoveredCard === result.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-sm font-medium">Read autoblog</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Card>
          );
        }
        return null;
      })}

      {/* Custom styles for line clamping */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-muted/30 border border-dashed">
      {/* Icon */}
      <div className="mb-5 rounded-full bg-muted p-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        We couldn't find any articles or autoblogs matching your search. Try a
        different keyword or browse our popular categories.
      </p>

      {/* Suggestions */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {["Technology", "Business", "Health", "Science"].map((category) => (
          <span
            key={category}
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => (window.location.href = `?search=${category}`)}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
