"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Mail, HelpCircle } from "lucide-react";

export default function SignupSuccess() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Clock className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Thank You for Registering!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
            We're excited to have you join our author community. Your
            application is being reviewed by our team.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left max-w-md mx-auto">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You'll receive an email within 24-48 hours once your author
                  status is approved. In rare cases, we may reach out for
                  additional information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold mb-3">While You Wait</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Explore our author guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Check out our most successful content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span>Prepare your first article or podcast</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold mb-3">Have Questions?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Our support team is happy to help with any questions about the
              verification process.
            </p>
            <Link
              href="/authors-support"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact Support <HelpCircle className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
          >
            Return to Home
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            You'll be notified via email when your account is approved
          </p>
        </div>
      </motion.div>
    </div>
  );
}
