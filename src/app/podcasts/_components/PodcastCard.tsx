"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Podcast } from "@/lib/types";

interface PodcastCardProps {
  podcast: Podcast;
  index: number;
}

export function PodcastCard({ podcast, index }: PodcastCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow"
      aria-labelledby={`podcast-title-${podcast.slug}`}
    >
      <Link
        href={`/podcasts/${podcast.slug}`}
        className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-lg"
      >
        <figure className="relative aspect-square bg-gray-100 dark:bg-gray-700">
          <img
            src={podcast.imageUrl}
            alt={`Cover art for ${podcast.title}`}
            className="w-full h-full object-cover"
            width={400}
            height={400}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-30 flex items-center justify-center">
            <div className="w-16 h-16 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-80 rounded-full flex items-center justify-center transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400 ml-1 transition-colors"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Play {podcast.title}</span>
            </div>
          </div>
        </figure>
        <div className="p-6">
          <h3
            id={`podcast-title-${podcast.slug}`}
            className="text-xl font-semibold mb-2 dark:text-white"
          >
            {podcast.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {podcast.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{podcast.date}</span>
            <span className="mx-2">•</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{podcast.duration}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
