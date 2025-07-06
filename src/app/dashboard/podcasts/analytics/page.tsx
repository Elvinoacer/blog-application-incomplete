"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiHeadphones,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
  FiClock,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type Podcast = {
  id: string;
  title: string;
  publishDate: string;
  duration: number;
  totalPlays: number;
  uniqueListeners: number;
  completionRate: number;
  comments: number;
  shares: number;
  episodes: Episode[];
};

type Episode = {
  id: string;
  title: string;
  plays: number;
  date: string;
  duration: number;
};

export default function PodcastAnalytics() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">(
    "30d"
  );
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading podcast data
    const timer = setTimeout(() => {
      const mockPodcasts: Podcast[] = [
        {
          id: "1",
          title: "The Future of Web Development",
          publishDate: "2023-05-01",
          duration: 45,
          totalPlays: 12543,
          uniqueListeners: 8432,
          completionRate: 68,
          comments: 142,
          shares: 356,
          episodes: [
            {
              id: "e1",
              title: "Introduction",
              plays: 12543,
              date: "2023-05-01",
              duration: 5,
            },
            {
              id: "e2",
              title: "React Server Components",
              plays: 9876,
              date: "2023-05-08",
              duration: 15,
            },
            {
              id: "e3",
              title: "Edge Computing",
              plays: 7654,
              date: "2023-05-15",
              duration: 15,
            },
            {
              id: "e4",
              title: "Q&A Session",
              plays: 5432,
              date: "2023-05-22",
              duration: 10,
            },
          ],
        },
        {
          id: "2",
          title: "JavaScript Performance Patterns",
          publishDate: "2023-04-15",
          duration: 38,
          totalPlays: 9876,
          uniqueListeners: 6543,
          completionRate: 72,
          comments: 98,
          shares: 210,
          episodes: [
            {
              id: "e1",
              title: "Introduction",
              plays: 9876,
              date: "2023-04-15",
              duration: 5,
            },
            {
              id: "e2",
              title: "Memory Management",
              plays: 7654,
              date: "2023-04-22",
              duration: 12,
            },
            {
              id: "e3",
              title: "Rendering Optimization",
              plays: 6543,
              date: "2023-04-29",
              duration: 12,
            },
            {
              id: "e4",
              title: "Q&A Session",
              plays: 4321,
              date: "2023-05-06",
              duration: 9,
            },
          ],
        },
        {
          id: "3",
          title: "CSS Architecture in 2023",
          publishDate: "2023-03-20",
          duration: 42,
          totalPlays: 7654,
          uniqueListeners: 5432,
          completionRate: 65,
          comments: 76,
          shares: 187,
          episodes: [
            {
              id: "e1",
              title: "Introduction",
              plays: 7654,
              date: "2023-03-20",
              duration: 5,
            },
            {
              id: "e2",
              title: "CSS Modules",
              plays: 6543,
              date: "2023-03-27",
              duration: 14,
            },
            {
              id: "e3",
              title: "Utility-First CSS",
              plays: 5432,
              date: "2023-04-03",
              duration: 14,
            },
            {
              id: "e4",
              title: "Q&A Session",
              plays: 3210,
              date: "2023-04-10",
              duration: 9,
            },
          ],
        },
      ];
      setPodcasts(mockPodcasts);
      setSelectedPodcast(mockPodcasts[0].id);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const selectedPodcastData = podcasts.find((p) => p.id === selectedPodcast);
  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  // Chart data
  const playsChartData = {
    labels: selectedPodcastData?.episodes.map((e) => e.title) || [],
    datasets: [
      {
        label: "Plays per Episode",
        data: selectedPodcastData?.episodes.map((e) => e.plays) || [],
        backgroundColor: theme === "dark" ? "#3b82f6" : "#2563eb",
        borderColor: theme === "dark" ? "#1d4ed8" : "#1e40af",
        borderWidth: 1,
      },
    ],
  };

  const engagementChartData = {
    labels: ["Plays", "Unique Listeners", "Comments", "Shares"],
    datasets: [
      {
        data: [
          selectedPodcastData?.totalPlays || 0,
          selectedPodcastData?.uniqueListeners || 0,
          selectedPodcastData?.comments || 0,
          selectedPodcastData?.shares || 0,
        ],
        backgroundColor: [
          theme === "dark" ? "#3b82f6" : "#2563eb",
          theme === "dark" ? "#10b981" : "#059669",
          theme === "dark" ? "#f59e0b" : "#d97706",
          theme === "dark" ? "#8b5cf6" : "#7c3aed",
        ],
        borderColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
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
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: theme === "dark" ? "#374151" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <FiHeadphones className="mr-2" /> Podcast Analytics
          </h1>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Podcast Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Select Podcast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {podcasts.map((podcast) => (
                  <motion.button
                    key={podcast.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPodcast(podcast.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedPodcast === podcast.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <h3 className="font-medium text-gray-800 dark:text-white text-left">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-left mt-1">
                      Published:{" "}
                      {new Date(podcast.publishDate).toLocaleDateString()}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {selectedPodcastData && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPodcastData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                      icon={<FiTrendingUp />}
                      title="Total Plays"
                      value={selectedPodcastData.totalPlays.toLocaleString()}
                      change="+12.5%"
                      isPositive={true}
                    />
                    <StatCard
                      icon={<FiUsers />}
                      title="Unique Listeners"
                      value={selectedPodcastData.uniqueListeners.toLocaleString()}
                      change="+8.3%"
                      isPositive={true}
                    />
                    <StatCard
                      icon={<FiClock />}
                      title="Avg. Completion"
                      value={`${selectedPodcastData.completionRate}%`}
                      change="-2.1%"
                      isPositive={false}
                    />
                    <StatCard
                      icon={<FiMessageSquare />}
                      title="Engagement"
                      value={`${selectedPodcastData.comments} comments, ${selectedPodcastData.shares} shares`}
                    />
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <FiBarChart2 className="mr-2" /> Episode Performance
                      </h3>
                      <div className="h-80">
                        <Bar data={playsChartData} options={chartOptions} />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <FiPieChart className="mr-2" /> Engagement Breakdown
                      </h3>
                      <div className="h-80">
                        <Pie
                          data={engagementChartData}
                          options={chartOptions}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Episode Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Episode Details
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedPodcastData.episodes.map((episode) => (
                        <motion.div
                          key={episode.id}
                          whileHover={{
                            backgroundColor:
                              theme === "dark"
                                ? "rgba(55, 65, 81, 0.5)"
                                : "rgba(243, 244, 246, 0.5)",
                          }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center"
                        >
                          <div className="md:col-span-5">
                            <h4 className="font-medium text-gray-800 dark:text-white">
                              {episode.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(episode.date).toLocaleDateString()} •{" "}
                              {formatDuration(episode.duration)}
                            </p>
                          </div>
                          <div className="md:col-span-3">
                            <div className="flex items-center">
                              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {episode.plays.toLocaleString()} plays
                              </span>
                            </div>
                          </div>
                          <div className="md:col-span-4">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (episode.plays /
                                      selectedPodcastData.episodes[0].plays) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({
  icon,
  title,
  value,
  change,
  isPositive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="mr-2">{icon}</span>
            <span className="text-sm font-medium">{title}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        {change && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isPositive
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};
