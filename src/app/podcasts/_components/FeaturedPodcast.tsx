"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Podcast } from "@/lib/types";
import ListenBtn from "./listen-btn";
import WatchBtn from "./watch-btn";

interface FeaturedPodcastProps {
  podcast: Podcast;
}

export function FeaturedPodcast({ podcast }: FeaturedPodcastProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex-shrink-0 w-full md:w-1/3"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
            <img
              src={podcast.imageUrl}
              alt={`Cover image for ${podcast.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <div className="flex-1">
          <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Featured Episode
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {podcast.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {podcast.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {podcast.tags.map((tag, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm shadow-sm text-gray-800 dark:text-gray-200"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {podcast.duration}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
              >
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {podcast.date}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <ListenBtn slug={podcast.slug} title={podcast.title} />
            <WatchBtn slug={podcast.slug} title={podcast.title} />

            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
