// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { Podcast } from "@/lib/data";
// import Link from "next/link";

// interface PodcastPageProps {
//   podcast: Podcast;
//   relatedPodcasts: Podcast[];
// }

// export function PodcastPage({ podcast, relatedPodcasts }: PodcastPageProps) {
//   const router = useRouter();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.code === "Space") {
//         e.preventDefault();
//         togglePlayPause();
//       }
//       if (e.code === "Escape" && isFullscreen) {
//         exitFullscreen();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isPlaying, isFullscreen]);

//   // Handle fullscreen change events
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current?.pause();
//     } else {
//       videoRef.current?.play().catch((e) => {
//         console.error("Error playing video:", e);
//         setHasError(true);
//       });
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleFullscreen = async () => {
//     try {
//       if (!isFullscreen) {
//         await videoRef.current?.requestFullscreen();
//       } else {
//         await document.exitFullscreen();
//       }
//     } catch (err) {
//       console.error("Fullscreen error:", err);
//     }
//   };

//   const exitFullscreen = async () => {
//     try {
//       await document.exitFullscreen();
//     } catch (err) {
//       console.error("Exit fullscreen error:", err);
//     }
//   };

//   const handleVideoError = () => {
//     setHasError(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
//       >
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => router.back()}
//             className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-5 h-5 mr-2"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Back to Podcasts
//           </motion.button>
//           <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden md:block">
//             {podcast.title}
//           </h1>
//           <div className="w-5" /> {/* Spacer */}
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col lg:flex-row gap-8"
//         >
//           {/* Video Player Section */}
//           <div className="lg:w-2/3">
//             <motion.div
//               whileHover={{ scale: 1.01 }}
//               className="relative bg-black rounded-xl overflow-hidden shadow-xl"
//             >
//               {hasError ? (
//                 <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center p-4 text-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-12 h-12 text-red-500 mb-4"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     Video Unavailable
//                   </h3>
//                   <p className="text-gray-300">
//                     We couldn't load the video. Please try again later.
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <video
//                     ref={videoRef}
//                     src={podcast.videoUrl}
//                     className="w-full aspect-video"
//                     poster={podcast.imageUrl}
//                     controls={false}
//                     onClick={togglePlayPause}
//                     onError={handleVideoError}
//                   >
//                     <source src={podcast.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>

//                   {/* Custom Controls */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     {!isPlaying && (
//                       <motion.button
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={togglePlayPause}
//                         className="bg-white/20 backdrop-blur-sm rounded-full p-4"
//                         aria-label={isPlaying ? "Pause" : "Play"}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="w-12 h-12 text-white"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </motion.button>
//                     )}
//                   </div>

//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                     <div className="flex justify-between items-center">
//                       <button
//                         onClick={togglePlayPause}
//                         className="text-white hover:text-gray-300 transition-colors"
//                         aria-label={isPlaying ? "Pause" : "Play"}
//                       >
//                         {isPlaying ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="w-8 h-8"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="w-8 h-8"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         )}
//                       </button>

//                       <div className="text-white font-medium">
//                         {podcast.duration}
//                       </div>

//                       <button
//                         onClick={toggleFullscreen}
//                         className="text-white hover:text-gray-300 transition-colors"
//                         aria-label={
//                           isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
//                         }
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="w-8 h-8"
//                         >
//                           {isFullscreen ? (
//                             <path
//                               fillRule="evenodd"
//                               d="M3.22 3.22a.75.75 0 011.06 0l3.97 3.97V4.5a.75.75 0 011.5 0V9a.75.75 0 01-.75.75H4.5a.75.75 0 010-1.5h2.69L3.22 4.28a.75.75 0 010-1.06zm17.56 0a.75.75 0 010 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0zM3.75 15a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-2.69l-3.97 3.97a.75.75 0 01-1.06-1.06l3.97-3.97H4.5a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0V15z"
//                               clipRule="evenodd"
//                             />
//                           ) : (
//                             <path
//                               fillRule="evenodd"
//                               d="M15.75 2.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V4.81L8.03 9.03a.75.75 0 01-1.06-1.06l4.72-4.72H9a.75.75 0 010-1.5h6.75a.75.75 0 01.75.75zm-7.5 4.5a.75.75 0 01.75.75v6.75a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h2.69L1.97 8.03a.75.75 0 011.06-1.06l4.72 4.72V7.5a.75.75 0 01.75-.75zm6 8.25a.75.75 0 01.75-.75h6.75a.75.75 0 010 1.5h-2.69l4.72 4.72a.75.75 0 11-1.06 1.06l-4.72-4.72v2.69a.75.75 0 01-1.5 0v-6.75z"
//                               clipRule="evenodd"
//                             />
//                           )}
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </motion.div>

