"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface Topic {
  id: string;
  name: string;
  description: string;
  postCount: number;                                                    
  colorClass: string; // Changed to class names for better theming
}

const topics: Topic[] = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Latest trends in frontend and backend technologies",
    postCount: 24,
    colorClass: "bg-blue-500 dark:bg-blue-600",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "Design principles and user experience insights",
    postCount: 15,
    colorClass: "bg-purple-500 dark:bg-purple-600",
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    description: "Building apps for iOS and Android platforms",
    postCount: 18,
    colorClass: "bg-green-500 dark:bg-green-600",
  },
  {
    id: "devops",
    name: "DevOps",
    description: "CI/CD pipelines and infrastructure as code",
    postCount: 12,
    colorClass: "bg-yellow-500 dark:bg-yellow-600",
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Artificial intelligence and data science topics",
    postCount: 9,
    colorClass: "bg-red-500 dark:bg-red-600",
  },
  {
    id: "career",
    name: "Career Advice",
    description: "Tips for developers to grow in their careers",
    postCount: 11,
    colorClass: "bg-indigo-500 dark:bg-indigo-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl">
            Explore Topics
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-muted-foreground">
            Dive into the categories that interest you most
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 dark:shadow-gray-800/25"
            >
              <div className={`h-2 ${topic.colorClass}`}></div>
              <div className="flex-1 bg-card p-6 flex flex-col justify-between border border-border">
                <div className="flex-1">
                  <Link href={`/topics/${topic.id}`} className="block mt-2">
                    <p className="text-xl font-semibold text-foreground">
                      {topic.name}
                    </p>
                    <p className="mt-3 text-base text-muted-foreground">
                      {topic.description}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                      {topic.postCount}{" "}
                      {topic.postCount === 1 ? "post" : "posts"}
                    </span>
                  </div>
                  <div className="ml-3">
                    <Link
                      href={`/topics/${topic.id}`}
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      View all posts →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Can't find what you're looking for?{" "}
            <Link
              href="/contact"
              className="font-medium text-primary hover:text-primary/80"
            >
              Suggest a new topic
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
// "use client"; // Required for client-side interactivity (dark mode toggle)

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Topic {
//   id: string;
//   name: string;
//   description: string;
//   postCount: number;
//   colorClass: string; // Changed to class names for better theming
// }

// const topics: Topic[] = [
//   {
//     id: "web-development",
//     name: "Web Development",
//     description: "Latest trends in frontend and backend technologies",
//     postCount: 24,
//     colorClass: "bg-blue-500 dark:bg-blue-600",
//   },
//   {
//     id: "ui-ux",
//     name: "UI/UX Design",
//     description: "Design principles and user experience insights",
//     postCount: 15,
//     colorClass: "bg-purple-500 dark:bg-purple-600",
//   },
//   {
//     id: "mobile-dev",
//     name: "Mobile Development",
//     description: "Building apps for iOS and Android platforms",
//     postCount: 18,
//     colorClass: "bg-green-500 dark:bg-green-600",
//   },
//   {
//     id: "devops",
//     name: "DevOps",
//     description: "CI/CD pipelines and infrastructure as code",
//     postCount: 12,
//     colorClass: "bg-yellow-500 dark:bg-yellow-600",
//   },
//   {
//     id: "ai-ml",
//     name: "AI & Machine Learning",
//     description: "Artificial intelligence and data science topics",
//     postCount: 9,
//     colorClass: "bg-red-500 dark:bg-red-600",
//   },
//   {
//     id: "career",
//     name: "Career Advice",
//     description: "Tips for developers to grow in their careers",
//     postCount: 11,
//     colorClass: "bg-indigo-500 dark:bg-indigo-600",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },
// };

// export default function TopicsPage() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     // Check for saved preference or system preference
//     const savedMode = localStorage.getItem("darkMode");
//     const systemPrefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedMode !== null) {
//       setIsDarkMode(savedMode === "true");
//     } else if (systemPrefersDark) {
//       setIsDarkMode(true);
//     }
//   }, []);

//   useEffect(() => {
//     // Apply the class to the document element
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("darkMode", "true");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("darkMode", "false");
//     }
//   }, [isDarkMode]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         {/* Dark Mode Toggle */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
//             aria-label={
//               isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//             }
//           >
//             {isDarkMode ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
//             Explore Topics
//           </h1>
//           <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
//             Dive into the categories that interest you most
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {topics.map((topic) => (
//             <motion.div
//               key={topic.id}
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//               className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 dark:shadow-gray-800/25"
//             >
//               <div className={`h-2 ${topic.colorClass}`}></div>
//               <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between transition-colors duration-300">
//                 <div className="flex-1">
//                   <Link href={`/topics/${topic.id}`} className="block mt-2">
//                     <p className="text-xl font-semibold text-gray-900 dark:text-white">
//                       {topic.name}
//                     </p>
//                     <p className="mt-3 text-base text-gray-500 dark:text-gray-300">
//                       {topic.description}
//                     </p>
//                   </Link>
//                 </div>
//                 <div className="mt-6 flex items-center">
//                   <div className="flex-shrink-0">
//                     <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
//                       {topic.postCount}{" "}
//                       {topic.postCount === 1 ? "post" : "posts"}
//                     </span>
//                   </div>
//                   <div className="ml-3">
//                     <Link
//                       href={`/topics/${topic.id}`}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
//                     >
//                       View all posts →
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-12 text-center"
//         >
//           <p className="text-gray-500 dark:text-gray-400">
//             Can't find what you're looking for?{" "}
//             <Link
//               href="/contact"
//               className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
//             >
//               Suggest a new topic
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
