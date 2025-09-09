"use client";

import { useState, useEffect } from "react";
import FeaturedArticleCard from "@/components/home/featured-article-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define the type for the autoblog data
interface Autoblog {
  id: string;
  topic: string;
  images: { url: string; description: string }[];
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 3;

export function AutoblogsSection() {
  const [autoblogs, setAutoblogs] = useState<Autoblog[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAutoblogs = async () => {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const take = ITEMS_PER_PAGE;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/autoblogs?skip=${skip}&take=${take}`
      );
      const data = await res.json();
      setAutoblogs(data.autoblogs);
      setTotal(data.total);
    };
    fetchAutoblogs();
  }, [currentPage]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="mb-16">
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
      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        {/* Prev Button */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Prev
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={`${currentPage === index + 1 ? "destructive" : "ghost"}`}
            size="sm"
            disabled={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next →
        </Button>
      </div>
    </section>
  );
}
