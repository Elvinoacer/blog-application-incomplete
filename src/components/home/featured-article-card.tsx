"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FeaturedArticleCardProps {
  id: string;
  topic: string;
  imageUrl: string | null;
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  id,
  topic,
  imageUrl,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      href={`/autoblogs/${id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden md:h-auto md:w-64 md:flex-shrink-0">
          <Image
            src={imageError ? fallbackImage : imageUrl || fallbackImage}
            alt={topic}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:bg-gradient-to-r" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Autoblog
          </div>

          {/* Read time indicator (optional) */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            5 min read
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white sm:text-2xl line-clamp-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {topic}
            </h3>

            {/* Excerpt placeholder - you might want to add an excerpt prop later */}
            <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
              Discover insights and perspectives on this trending topic.
              Continue reading to explore more about this subject.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              {/* Author avatar placeholder */}
              <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <svg
                  className="h-6 w-6 text-gray-400 absolute left-1 top-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-6.627 0-12 5.373-12 12h24c0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Author Name
              </span>
            </div>

            <span className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
              Read more
              <svg
                className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Custom styles for line clamping */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Link>
  );
};

export default FeaturedArticleCard;
