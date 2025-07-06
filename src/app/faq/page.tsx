"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  DollarSign,
  Mic,
  UserCheck,
  FileText,
  HelpCircle,
} from "lucide-react";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const categories = [
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: "author",
      name: "Author Application",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      id: "content",
      name: "Content Creation",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "articles",
      name: "Articles",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "podcasts",
      name: "Podcasts",
      icon: <Mic className="w-5 h-5" />,
    },
    {
      id: "earnings",
      name: "Earnings",
      icon: <DollarSign className="w-5 h-5" />,
    },
  ];

  const faqs = {
    general: [
      {
        question: "What is your platform about?",
        answer:
          "Our platform connects knowledgeable authors with readers looking for high-quality content. We specialize in in-depth articles and podcasts across various topics.",
      },
      {
        question: "Is there a cost to join as a reader?",
        answer:
          "No, reading content on our platform is completely free. Some premium content may require a subscription in the future.",
      },
      {
        question: "How do I report inappropriate content?",
        answer:
          "Each article and podcast has a report button. You can also email our moderation team at omondielvin@gmail.com.",
      },
    ],
    author: [
      {
        question: "How do I become an author?",
        answer:
          "You can apply through our author signup page. We review all applications manually to ensure quality standards.",
      },
      {
        question: "What are the requirements to become an author?",
        answer:
          "We look for subject matter expertise, writing ability, and a unique perspective. No formal qualifications are required, but samples of your work help.",
      },
      {
        question: "How long does verification take?",
        answer:
          "Typically 2-3 business days. During peak times it may take up to a week. You'll receive an email once your application is processed.",
      },
    ],
    content: [
      {
        question: "What content formats do you accept?",
        answer:
          "We accept long-form articles (1000+ words), tutorials, opinion pieces, and podcast episodes (audio or video).",
      },
      {
        question: "Are there content guidelines I need to follow?",
        answer:
          "Yes, we have comprehensive style and content guidelines available in your dashboard once approved as an author.",
      },
      {
        question: "Can I republish content from my personal blog?",
        answer:
          "We accept original content only. Republished content must be significantly updated and improved from the original.",
      },
    ],
    articles: [
      {
        question: "What's the ideal article length?",
        answer:
          "We recommend 1500-3000 words for most articles. Tutorials and in-depth guides can be longer.",
      },
      {
        question: "Can I include images in my articles?",
        answer:
          "Yes, you can upload images, diagrams, and charts. All images must be properly licensed or original creations.",
      },
      {
        question: "How are articles edited?",
        answer:
          "Our editors review all submissions and may suggest changes for clarity, accuracy, or style before publishing.",
      },
    ],
    podcasts: [
      {
        question: "What equipment do I need to start?",
        answer:
          "At minimum, a good quality USB microphone and quiet recording space. We recommend starting simple and upgrading as you grow.",
      },
      {
        question: "What's the ideal podcast length?",
        answer:
          "Most successful podcasts on our platform are between 20-45 minutes. Shorter (5-10 min) and longer formats also work for certain topics.",
      },
      {
        question: "Can I include video with my podcast?",
        answer:
          "Yes, we support video podcasts. These often perform better but require more production effort.",
      },
    ],
    earnings: [
      {
        question: "How do authors earn money?",
        answer:
          "Authors earn through ad revenue shares, premium content subscriptions, and direct reader support.",
      },
      {
        question: "What's the payment schedule?",
        answer:
          "We process payments monthly, around the 15th of each month for the previous month's earnings.",
      },
      {
        question: "Is there a minimum payout threshold?",
        answer:
          "Yes, the minimum payout is $50. Unpaid earnings roll over to the next month.",
      },
    ],
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about writing, podcasting, and
            earning on our platform.
          </p>
        </motion.header>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openQuestion === faq.question ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openQuestion === faq.question && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our support team is happy to help with any other questions you
              might have about our platform.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
