"use client";
import { notFound } from "next/navigation";
import authors from "@/data/authors.json";
import { motion } from "framer-motion";
import { Author, getAuthor, getAuthorPosts, Post } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 5;

export default function AuthorPage({ params }: { params: { id: string } }) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      setAuthor(authors[0]);
      const allPosts = await getAuthorPosts("123");
      setPosts(allPosts);
      setTotalPages(Math.ceil(allPosts.length / POSTS_PER_PAGE));
    }
    fetchData();
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
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
  const dividerColor = !mounted
    ? "text-gray-300"
    : theme === "dark"
    ? "text-gray-600"
    : "text-gray-300";

  return (
    <div className={`min-h-screen ${bgColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${cardBgColor} shadow rounded-lg overflow-hidden`}
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <img
                  className="h-24 w-24 rounded-full"
                  src={author?.avatar}
                  alt={author?.name}
                />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${textColor}`}>
                  {author?.name}
                </h1>
                <p className={`mt-1 text-lg ${textSecondaryColor}`}>
                  {author?.role}
                </p>
                <div className="mt-3 flex space-x-4">
                  {author?.socialLinks?.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className={`${textSecondaryColor} hover:text-indigo-500`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{link.name}</span>
                      <i className={`fab fa-${link.icon} text-xl`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className={`text-xl font-semibold ${textColor}`}>About</h2>
              <div className={`mt-4 prose ${cardTextColor}`}>
                <p>{author?.bio}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className={`text-2xl font-bold ${textColor} mb-6`}>
            Articles by {author?.name}
          </h2>
          <div className="space-y-6">
            {paginatedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className={`${cardBgColor} shadow rounded-lg overflow-hidden`}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold ${textColor}`}>
                      {post.title}
                    </h3>
                    <p className={`mt-2 ${cardTextColor} line-clamp-2`}>
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className={`text-sm ${textSecondaryColor}`}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className={`mx-2 ${dividerColor}`}>•</span>
                      <span className={`text-sm ${textSecondaryColor}`}>
                        {post.readingTime} min read
                      </span>
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
        </motion.div>
      </div>
    </div>
  );
}
