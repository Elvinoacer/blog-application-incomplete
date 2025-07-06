"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  DollarSign,
  HelpCircle,
  Mail,
  MessageSquare,
  Mic,
} from "lucide-react";
import Link from "next/link";

export default function HelpCenter() {
  const resourceCategories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="w-5 h-5" />,
      items: [
        {
          title: "Author Onboarding Guide",
          description: "Step-by-step guide to setting up your author account",
          link: "/help/getting-started",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Platform Overview",
          description: "Tour of all features and tools available",
          link: "/help/platform-tour",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Best Practices",
          description: "Tips for success on our platform",
          link: "/help/best-practices",
          icon: <ChevronRight className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Content Creation",
      icon: <Mic className="w-5 h-5" />,
      items: [
        {
          title: "Writing Guidelines",
          description: "Style guide and content requirements for articles",
          link: "/help/writing-guide",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Podcast Production",
          description: "How to create great podcast content",
          link: "/help/podcast-guide",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Video Content",
          description: "Creating engaging video content",
          link: "/help/video-guide",
          icon: <ChevronRight className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Monetization",
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        {
          title: "Earnings Explained",
          description: "How you make money on our platform",
          link: "/help/earnings",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Payment Setup",
          description: "How to configure your payment methods",
          link: "/help/payments",
          icon: <ChevronRight className="w-4 h-4" />,
        },
        {
          title: "Growth Strategies",
          description: "Tips to maximize your earnings",
          link: "/help/growth-strategies",
          icon: <ChevronRight className="w-4 h-4" />,
        },
      ],
    },
  ];

  const supportOptions = [
    {
      title: "Help Articles",
      description: "Browse our comprehensive knowledge base",
      icon: <BookOpen className="w-6 h-6" />,
      link: "/help-center/articles",
      linkText: "View Articles",
    },
    {
      title: "FAQ Center",
      description: "Find answers to common questions",
      icon: <HelpCircle className="w-6 h-6" />,
      link: "/faq",
      linkText: "Visit FAQs",
    },
    {
      title: "Community Forum",
      description: "Get help from other authors",
      icon: <MessageSquare className="w-6 h-6" />,
      link: "/community",
      linkText: "Join Discussion",
    },
    {
      title: "Contact Support",
      description: "Reach our team directly",
      icon: <Mail className="w-6 h-6" />,
      link: "/contact",
      linkText: "Get in Touch",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to succeed as an author on our platform
          </p>
        </motion.section>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-14"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Quick Support Options */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            How can we help you today?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {option.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {option.description}
                </p>
                <Link
                  href={option.link}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {option.linkText} <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resource Categories */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Browse Help Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.link}
                      className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        {item.icon}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Still Need Help? */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Our support team is available to answer any questions you have about
            the platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/community"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium rounded-lg transition-colors"
            >
              Ask the Community
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
