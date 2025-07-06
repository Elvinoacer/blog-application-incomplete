"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent !== "accepted") {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.8,
          }}
          className="fixed bottom-4 left-4 right-4 max-w-6xl mx-auto z-50"
        >
          <motion.div
            className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 rounded-xl shadow-2xl p-4"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium">
                We use cookies to enhance your experience on our website. By
                continuing to browse, you agree to our use of cookies.
              </p>
              <div className="flex gap-3 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={acceptCookies}
                  className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors text-white whitespace-nowrap"
                >
                  Accept
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/cookie-policy"
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-800 dark:text-gray-200 whitespace-nowrap"
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
