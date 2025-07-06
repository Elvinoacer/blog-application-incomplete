"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiHeart,
  FiX,
  FiUser,
  FiClock,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ArticleStats, mockStats } from "@/data/dashboardstats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LikesAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleStats?: ArticleStats;
}

export default function LikesAnalyticsModal({
  isOpen,
  onClose,
  articleStats,
}: LikesAnalyticsModalProps) {
  const { theme } = useTheme();

  // Mock data - replace with actual props in implementation

  const data = articleStats || mockStats;

  const chartData = {
    labels: data.tallyByDay.map((item) => item.day),
    datasets: [
      {
        label: "Likes by Day",
        data: data.tallyByDay.map((item) => item.count),
        backgroundColor:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.7)"
            : "rgba(37, 99, 235, 0.7)",
        borderColor: theme === "dark" ? "rgb(29, 78, 216)" : "rgb(30, 64, 175)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "dark" ? "#e5e7eb" : "#374151",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(55, 65, 81, 0.5)"
              : "rgba(209, 213, 219, 0.5)",
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(55, 65, 81, 0.5)"
              : "rgba(209, 213, 219, 0.5)",
        },
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <FiHeart className="text-red-500 text-xl mr-3" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Likes Analytics: {data.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<FiHeart className="text-red-500" />}
                  title="Total Likes"
                  value={data.tally.toLocaleString()}
                />
                <StatCard
                  icon={<FiTrendingUp className="text-green-500" />}
                  title="Growth Rate"
                  value={`${data.actionGrowthRate}%`}
                  isPositive={data.actionGrowthRate >= 0}
                />
                <StatCard
                  icon={<FiCalendar className="text-blue-500" />}
                  title="Published Date"
                  value={new Date(data.publishedDate).toLocaleDateString()}
                />
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Likes Chart */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Likes This Week
                  </h3>
                  <div className="h-64">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>

                {/* Recent Likers */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Recent Likers
                  </h3>
                  <div className="space-y-3">
                    {data.topActors.map((like) => (
                      <motion.div
                        key={like.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                      >
                        <img
                          src={like.user.avatar}
                          alt={like.user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-white truncate">
                            {like.user.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            @{like.user.username}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                          {new Date(like.date).toLocaleDateString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Period Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                  icon={<FiClock className="text-purple-500" />}
                  title="Last 7 Days"
                  value={data.tallyLast7Days.toLocaleString()}
                  subtitle="likes"
                />
                <StatCard
                  icon={<FiClock className="text-yellow-500" />}
                  title="Last 30 Days"
                  value={data.tallyLast30Days.toLocaleString()}
                  subtitle="likes"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  isPositive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  isPositive?: boolean;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="flex items-baseline">
            <p className="text-xl font-bold text-gray-800 dark:text-white mr-2">
              {value}
            </p>
            {isPositive !== undefined && (
              <span
                className={`text-sm ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isPositive ? "↑" : "↓"}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