//             {/* Podcast Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="mt-6"
//             >
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                 {podcast.title}
//               </h1>
//               <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
//                 <span>{podcast.date}</span>
//                 <span className="mx-2">•</span>
//                 <span>{podcast.duration}</span>
//               </div>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {podcast.tags.map((tag, index) => (
//                   <motion.span
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.4 + index * 0.05 }}
//                     className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
//                   >
//                     {tag}
//                   </motion.span>
//                 ))}
//               </div>
//               <div className="prose dark:prose-invert max-w-none">
//                 <h2 className="text-xl font-semibold mb-4">Episode Notes</h2>
//                 <div dangerouslySetInnerHTML={{ __html: podcast.content }} />
//               </div>
//             </motion.div>
//           </div>

//           {/* Sidebar - Related Podcasts */}
//           <div className="lg:w-1/3">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6"
//             >
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                 More Episodes
//               </h2>
//               <div className="space-y-4">
//                 {relatedPodcasts.map((relatedPodcast, index) => (
//                   <motion.div
//                     key={relatedPodcast.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                     whileHover={{ x: 5 }}
//                   >
//                     <Link
//                       href={`/podcasts/${relatedPodcast.slug}`}
//                       className="flex gap-4 group"
//                     >
//                       <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
//                         <img
//                           src={relatedPodcast.imageUrl}
//                           alt={relatedPodcast.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                         />
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                           {relatedPodcast.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           {relatedPodcast.date}
//                         </p>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";

// // Sample podcast data (in a real app, this would come from a database or API)
// const podcasts = [
//   {
//     id: "1",
//     slug: "getting-started-with-nextjs",
//     title: "Getting Started with Next.js",
//     description:
//       "In this episode, we cover the basics of Next.js and why it's become so popular for React developers.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1745433972680-6f4d34b602c3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     audioUrl: "/audios/mitchell-obama.mp3",
//     videoUrl: "https://www.youtube.com/watch?v=D67eWcX2XYQ&t=151s",
//     date: "May 15, 2023",
//     duration: "42 min",
//     tags: ["Next.js", "React", "Web Development"],
//     isFeatured: true,
//     episodeNumber: 23,
//     content:
//       "<p>In this episode, we dive deep into Next.js, the React framework for production. We cover topics like:</p><ul><li>Setting up a new Next.js project</li><li>Understanding the pages directory</li><li>Static Site Generation vs Server Side Rendering</li><li>API routes</li><li>Deployment options</li></ul>",
//   },
//   // Add more sample podcasts for related content
//   {
//     id: "2",
//     slug: "react-hooks-deep-dive",
//     title: "React Hooks: A Deep Dive",
//     description:
//       "Explore the power of React Hooks and how they simplify state management and side effects.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1633356122544-f1348f5f2505?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
//     audioUrl: "/audios/react-hooks.mp3",
//     videoUrl: "https://www.youtube.com/watch?v=example",
//     date: "June 10, 2023",
//     duration: "38 min",
//     tags: ["React", "Web Development", "JavaScript"],
//     isFeatured: false,
//     episodeNumber: 24,
//     content:
//       "<p>This episode explores React Hooks in depth, covering useState, useEffect, and custom hooks.</p>",
//   },
// ];

// // Function to find related podcasts based on tags
// const getRelatedPodcasts = (currentPodcast: (typeof podcasts)[0]) => {
//   return podcasts
//     .filter(
//       (podcast) =>
//         podcast.id !== currentPodcast.id &&
//         podcast.tags.some((tag) => currentPodcast.tags.includes(tag))
//     )
//     .slice(0, 3); // Limit to 3 related podcasts
// };

// export default function PodcastPage({ slug }: { slug: string }) {
//   // Find the podcast by slug
//   const podcast = podcasts.find((p) => p.slug === slug);

//   if (!podcast) {
//     notFound();
//   }

//   const relatedPodcasts = getRelatedPodcasts(podcast);

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="container mx-auto px-4 py-12">
//         {/* Podcast Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col md:flex-row gap-8"
//         >
//           <div className="md:w-1/3">
//             <Image
//               src={podcast.imageUrl}
//               alt={podcast.title}
//               width={400}
//               height={400}
//               className="rounded-lg shadow-lg object-cover w-full"
//             />
//           </div>
//           <div className="md:w-2/3">
//             <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//               Episode {podcast.episodeNumber} • {podcast.date} •{" "}
//               {podcast.duration}
//             </p>
//             <p className="text-lg mb-4">{podcast.description}</p>
//             <div className="flex gap-2 mb-4">
//               {podcast.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//             <div className="flex gap-4">
//               <a
//                 href={podcast.audioUrl}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Listen Now
//               </a>
//               {podcast.videoUrl && (
//                 <a
//                   href={podcast.videoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
//                 >
//                   Watch Video
//                 </a>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Podcast Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mt-12"
//         >
//           <h2 className="text-2xl font-semibold mb-4">Episode Details</h2>
//           <div
//             className="prose dark:prose-invert max-w-none"
//             dangerouslySetInnerHTML={{ __html: podcast.content }}
//           />
//         </motion.div>

//         {/* Related Podcasts */}
//         {relatedPodcasts.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-12"
//           >
//             <h2 className="text-2xl font-semibold mb-6">Related Episodes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {relatedPodcasts.map((related) => (
//                 <Link
//                   key={related.id}
//                   href={`/podcasts/${related.slug}`}
//                   className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
//                 >
//                   <Image
//                     src={related.imageUrl}
//                     alt={related.title}
//                     width={300}
//                     height={200}
//                     className="rounded-lg mb-4 object-cover w-full"
//                   />
//                   <h3 className="text-xl font-medium mb-2">{related.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm">
//                     {related.description.substring(0, 100)}...
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { podcastData as podcasts } from "@/lib/data";

// // Sample podcast data (in a real app, this would come from a database or API)

// // Function to extract YouTube video ID from URL
// const getYouTubeVideoId = (url: string) => {
//   const regex =
//     /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Function to find related podcasts based on tags
// const getRelatedPodcasts = (currentPodcast: (typeof podcasts)[0]) => {
//   return podcasts
//     .filter(
//       (podcast) =>
//         podcast.id !== currentPodcast.id &&
//         podcast.tags.some((tag) => currentPodcast.tags.includes(tag))
//     )
//     .slice(0, 3); // Limit to 3 related podcasts
// };

// export default function PodcastPage({ slug }: { slug: string }) {
//   // Find the podcast by slug
//   const podcast = podcasts.find((p) => p.slug === slug);

//   if (!podcast) {
//     notFound();
//   }

//   const relatedPodcasts = getRelatedPodcasts(podcast);
//   const youtubeVideoId = podcast.videoUrl
//     ? getYouTubeVideoId(podcast.videoUrl)
//     : null;

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
//       <div className="container mx-auto px-4 py-12">
//         {/* Podcast Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col md:flex-row gap-8"
//         >
//           <div className="md:w-1/3">
//             <Image
//               src={podcast.imageUrl}
//               alt={podcast.title}
//               width={400}
//               height={400}
//               className="rounded-lg shadow-lg object-cover w-full"
//             />
//           </div>
//           <div className="md:w-2/3">
//             <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">
//               Episode {podcast.episodeNumber} • {podcast.date} •{" "}
//               {podcast.duration}
//             </p>
//             <p className="text-lg mb-4">{podcast.description}</p>
//             <div className="flex gap-2 mb-4">
//               {podcast.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//             <div className="flex gap-4">
//               <a
//                 href={podcast.audioUrl}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Listen Now
//               </a>
//             </div>
//           </div>
//         </motion.div>

//         {/* Video Player */}
//         {youtubeVideoId && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mt-8"
//           >
//             <h2 className="text-2xl font-semibold mb-4">Watch the Episode</h2>
//             <div className="relative aspect-video">
//               <iframe
//                 src={`https://www.youtube.com/embed/${youtubeVideoId}`}
//                 title={podcast.title}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full rounded-lg shadow-lg"
//               />
//             </div>
//           </motion.div>
//         )}

//         {/* Podcast Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mt-12"
//         >
//           <h2 className="text-2xl font-semibold mb-4">Episode Details</h2>
//           <div
//             className="prose dark:prose-invert max-w-none"
//             dangerouslySetInnerHTML={{ __html: podcast.content }}
//           />
//         </motion.div>

//         {/* Related Podcasts */}
//         {relatedPodcasts.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-12"
//           >
//             <h2 className="text-2xl font-semibold mb-6">Related Episodes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {relatedPodcasts.map((related) => (
//                 <Link
//                   key={related.id}
//                   href={`/podcasts/${related.slug}`}
//                   className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
//                 >
//                   <Image
//                     src={related.imageUrl}
//                     alt={related.title}
//                     width={300}
//                     height={200}
//                     className="rounded-lg mb-4 object-cover w-full"
//                   />
//                   <h3 className="text-xl font-medium mb-2">{related.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm">
//                     {related.description.substring(0, 100)}...
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { podcastData as podcasts } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to find related podcasts based on tags
const getRelatedPodcasts = (currentPodcast: (typeof podcasts)[0]) => {
  return podcasts
    .filter(
      (podcast) =>
        podcast.id !== currentPodcast.id &&
        podcast.tags.some((tag) => currentPodcast.tags.includes(tag))
    )
    .slice(0, 3); // Limit to 3 related podcasts
};

export default function PodcastPage({ slug }: { slug: string }) {
  // Find the podcast by slug
  const podcast = podcasts.find((p) => p.slug === slug);

  if (!podcast) {
    notFound();
  }

  const relatedPodcasts = getRelatedPodcasts(podcast);
  const youtubeVideoId = podcast.videoUrl
    ? getYouTubeVideoId(podcast.videoUrl)
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/podcasts"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Podcasts
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                width={400}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full max-w-md mx-auto"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-8"
            >
              <h2 className="text-xl font-semibold mb-4">Episode Details</h2>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: podcast.content }}
              />
            </motion.div>
          </div>

          {/* Right Column - Main content and video */}
          <div className="lg:w-2/3">
            {/* Top Section - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {podcast.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                  Episode {podcast.episodeNumber}
                </span>
                <span>{podcast.date}</span>
                <span>•</span>
                <span>{podcast.duration}</span>
              </div>

              <p className="text-lg mb-4">{podcast.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {podcast.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/podcasts/${podcast.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Listen Audio
                </Link>
                {podcast.videoUrl && (
                  <a
                    href={podcast.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 py-3 rounded-lg transition flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                    </svg>
                    Watch on YouTube
                  </a>
                )}
              </div>
            </motion.div>

            {/* Bottom Section - Video */}
            {youtubeVideoId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Watch the Episode
                </h2>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?modestbranding=1&rel=0`}
                    title={podcast.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Podcasts */}
        {relatedPodcasts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Related Episodes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPodcasts.map((related) => (
                <Link
                  key={related.id}
                  href={`/podcasts/${related.slug}`}
                  className="block border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2 mb-2">
                      <span>Episode {related.episodeNumber}</span>
                      <span>•</span>
                      <span>{related.duration}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
