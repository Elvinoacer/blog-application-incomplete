"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Author, getAuthors } from "@/lib/api";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 9;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      const allAuthors = await getAuthors();
      setAuthors(allAuthors);
      setTotalPages(Math.ceil(allAuthors.length / ITEMS_PER_PAGE));
    }
    fetchData();
  }, []);

  const paginatedAuthors = authors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Theme-aware colors with fallback for SSR
  const bgColor = !mounted
    ? "bg-gray-50"
    : theme === "dark"
    ? "bg-gray-900"
    : "bg-gray-50";
  const textColor = !mounted
    ? "text-gray-900"
    : theme === "dark"
    ? "text-gray-100"
    : "text-gray-900";
  const textSecondaryColor = !mounted
    ? "text-gray-500"
    : theme === "dark"
    ? "text-gray-400"
    : "text-gray-500";
  const cardBgColor = !mounted
    ? "bg-white"
    : theme === "dark"
    ? "bg-gray-800"
    : "bg-white";
  const cardTextColor = !mounted
    ? "text-gray-600"
    : theme === "dark"
    ? "text-gray-300"
    : "text-gray-600";
  const tagBgColor = !mounted
    ? "bg-indigo-100"
    : theme === "dark"
    ? "bg-indigo-900"
    : "bg-indigo-100";
  const tagTextColor = !mounted
    ? "text-indigo-800"
    : theme === "dark"
    ? "text-indigo-200"
    : "text-indigo-800";

  return (
    <div className={`min-h-screen ${bgColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl font-extrabold ${textColor} sm:text-5xl sm:tracking-tight lg:text-6xl`}
          >
            Our Authors
          </h1>
          <p className={`mt-5 max-w-xl mx-auto text-xl ${textSecondaryColor}`}>
            Meet the talented writers behind our content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedAuthors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${cardBgColor} overflow-hidden shadow rounded-lg`}
            >
              <Link href={`/authors/${author.id}`}>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={author.avatar}
                        alt={author.name}
                      />
                    </div>
                    <div className="ml-4">
                      <h3
                        className={`text-lg leading-6 font-medium ${textColor}`}
                      >
                        {author.name}
                      </h3>
                      <p className={`text-sm ${textSecondaryColor}`}>
                        {author.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className={`text-sm ${cardTextColor} line-clamp-3`}>
                      {author.bio}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {author.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tagBgColor} ${tagTextColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className={`text-sm ${textColor}`}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
