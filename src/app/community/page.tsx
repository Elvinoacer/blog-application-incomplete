"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  BookOpen,
  Mic,
  Calendar,
  Search,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredDiscussions = [
    {
      title: "Best practices for engaging article introductions",
      author: "Sarah Johnson",
      replies: 24,
      category: "Writing Tips",
      pinned: true,
    },
    {
      title: "Microphone recommendations for podcast beginners",
      author: "Marcus Chen",
      replies: 18,
      category: "Podcasting",
      pinned: true,
    },
    {
      title: "How I increased my readership by 300% in 3 months",
      author: "Alex Rodriguez",
      replies: 42,
      category: "Growth",
      pinned: false,
    },
    {
      title: "Monthly earnings report - June 2024",
      author: "Priya Patel",
      replies: 15,
      category: "Monetization",
      pinned: false,
    },
  ];

  const upcomingEvents = [
    {
      title: "Live Q&A: Advanced SEO for Articles",
      date: "June 15, 2024",
      time: "2:00 PM EST",
      host: "SEO Expert Team",
    },
    {
      title: "Podcast Editing Workshop",
      date: "June 20, 2024",
      time: "4:00 PM EST",
      host: "Audio Production Team",
    },
    {
      title: "Author Success Stories Panel",
      date: "June 25, 2024",
      time: "1:00 PM EST",
      host: "Community Managers",
    },
  ];

  const topAuthors = [
    {
      name: "Jamal Williams",
      specialty: "Tech Tutorials",
      articles: 42,
      joined: "2 years ago",
    },
    {
      name: "Elena Petrova",
      specialty: "Business Insights",
      articles: 36,
      joined: "1 year ago",
    },
    {
      name: "David Kim",
      specialty: "Health & Wellness",
      articles: 28,
      joined: "8 months ago",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Author Community
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                Connect, collaborate, and grow with fellow content creators
              </p>
            </div>
            <Link
              href="/community/guidelines"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Community Guidelines <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Members
                </p>
                <p className="font-bold text-xl">4,821</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Discussions
                </p>
                <p className="font-bold text-xl">1,243</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Now
                </p>
                <p className="font-bold text-xl">387</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top Authors
                </p>
                <p className="font-bold text-xl">56</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1">
            {/* Search and Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search discussions, authors, or topics..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveTab("discussions")}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "discussions"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    Discussions
                  </button>
                  <button
                    onClick={() => setActiveTab("articles")}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "articles"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    Articles
                  </button>
                  <button
                    onClick={() => setActiveTab("podcasts")}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "podcasts"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    Podcasts
                  </button>
                  <button
                    onClick={() => setActiveTab("collab")}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "collab"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    Collaborations
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Discussions List */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Featured Discussions
              </h2>

              <div className="space-y-4 mb-8">
                {featuredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {discussion.pinned && (
                            <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs rounded">
                              Pinned
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded">
                            {discussion.category}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          By {discussion.author}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/community/discussions"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all discussions <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-80 space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Upcoming Events
              </h2>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <h3 className="font-medium mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hosted by {event.host}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/community/events"
                className="inline-flex items-center gap-1 mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View calendar <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Top Authors */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Top Authors
              </h2>

              <div className="space-y-4">
                {topAuthors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{author.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {author.specialty} • {author.articles} articles
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/community/authors"
                className="inline-flex items-center gap-1 mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View all authors <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Start Discussion CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
            >
              <h3 className="font-semibold mb-3">Start a Discussion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ask questions, share tips, or collaborate with other authors
              </p>
              <Link
                href="/community/new"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                New Discussion <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
