"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiMessageSquare,
  FiTrash2,
  FiCheck,
  FiX,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

type Comment = {
  id: string;
  articleTitle: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  date: string;
  status: "approved" | "pending" | "spam";
  likes: number;
  replies: number;
};

export default function AuthorComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending" | "spam"
  >("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading comments data
    const timer = setTimeout(() => {
      const mockComments: Comment[] = [
        {
          id: "1",
          articleTitle: "Getting Started with Next.js",
          authorName: "Alex Johnson",
          authorAvatar:
            "https://images.unsplash.com/photo-1734792314923-83195abb4911?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content:
            "Great article! Really helped me understand the basics of Next.js routing.",
          date: "2023-05-15T14:30:00Z",
          status: "approved",
          likes: 5,
          replies: 2,
        },
        {
          id: "2",
          articleTitle: "Advanced TypeScript Patterns",
          authorName: "Sam Wilson",
          authorAvatar:
            "https://images.unsplash.com/photo-1739829349986-e597cccdd791?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content:
            "I have a question about the decorator pattern implementation. Could you elaborate more on this part?",
          date: "2023-05-14T09:15:00Z",
          status: "pending",
          likes: 3,
          replies: 0,
        },
        {
          id: "3",
          articleTitle: "CSS Grid vs Flexbox",
          authorName: "Taylor Smith",
          authorAvatar:
            "https://images.unsplash.com/photo-1743013193065-e19d8112b15e?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content: "This is spam content with promotional links.",
          date: "2023-05-13T18:45:00Z",
          status: "spam",
          likes: 0,
          replies: 0,
        },
        {
          id: "4",
          articleTitle: "React Hooks Deep Dive",
          authorName: "Jordan Lee",
          authorAvatar:
            "https://images.unsplash.com/photo-1741687969502-4c406092f7de?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content:
            "The useEffect examples were particularly helpful. Thanks for putting this together!",
          date: "2023-05-12T11:20:00Z",
          status: "approved",
          likes: 8,
          replies: 1,
        },
        {
          id: "5",
          articleTitle: "State Management in 2023",
          authorName: "Casey Brown",
          authorAvatar:
            "https://images.unsplash.com/photo-1742974028118-4ece3027eef0?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content:
            "What are your thoughts on the new Zustand library compared to Redux?",
          date: "2023-05-10T16:10:00Z",
          status: "pending",
          likes: 2,
          replies: 0,
        },
        {
          id: "6",
          articleTitle: "State Management in 2023",
          authorName: "Casey Brown",
          authorAvatar:
            "https://images.unsplash.com/photo-1742974028118-4ece3027eef0?ixid=M3w2NjYxMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY0NjU2MDJ8&ixlib=rb-4.0.3",
          content:
            "What are your thoughts on the new Zustand library compared to Redux?",
          date: "2023-05-10T16:10:00Z",
          status: "pending",
          likes: 2,
          replies: 0,
        },
      ];
      setComments(mockComments);
      setFilteredComments(mockComments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...comments];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((comment) => comment.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (comment) =>
          comment.content.toLowerCase().includes(query) ||
          comment.authorName.toLowerCase().includes(query) ||
          comment.articleTitle.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setFilteredComments(result);
  }, [comments, statusFilter, searchQuery, sortBy]);

  const handleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, status: "approved" } : comment
      )
    );
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const toggleExpand = (id: string) => {
    setExpandedComment((prev) => (prev === id ? null : id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "spam":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <FiMessageSquare className="mr-2" /> Comments
          </h1>
          <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredComments.length} of {comments.length} comments
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search comments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="spam">Spam</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No comments found matching your criteria.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredComments.map((comment) => (
                  <motion.li
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900 dark:text-white truncate">
                                {comment.authorName}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                  comment.status
                                )}`}
                              >
                                {comment.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              on{" "}
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {comment.articleTitle}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => toggleExpand(comment.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {expandedComment === comment.id ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            )}
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedComment === comment.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pl-13"
                          >
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                              <p>{comment.content}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="flex items-center text-gray-500 dark:text-gray-400">
                                  <FiMessageSquare className="mr-1" />{" "}
                                  {comment.replies} replies
                                </span>
                                <span className="flex items-center text-gray-500 dark:text-gray-400">
                                  ♡ {comment.likes} likes
                                </span>
                              </div>

                              <div className="flex space-x-2">
                                {comment.status !== "approved" && (
                                  <button
                                    onClick={() => handleApprove(comment.id)}
                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors flex items-center"
                                  >
                                    <FiCheck className="mr-1" /> Approve
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(comment.id)}
                                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors flex items-center"
                                >
                                  <FiTrash2 className="mr-1" /> Delete
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
