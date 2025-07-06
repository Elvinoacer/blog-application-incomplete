import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function ListenBtn({ slug, title }: { slug: string; title: string }) {
  return (
    <Link href={`/podcasts/${slug}`} legacyBehavior>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-300"
        aria-label={`Listen to ${title}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
        Listen Now
      </motion.button>
    </Link>
  );
}

export default ListenBtn;
