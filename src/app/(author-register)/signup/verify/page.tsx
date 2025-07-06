"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck, ArrowRight } from "lucide-react";

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // On success, redirect to success screen
    router.push("/signup/success");
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);

    // Simulate resend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsResending(false);
    setResendSuccess(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MailCheck className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We've sent a 6-digit code to your email address. Please enter it below
          to continue.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="sr-only">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 text-center text-xl font-mono rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123456"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying || code.length < 6}
            className={`w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-medium ${
              isVerifying || code.length < 6
                ? "bg-blue-400 dark:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            } text-white transition-colors`}
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              <>
                Verify and Continue <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className={`mt-2 text-blue-600 dark:text-blue-400 font-medium ${
              isResending ? "opacity-50" : "hover:underline"
            }`}
          >
            {isResending
              ? "Sending..."
              : resendSuccess
              ? "Code resent! Check your email"
              : "Resend code"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
