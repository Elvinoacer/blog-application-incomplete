
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FeaturedArticleCardProps {
  id: string;
  topic: string;
  imageUrl: string | null;
  description: string;
  content: any;
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  id,
  topic,
  imageUrl,
  description,
  content,
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

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const noWords = text.split(/\s/g).length;
    const minutes = noWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} min read`;
  };

  const stripHtml = (html: string) => {
    if (!isMounted) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <Link
      href={`/autoblogs/${id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      <div className="flex flex-col">
        {" "}
        {/* Changed to flex-col */}
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden md:h-64">
          {" "}
          {/* Adjusted for vertical layout */}
          <Image
            src={imageError ? fallbackImage : imageUrl || fallbackImage}
            alt={topic}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Category badge */}
          <div className="absolute top-4 left-4 rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Autoblog
          </div>
          {/* Read time indicator */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {calculateReadingTime(stripHtml(JSON.stringify(content)))}
          </div>
        </div>
        {/* Content Container */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white sm:text-2xl line-clamp-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
              {topic}
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
              {stripHtml(description)}
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
                Elvin Juma
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

