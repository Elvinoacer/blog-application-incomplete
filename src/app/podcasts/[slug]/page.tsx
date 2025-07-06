"use client";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { podcastData } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { use } from "react";
import WatchBtn from "../_components/watch-btn";
import { RelatedPodcasts } from "../_components/related-posts";

import relatedPost from "@/data/podcasts-with-images.json";

interface PodcastPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function PodcastPage({ params }: PodcastPageProps) {
  const unwrappedParams = use(params);
  const podcast = podcastData.find((p) => p.slug === unwrappedParams.slug);

  if (!podcast) {
    return notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
          aria-labelledby="podcast-title"
        >
          <div className="mb-8">
            <Link
              href="/podcasts"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-indigo-400 rounded"
              aria-label="Back to podcasts list"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Podcasts
            </Link>
          </div>

          <article className="flex flex-col md:flex-row gap-8 mb-12">
            <motion.figure
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-full md:w-1/3"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <img
                  src={podcast.imageUrl}
                  alt={`Cover art for ${podcast.title}`}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                  loading="lazy"
                />
              </div>
              <figcaption className="sr-only">Podcast cover art</figcaption>
            </motion.figure>

            <div className="flex-1">
              <div className="flex gap-6 items-center">
                <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Episode {podcast.episodeNumber}
                </div>
                {/* BTN */}
                <Link
                  href={`/podcasts/video-view/${podcast.slug}`}
                  legacyBehavior
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 cursor-pointer relative overflow-hidden group"
                    style={{ height: "28px" }} // Matching the episode tag height
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
                      }}
                    />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                      </svg>
                      Watch Video
                    </span>
                  </motion.div>
                </Link>
                {/* BTN */}
              </div>
              <h1
                id="podcast-title"
                className="text-3xl font-bold mb-4 dark:text-white"
              >
                {podcast.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6" aria-label="Tags">
                {podcast.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2"
                    aria-hidden="true"
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
                    aria-hidden="true"
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

              <PodcastPlayer
                audioTitle={podcast.title}
                audioUrl={podcast.audioUrl}
              />
            </div>
          </article>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="prose max-w-none dark:prose-invert"
            aria-labelledby="episode-notes"
          >
            <h2
              id="episode-notes"
              className="text-2xl font-semibold mb-4 dark:text-white"
            >
              Episode Notes
            </h2>
            <div dangerouslySetInnerHTML={{ __html: podcast.content }} />
          </motion.section>
        </motion.main>
      </div>
      {/* Related */}
      <RelatedPodcasts podcasts={relatedPost} />
    </>
  );
}
