"use client";
// app/terms-of-service/page.tsx
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfService() {
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
          Terms of Service
        </motion.h1>

        <motion.div
          className="prose dark:prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing or using our blog app ("Service"), you agree to be
              bound by these Terms of Service ("Terms"). If you disagree with
              any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              2. User Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When you create an account with us, you must provide accurate and
              complete information. You are solely responsible for the activity
              that occurs on your account and for keeping your password secure.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">
                You must be at least 13 years old to use this Service
              </li>
              <li className="mb-2">
                You may not use as a username any name that is offensive or
                violates any rights
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              3. Content
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material ("Content").
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You are responsible for the Content that you post on or through
              the Service, including its legality, reliability, and
              appropriateness.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By posting Content on or through the Service, you represent and
              warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">
                The Content is yours (you own it) or you have the right to use
                it
              </li>
              <li className="mb-2">
                The posting of your Content does not violate any privacy rights,
                publicity rights, copyrights, contract rights or any other
                rights of any person
              </li>
              <li>
                The Content does not contain any viruses or other harmful code
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              4. Prohibited Uses
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You may use the Service only for lawful purposes and in accordance
              with these Terms. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">
                In any way that violates any applicable law or regulation
              </li>
              <li className="mb-2">
                For the purpose of exploiting, harming, or attempting to exploit
                or harm minors in any way
              </li>
              <li className="mb-2">
                To transmit any advertising or promotional material without our
                prior written consent
              </li>
              <li className="mb-2">
                To impersonate or attempt to impersonate the Company, a Company
                employee, another user, or any other person or entity
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits
                anyone's use or enjoyment of the Service
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of the blog app and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of both the United States and foreign countries.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our trademarks and trade dress may not be used in connection with
              any product or service without the prior written consent of the
              blog app.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              6. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach these Terms.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Upon termination, your right to use the Service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              In no event shall the blog app, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li className="mb-2">
                Your access to or use of or inability to access or use the
                Service
              </li>
              <li className="mb-2">
                Any conduct or content of any third party on the Service
              </li>
              <li className="mb-2">Any content obtained from the Service</li>
              <li>
                Unauthorized access, use or alteration of your transmissions or
                content
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These Terms shall be governed and construed in accordance with the
              laws of government, without regard to its conflict of law
              provisions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. By continuing to access or use our
              Service after those revisions become effective, you agree to be
              bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
              &nbsp;
              <Link href="mailto:lvntechies@gmail.com">
                lvntechies@gmail.com
              </Link>
              .
            </p>
          </section>
        </motion.div>
      </div>
    </motion.main>
  );
}
