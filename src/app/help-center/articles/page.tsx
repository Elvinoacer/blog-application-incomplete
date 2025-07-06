// app/help/articles/page.tsx
"use client"; // Required for Framer Motion and event handlers

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Mic,
  Video,
  UserPlus,
  Edit3,
  Settings,
  Search,
} from "lucide-react";

// Define a type for FAQ items for better structure
interface FAQItem {
  question: string;
  answer: string;
  category: "readers" | "authors" | "general";
}

// Sample FAQ data - replace with your actual content
const faqData: FAQItem[] = [
  {
    question: "How do I find articles on a specific topic?",
    answer:
      "You can use the search bar at the top of the homepage or browse through our categories. Each article is tagged with relevant keywords to help you find what you're looking for.",
    category: "readers",
  },
  {
    question: "Can I listen to podcasts on my mobile device?",
    answer:
      "Yes, our platform is fully responsive. You can listen to podcasts directly through your mobile browser. Some podcasts may also be available on popular podcasting platforms.",
    category: "readers",
  },
  {
    question: "How do I switch between light and dark mode?",
    answer:
      "You can usually find the theme switcher (often an icon like a sun or moon) in the navigation bar or user settings menu. Clicking it will toggle between light and dark themes.",
    category: "general",
  },
  {
    question: "How do I register as an author?",
    answer:
      'Click on the "Sign Up" or "Register" button, usually found in the top right corner. Fill out the registration form, and make sure to indicate that you want to be an author. Some platforms may require an approval process.',
    category: "authors",
  },
  {
    question: "What are the guidelines for writing articles?",
    answer:
      'We encourage original, insightful, and respectful content. Please refer to our detailed "Content Guidelines" page for specific rules on plagiarism, formatting, and acceptable topics.',
    category: "authors",
  },
  {
    question: "How do I upload a podcast episode?",
    answer:
      'Once registered and approved as a creator, navigate to your dashboard. You should find an "Upload Podcast" or "New Episode" section. Follow the prompts to upload your audio file and provide details like title, description, and cover art.',
    category: "authors",
  },
  {
    question: "Is there a way to save articles to read later?",
    answer:
      'Currently, we do not have a built-in "read later" feature, but you can use your browser\'s bookmarking functionality. We are considering adding this feature in the future!',
    category: "readers",
  },
  {
    question: "What video formats are supported for uploads?",
    answer:
      'We support common video formats like MP4, MOV, and AVI. For best results, we recommend uploading videos in MP4 format with H.264 encoding. Please check our "Video Upload Guide" for more details on resolution and bitrate.',
    category: "authors",
  },
];

// AccordionItem component for FAQs
const AccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full py-4 px-2 sm:px-4 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
      >
        <span className="text-base sm:text-lg font-medium">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
                marginTop: "8px",
                marginBottom: "16px",
              },
              collapsed: {
                opacity: 0,
                height: 0,
                marginTop: "0px",
                marginBottom: "0px",
              },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-2 sm:px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base"
          >
            {item.answer}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function HelpArticlesPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "readers" | "authors" | "general"
  >("all");

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || faq.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const MotionIcon = ({
    icon: Icon,
    delay = 0,
  }: {
    icon: React.ElementType;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Icon size={48} className="text-blue-500 dark:text-blue-400" />
    </motion.div>
  );

  const FilterButton: React.FC<{
    filter: "all" | "readers" | "authors" | "general";
    label: string;
    icon?: React.ElementType;
  }> = ({ filter, label, icon: Icon }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
        ${
          activeFilter === filter
            ? "bg-blue-500 text-white shadow-md transform scale-105"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
        }
      `}
    >
      {Icon && <Icon size={16} className="mr-1 sm:mr-2" />}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-16"
      >
        <HelpCircle
          size={48}
          className="mx-auto mb-4 text-blue-600 dark:text-blue-400"
        />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Help & Support Center
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Welcome! Find answers to your questions about using our platform,
          whether you're here to read, listen, watch, or create.
        </p>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 sm:mb-12 max-w-2xl mx-auto"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
      >
        <FilterButton filter="all" label="All Topics" />
        <FilterButton filter="readers" label="For Readers" icon={BookOpen} />
        <FilterButton filter="authors" label="For Creators" icon={Edit3} />
        <FilterButton filter="general" label="General" icon={Settings} />
      </motion.div>

      {/* Main Content Grid - Could be cards or sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        {/* Example: Using an Accordion for FAQs */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openAccordion === index}
                onClick={() => handleAccordionClick(index)}
              />
            ))
          ) : (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
              No articles found matching your search or filter.
            </p>
          )}
        </div>

        {/* You can add more sections here for different types of help content */}
        {/* For example, linking to dedicated pages or showing more detailed guides */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Popular Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started for Readers",
                icon: BookOpen,
                href: "#",
                delay: 0.1,
              },
              {
                title: "Becoming a Creator",
                icon: UserPlus,
                href: "#",
                delay: 0.2,
              },
              {
                title: "Podcast Upload Guide",
                icon: Mic,
                href: "#",
                delay: 0.3,
              },
              {
                title: "Video Content Tips",
                icon: Video,
                href: "#",
                delay: 0.4,
              },
              {
                title: "Account Settings",
                icon: Settings,
                href: "#",
                delay: 0.5,
              },
              {
                title: "Troubleshooting Common Issues",
                icon: HelpCircle,
                href: "#",
                delay: 0.6,
              },
            ].map((topic) => (
              <motion.a
                key={topic.title}
                href={topic.href} // Replace with actual links
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: topic.delay + 0.5 }} // Stagger animation
                className="block p-6 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-200 group"
              >
                <div className="flex items-center mb-3">
                  <topic.icon
                    size={28}
                    className="text-blue-500 dark:text-blue-400 mr-3 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn more about {topic.title.toLowerCase()}.
                </p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Can't find what you're looking for?
          </p>
          <a
            href="/contact" // Assuming you have a contact page
            className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Contact Support
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
