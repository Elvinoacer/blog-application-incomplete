"use client";

import { motion } from "framer-motion";
import Head from "next/head";

const CookiePolicy = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <Head>
        <title>Cookie Policy | Your Blog Name</title>
        <meta
          name="description"
          content="Learn how we use cookies on our blog"
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
              Cookie Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              What Are Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Cookies are small text files stored on your device when you visit
              our website. They help us provide you with a better experience by
              remembering your preferences and tracking visitor behavior.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              How We Use Cookies
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Essential Cookies: Necessary for the website to function
                properly.
              </li>
              <li>
                Performance Cookies: Help us understand how visitors interact
                with our website.
              </li>
              <li>
                Functionality Cookies: Remember your preferences to provide
                enhanced features.
              </li>
              <li>
                Targeting Cookies: Used to deliver relevant ads to you (if we
                use advertising).
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may use services like Google Analytics which set their own
              cookies to help us analyze how users interact with our site. These
              cookies are subject to the respective privacy policies of these
              third parties.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Managing Cookies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your computer and you can set most
              browsers to prevent them from being placed. However, if you do
              this, you may have to manually adjust some preferences every time
              you visit a site and some services and functionalities may not
              work.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Most web browsers allow some control of most cookies through the
              browser settings. To find out more about cookies, including how to
              see what cookies have been set and how to manage and delete them,
              visit{" "}
              <a
                href="https://www.aboutcookies.org"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aboutcookies.org
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update our Cookie Policy from time to time. We will notify
              you of any changes by posting the new Cookie Policy on this page
              and updating the "Last Updated" date at the top of this policy.
            </p>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default CookiePolicy;
