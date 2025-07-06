"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Mic,
  Settings,
  BarChart2,
  HelpCircle,
  DollarSign,
} from "lucide-react";

export default function DashboardWelcome() {
  const quickActions = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Write Article",
      href: "/dashboard/new-article",
    },
    {
      icon: <Mic className="w-5 h-5" />,
      title: "Record Podcast",
      href: "/dashboard/new-podcast",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Profile Settings",
      href: "/dashboard/settings",
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: "View Analytics",
      href: "/dashboard/analytics",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Get Help",
      href: "/support",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome to Your Author Dashboard!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Here's where you'll create content, track your earnings, and grow
            your audience.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-4 transition-colors"
              >
                <Link
                  href={action.href}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                    {action.icon}
                  </div>
                  <span className="font-medium text-sm">{action.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="font-bold mb-4">Getting Started Guide</h2>
            <div className="space-y-4">
              <Link
                href="/guide/writing"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <BookOpen className="w-4 h-4" /> Writing your first article
              </Link>
              <Link
                href="/guide/podcasting"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Mic className="w-4 h-4" /> Recording a podcast
              </Link>
              <Link
                href="/guide/earnings"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <DollarSign className="w-4 h-4" /> Understanding earnings
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="font-bold mb-4">Your Progress</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Profile Completion
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next Milestone
                </p>
                <p className="font-medium">Publish your first content</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="font-bold mb-4">Community Tips</h2>
            <div className="space-y-3 text-sm">
              <p>
                "Consistency is key - aim to publish at least weekly when
                starting out."
              </p>
              <p>
                "Engage with your readers in the comments to build loyalty."
              </p>
              <Link
                href="/community"
                className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Join the community →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
