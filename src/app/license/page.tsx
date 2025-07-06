"use client";

import { motion } from "framer-motion";
import Head from "next/head";

const LicensesPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.8,
      },
    },
  };

  const licenses = [
    {
      name: "Next.js",
      license: "MIT",
      link: "https://github.com/vercel/next.js/blob/canary/license.md",
      description: "The React Framework for the Web",
    },
    {
      name: "Tailwind CSS",
      license: "MIT",
      link: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
      description: "A utility-first CSS framework",
    },
    {
      name: "Framer Motion",
      license: "MIT",
      link: "https://github.com/framer/motion/blob/main/LICENSE.md",
      description: "Production-ready motion library for React",
    },
    {
      name: "React",
      license: "MIT",
      link: "https://github.com/facebook/react/blob/main/LICENSE",
      description: "A JavaScript library for building user interfaces",
    },
    {
      name: "TypeScript",
      license: "Apache-2.0",
      link: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt",
      description: "TypeScript is a typed superset of JavaScript",
    },
  ];

  return (
    <>
      <Head>
        <title>Licenses | Your Blog Name</title>
        <meta
          name="description"
          content="Open source licenses used in our project"
        />
      </Head>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Source Licenses
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Acknowledgement of the open source projects we use
            </p>
          </motion.div>

          <div className="space-y-6">
            {licenses.map((license, index) => (
              <motion.div
                key={license.name}
                variants={itemVariants}
                className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 rounded-xl shadow-lg p-6 sm:p-8"
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                      {license.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {license.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {license.license} License
                    </span>
                    <a
                      href={license.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                    >
                      View Full License
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 rounded-xl shadow-lg p-6 sm:p-8 mt-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Additional Acknowledgments
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're grateful to all the open source contributors whose work
              makes this project possible. If we've missed any attribution or if
              you have questions about our use of open source software, please
              contact us.
            </p>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default LicensesPage;
