// app/tutorials/creating-podcasts/page.tsx
"use client"; // Required for Framer Motion

import React from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Youtube,
  LinkIcon,
  Music,
  CloudUpload,
  Video,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Mic,
} from "lucide-react";

// Define a type for tutorial steps for better structure if needed
interface TutorialStep {
  title: string;
  description: React.ReactNode; // Allow JSX in description
  icon: React.ElementType;
  details?: React.ReactNode[];
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Option 1: Using a Direct Video Link (e.g., YouTube)",
    icon: Youtube,
    description: (
      <>
        If your podcast is in video format and hosted on a platform like
        YouTube, Vimeo, or similar, you can often use the direct shareable link.
      </>
    ),
    details: [
      <>
        <strong>Find the Video:</strong> Navigate to your video on the hosting
        platform.
      </>,
      <>
        <strong>Get the Share Link:</strong> Look for a "Share" button. Copy the
        provided URL. This is the link you'll use on our platform.
      </>,
      <>
        <strong>Ensure Permissions:</strong> Make sure your video is set to
        public or unlisted (if supported) so our platform and your audience can
        access it.
      </>,
    ],
  },
  {
    title: "Option 2: Creating an Audio-Only Podcast File",
    icon: Music,
    description: (
      <>
        If you want to provide an audio-only podcast, or your source is a video
        you need to convert, follow these steps to get an audio URL.
      </>
    ),
    details: [
      <>
        <strong>Step 1: Obtain Your Source Video.</strong>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          This could be a video you've recorded or one from a platform where you
          have the rights to use and convert it.
        </p>
      </>,
      <>
        <strong>Step 2: Convert Video to Audio.</strong>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          You'll need to extract the audio from your video file. There are many
          tools available for this:
        </p>
        <ul className="list-disc list-inside mt-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Desktop software (e.g., Audacity (free, open-source), Adobe
            Audition).
          </li>
          <li>
            Online conversion websites (search for "video to MP3 converter"). Be
            cautious with online converters and ensure they are reputable.
          </li>
        </ul>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          The most common audio format for podcasts is MP3.
        </p>
      </>,
      <>
        <strong>Step 3: Upload Your Audio File to a Cloud Provider.</strong>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          To get a shareable audio URL, you need to host your audio file online.
          Popular cloud storage providers include:
        </p>
        <ul className="list-disc list-inside mt-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <strong>Amazon S3 (AWS):</strong> Robust and scalable, good for high
            traffic. Can involve a learning curve.
          </li>
          <li>
            <strong>DigitalOcean Spaces:</strong> Simpler to use than S3,
            S3-compatible API.
          </li>
          <li>
            <strong>Google Cloud Storage:</strong> Another powerful option from
            Google.
          </li>
          <li>
            Other services like Backblaze B2, SoundCloud (for audio hosting
            specifically), or dedicated podcast hosting platforms.
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong>Key Action:</strong> After uploading, ensure the file is
          publicly accessible and copy its direct URL (e.g., ending in `.mp3`).
          This is the URL you will use.
        </p>
        <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-md text-yellow-700 dark:text-yellow-200 text-sm">
          <AlertTriangle size={18} className="inline mr-2" />
          Always check the terms of service of your video source and cloud
          provider regarding content rights and public sharing.
        </div>
      </>,
    ],
  },
  {
    title: "Step 3: Adding Your Podcast to Our Platform",
    icon: CheckCircle,
    description: (
      <>
        Once you have your video or audio URL, you're ready to add it to your
        author dashboard on our platform.
      </>
    ),
    details: [
      <>Navigate to your Creator Dashboard.</>,
      <>Find the "Create New Podcast" or "Upload Episode" section.</>,
      <>Paste your video/audio URL into the designated field.</>,
      <>
        Fill in other details like title, description, cover art, and any
        relevant tags.
      </>,
      <>Publish your podcast episode for the world to hear or watch!</>,
    ],
  },
];

const TutorialCard: React.FC<{ step: TutorialStep; index: number }> = ({
  step,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8"
    >
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        >
          <step.icon
            size={32}
            className="text-blue-500 dark:text-blue-400 mr-4"
          />
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {step.title}
        </h2>
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
        {step.description}
      </div>
      {step.details && (
        <div className="space-y-3">
          {step.details.map((detail, detailIndex) => (
            <motion.div
              key={detailIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.2 + 0.3 + detailIndex * 0.1,
              }}
              className="flex items-start text-sm sm:text-base"
            >
              <CheckCircle
                size={18}
                className="text-green-500 dark:text-green-400 mr-2 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function CreatingPodcastsTutorialPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <Mic size={36} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Tutorial: Creating Your Podcast
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A step-by-step guide for authors to prepare and source content for
          their podcasts on our platform.
        </p>
      </motion.header>

      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
        {tutorialSteps.map((step, index) => (
          <TutorialCard key={index} step={step} index={index} />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: tutorialSteps.length * 0.2 + 0.5 }}
        className="mt-12 sm:mt-16 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
          <Video size={28} className="mr-3" /> Additional Tips for Video
          Podcasts
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <li>
            <strong>Good Lighting & Audio:</strong> Ensure your video has clear
            visuals and audible sound. Natural light is often best. Use an
            external microphone if possible.
          </li>
          <li>
            <strong>Stable Camera:</strong> Use a tripod or stable surface to
            avoid shaky footage.
          </li>
          <li>
            <strong>Engaging Background:</strong> Choose a clean and
            non-distracting background.
          </li>
          <li>
            <strong>Resolution:</strong> Aim for at least 720p, with 1080p being
            ideal for most platforms.
          </li>
          <li>
            <strong>Direct Links:</strong> When using direct links from
            platforms like YouTube, ensure the video is "Public" or "Unlisted"
            (not "Private").
          </li>
        </ul>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: tutorialSteps.length * 0.2 + 0.7 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Need more help or have specific questions?
        </p>
        <a
          href="/help-center/articles" // Link to your main help page
          className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium group"
        >
          Visit our Help & Support Center
          <ExternalLink
            size={16}
            className="ml-1.5 group-hover:translate-x-1 transition-transform duration-200"
          />
        </a>
      </motion.div>
    </div>
  );
}
