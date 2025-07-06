"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Clock,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How long does verification take?",
      answer:
        "Typically 24-48 hours during business days. Weekends may take slightly longer.",
    },
    {
      question: "What information do you verify?",
      answer:
        "We check author credentials, writing samples, and ensure compliance with our content guidelines.",
    },
    {
      question: "Can I submit content before verification?",
      answer:
        "No, you'll need to wait for approval before accessing the author dashboard.",
    },
    {
      question: "What if my application is rejected?",
      answer:
        "We'll email you with specific reasons and information about reapplying if applicable.",
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "For detailed inquiries about your application",
      action: "Send us an email",
      href: "mailto:omondielvin@gmail.com",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Whatsapp Chat",
      description: "Instant help during business hours (9AM-5PM EST)",
      action: "Start chat",
      href: "https://wa.me/254792156094?text=Hello%2C%20I%20hope%20you%27re%20doing%20well.%20I%27m%20reaching%20out%20because%20I%20could%20use%20your%20professional%20assistance%20with%20a%20situation%20I%27m%20navigating.%20Would%20you%20be%20available%20to%20help%20or%20offer%20some%20guidance%3F%20Thank%20you%20for%20your%20time%20and%20consideration.",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help Center",
      description: "Browse our comprehensive knowledge base",
      action: "Visit help center",
      href: "/help-center",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Author Verification Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get help with your author application and verification process
          </p>
        </motion.section>

        {/* Verification Status Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Your Verification Status
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Applications are reviewed in the order they're received. You'll
                receive an email notification once your author status is
                approved.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <span>Typical wait time: 24-48 hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Contact Our Support Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {method.description}
                </p>
                <Link
                  href={method.href}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {method.action} <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Contact Us Directly
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
