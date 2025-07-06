"use client";
// app/privacy-policy/page.tsx
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          className="prose dark:prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Welcome to our blog app. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">
                <strong>Identity Data</strong> includes username or similar
                identifier.
              </li>
              <li className="mb-2">
                <strong>Contact Data</strong> includes email address.
              </li>
              <li className="mb-2">
                <strong>Technical Data</strong> includes internet protocol (IP)
                address, browser type and version, time zone setting and
                location, browser plug-in types and versions, operating system
                and platform, and other technology on the devices you use to
                access this website.
              </li>
              <li className="mb-2">
                <strong>Usage Data</strong> includes information about how you
                use our website and services.
              </li>
              <li>
                <strong>Cookies Data</strong> like many sites, we use cookies to
                enhance your experience and gather information about visitors
                and visits to our websites.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              How We Use Your Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">To provide and maintain our service</li>
              <li className="mb-2">
                To notify you about changes to our service
              </li>
              <li className="mb-2">
                To allow you to participate in interactive features of our
                service when you choose to do so
              </li>
              <li className="mb-2">To provide customer support</li>
              <li className="mb-2">
                To gather analysis or valuable information so that we can
                improve our service
              </li>
              <li>To monitor the usage of our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We have implemented appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We will only retain your personal data for as long as necessary to
              fulfill the purposes we collected it for, including for the
              purposes of satisfying any legal, accounting, or reporting
              requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Your Legal Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">Request access to your personal data</li>
              <li className="mb-2">Request correction of your personal data</li>
              <li className="mb-2">Request erasure of your personal data</li>
              <li className="mb-2">
                Object to processing of your personal data
              </li>
              <li className="mb-2">
                Request restriction of processing your personal data
              </li>
              <li>Request transfer of your personal data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This website may include links to third-party websites, plug-ins
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date at the top of this Privacy
              Policy.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>
        </motion.div>
      </div>
    </motion.main>
  );
}
