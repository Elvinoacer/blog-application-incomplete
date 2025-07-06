import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function WatchBtn({ slug, title }: { slug: string; title: string }) {
  return (
    <div>
      <Link href={`/podcasts/video-view/${slug}`} legacyBehavior>
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.3,
            bounce: 0.4,
            scale: { type: "spring", stiffness: 300 },
          }}
          className="relative overflow-hidden group px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          aria-label={`Listen to ${title}`}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Rotating border */}
          <motion.div
            className="absolute inset-0 border-2 rounded-lg"
            style={{
              background:
                "conic-gradient(from var(--angle), #8b5cf6, #6366f1, #3b82f6, #8b5cf6)",
              borderImage:
                "conic-gradient(from var(--angle), #8b5cf6, #6366f1, #3b82f6, #8b5cf6) 1",
              animation: "rotate 3s linear infinite",
            }}
            initial={{ "--angle": "0deg" }}
            animate={{ "--angle": "360deg" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Content */}
          <motion.span
            className="relative z-10 text-white flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
          >
            {/* <svg
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
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
            </svg>
            Watch Podcast
          </motion.span>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </motion.button>
      </Link>

      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes rotate {
          to {
            --angle: 360deg;
          }
        }
      `}</style>
    </div>
  );
}

export default WatchBtn;
