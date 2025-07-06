"use client";
// app/not-found.tsx
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* 3D Illustration Container */}
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="relative mb-12 w-full max-w-md mx-auto"
        >
          {/* 3D Card Effect */}
          <div className="relative">
            {/* Main card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-1 translate-y-0">
              <div className="text-9xl font-bold text-gray-300 dark:text-gray-600">
                404
              </div>
            </div>

            {/* Shadow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 bg-black/10 dark:bg-black/20 rounded-2xl blur-md -z-10 translate-y-4"
            />

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -left-8"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full shadow-lg" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-6 -right-6"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Return Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating background elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 bg-purple-300/30 dark:bg-purple-600/20 rounded-full -z-10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300/30 dark:bg-blue-600/20 rounded-full -z-10"
        />
      </div>
    </motion.main>
  );
}
