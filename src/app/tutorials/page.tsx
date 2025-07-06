"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
function convertToEmbedUrl(url: string): string | undefined {
  // Regular expression to extract the video ID from various YouTube URL formats
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  // Return null if no match found (invalid URL)
  if (!match || match[2].length !== 11) {
    return undefined;
  }

  const videoId = match[2];
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function TutorialPage() {
  // Mock data - replace with your actual data fetching
  const tutorial = {
    title: "Mastering Next.js with App Router",
    slug: "mastering-nextjs-app-router",
    author: "Jane Developer",
    date: "May 15, 2023",
    readTime: "12 min read",
    content: `
      <h2>Introduction to Next.js App Router</h2>
      <p>The App Router introduces a new paradigm for building applications with Next.js...</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Layouts that persist across navigation</li>
        <li>Server Components by default</li>
        <li>Improved data fetching</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js project with App Router...</p>
    `,
    image:
      "https://images.unsplash.com/photo-1746023841861-d5fcf4b3d510?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Next.js", "React", "Frontend"],
    comments: [
      { id: 1, name: "Alex", comment: "Great tutorial!", date: "2 days ago" },
      {
        id: 2,
        name: "Sam",
        comment: "Very helpful, thanks!",
        date: "1 week ago",
      },
    ],
    podcast: {
      title: "Next.js App Router Deep Dive",
      url: "https://example.com/podcast.mp3",
      videoUrl: "https://youtu.be/wMBpvYNgj1I?si=JEEqPLNRfWZDEv_B",
    },
  };

  const [comment, setComment] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [comments, setComments] = useState(tutorial.comments);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      name: "You",
      comment,
      date: "Just now",
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {tutorial.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {tutorial.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
            <span>By {tutorial.author}</span>
            <span>•</span>
            <span>{tutorial.date}</span>
            <span>•</span>
            <span>{tutorial.readTime}</span>
          </div>

          {tutorial.image && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={tutorial.image}
                alt={tutorial.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </motion.header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents (hidden on mobile) */}
          <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-bold mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                {tutorial.content
                  .match(/<h[2-3]>(.*?)<\/h[2-3]>/g)
                  ?.map((heading, i) => {
                    const text = heading.replace(/<\/?h[2-3]>/g, "");
                    const isH2 = heading.startsWith("<h2>");
                    return (
                      <li
                        key={i}
                        className={isH2 ? "font-medium" : "pl-4 text-sm"}
                      >
                        <a
                          href={`#${text.toLowerCase().replace(/\s+/g, "-")}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {text}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: tutorial.content }}
            />

            {/* Podcast/Video Section */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">
                Watch/Listen to the Podcast
              </h2>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setShowVideo(false)}
                    className={`px-4 py-2 rounded-lg ${
                      !showVideo
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    Audio Version
                  </button>
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`px-4 py-2 rounded-lg ${
                      showVideo
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    Video Version
                  </button>
                </div>

                {showVideo ? (
                  <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={convertToEmbedUrl(tutorial.podcast.videoUrl)}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">
                      {tutorial.podcast.title}
                    </h3>
                    <audio controls className="w-full mt-4">
                      <source
                        src={tutorial.podcast.videoUrl}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            </section>

            {/* Comments Section */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">
                Discussion ({comments.length})
              </h2>

              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 mb-4"
                  rows={4}
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">{item.name}</h4>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* Become an Author CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Become an Author and Earn Money
            </h2>
            <p className="mb-8 text-blue-100">
              Share your knowledge with our community and get paid for your
              tutorials. Join our author program and start earning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Join Our Authors
              </a>
              <a
                href="/how-it-works"
                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
