// "use client";
// import { PodcastCard } from "./_components/PodcastCard";
// import { FeaturedPodcast } from "./_components/FeaturedPodcast";
// import { motion } from "framer-motion";
// import { podcastData } from "@/lib/data";

// export default function PodcastsPage() {
//   const featuredPodcast = podcastData.find((podcast) => podcast.isFeatured);
//   const regularPodcasts = podcastData.filter((podcast) => !podcast.isFeatured);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-16"
//       >
//         <h1 className="text-4xl font-bold text-center mb-4">Podcasts</h1>
//         <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
//           Listen to our latest episodes and dive deep into interesting topics
//           with our guests.
//         </p>
//       </motion.div>

//       {featuredPodcast && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <FeaturedPodcast podcast={featuredPodcast} />
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//         className="mt-16"
//       >
//         <h2 className="text-2xl font-semibold mb-8">All Episodes</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {regularPodcasts.map((podcast, index) => (
//             <PodcastCard key={podcast.id} podcast={podcast} index={index} />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";
import { PodcastCard } from "./_components/PodcastCard";
import { FeaturedPodcast } from "./_components/FeaturedPodcast";
import { motion } from "framer-motion";
import { podcastData } from "@/lib/data";
import { RelatedPodcasts } from "./_components/related-posts";

export default function PodcastsPage() {
  const featuredPodcast = podcastData.find((podcast) => podcast.isFeatured);
  const regularPodcasts = podcastData.filter((podcast) => !podcast.isFeatured);

  return (
    <>
      <div className="container mx-auto px-4 py-12 bg-background dark:bg-gray-900 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Podcasts
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Listen to our latest episodes and dive deep into interesting topics
            with our guests.
          </p>
        </motion.div>

        {featuredPodcast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FeaturedPodcast podcast={featuredPodcast} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            All Episodes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPodcasts.map((podcast, index) => (
              <PodcastCard key={podcast.id} podcast={podcast} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
      <RelatedPodcasts podcasts={podcastData} />
    </>
  );
}
