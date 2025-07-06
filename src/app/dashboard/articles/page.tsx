"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiFileText,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiHeart,
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
} from "react-icons/fi";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft" | "archived";
  publishedDate: string;
  lastUpdated: string;
  views: number;
  likes: number;
  bookmarks: number;
  comments: number;
  readingTime: string;
  category: string;
};

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft" | "archived"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const { theme } = useTheme();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const itemsPerPage = mobileView ? 4 : 8;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Simulate loading articles data
    const timer = setTimeout(() => {
      const mockArticles: Article[] = Array.from({ length: 24 }, (_, i) => ({
        id: `art-${i + 1}`,
        title: `Article ${i + 1}: ${
          [
            "Getting Started with Next.js",
            "Advanced TypeScript Patterns",
            "CSS Grid vs Flexbox",
            "React Hooks Deep Dive",
            "State Management in 2023",
            "The Complete Guide to Authentication",
            "Performance Optimization Techniques",
            "Deploying to Vercel",
          ][i % 8]
        }`,
        author: ["Jane Doe", "John Smith", "Alex Johnson", "Sam Wilson"][i % 4],
        status: ["published", "draft", "archived"][i % 3] as any,
        publishedDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        lastUpdated: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 500),
        bookmarks: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 50),
        readingTime: `${Math.floor(Math.random() * 10) + 3} min read`,
        category: [
          "Technology",
          "Programming",
          "Web Dev",
          "JavaScript",
          "React",
        ][i % 5],
      }));
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...articles];

    // Apply filters and sorting
    if (statusFilter !== "all")
      result = result.filter((article) => article.status === statusFilter);
    if (categoryFilter !== "all")
      result = result.filter((article) => article.category === categoryFilter);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.publishedDate).getTime() -
          new Date(b.publishedDate).getTime()
        );
      return (
        b.views +
        b.likes * 10 +
        b.comments * 5 -
        (a.views + a.likes * 10 + a.comments * 5)
      );
    });

    setFilteredArticles(result);
    setCurrentPage(1);
  }, [articles, statusFilter, categoryFilter, searchQuery, sortBy]);

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "archived":
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
      default:
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <FiFileText className="mr-2" /> Articles
          </h1>
          <div className="mt-2 md:mt-0 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredArticles.length)} of{" "}
            {filteredArticles.length}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow-md p-3 md:p-4 mb-4 md:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="Web Dev">Web Dev</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <Link
              href={"/dashboard/articles/create"}
              className="px-3 py-2 text-center bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              + New Article
            </Link>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm md:shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No articles found matching your criteria.
            </div>
          ) : mobileView ? (
            /* Mobile Cards View */
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {paginatedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                          <FiFileText className="text-blue-500 dark:text-blue-300 text-sm" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {article.category} • {article.readingTime}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <FiMoreVertical />
                      </button>
                    </div>

                    <div className="mt-2 ml-11 flex flex-wrap gap-2 items-center text-xs">
                      <span
                        className={`px-1.5 py-0.5 rounded-full ${getStatusColor(
                          article.status
                        )}`}
                      >
                        {article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {article.author}
                      </span>
                    </div>

                    <div className="mt-2 ml-11 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <FiEye className="mr-1" /> {formatNumber(article.views)}
                      </span>
                      <span className="flex items-center">
                        <FiHeart className="mr-1" />{" "}
                        {formatNumber(article.likes)}
                      </span>
                      <span className="flex items-center">
                        <FiBookmark className="mr-1" />{" "}
                        {formatNumber(article.bookmarks)}
                      </span>
                    </div>

                    <div className="mt-2 ml-11 flex justify-between items-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <FiCalendar className="mr-1" />{" "}
                        {formatDate(article.publishedDate)}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 text-sm">
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Desktop Table View */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Published
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Stats
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence>
                    {paginatedArticles.map((article) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                              <FiFileText className="text-blue-500 dark:text-blue-300 text-sm" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                {article.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {article.category} • {article.readingTime}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {article.author}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Updated {formatDate(article.lastUpdated)}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              article.status
                            )}`}
                          >
                            {article.status.charAt(0).toUpperCase() +
                              article.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <FiCalendar className="mr-1" />{" "}
                            {formatDate(article.publishedDate)}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <FiEye className="mr-1" />{" "}
                              {formatNumber(article.views)}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <FiHeart className="mr-1" />{" "}
                              {formatNumber(article.likes)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-white dark:bg-gray-800 px-3 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredArticles.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredArticles.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-3 py-1.5 border text-xs sm:text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300"
                            : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
