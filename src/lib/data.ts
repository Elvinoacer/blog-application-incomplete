export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  date: string;
  duration: string;
  videoUrl: string;
  tags: string[];
  isFeatured?: boolean;
  episodeNumber: number;
  content: string;
}

export const podcastData: Podcast[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    description:
      "In this episode, we cover the basics of Next.js and why it's become so popular for React developers.",
    imageUrl:
      "https://images.unsplash.com/photo-1745433972680-6f4d34b602c3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "/audios/mitchell-obama.mp3",
    videoUrl: "https://www.youtube.com/watch?v=D67eWcX2XYQ&t=151s",
    date: "May 15, 2023",
    duration: "42 min",
    tags: ["Next.js", "React", "Web Development"],
    isFeatured: true,
    episodeNumber: 23,
    content:
      "<p>In this episode, we dive deep into Next.js, the React framework for production. We cover topics like:</p><ul><li>Setting up a new Next.js project</li><li>Understanding the pages directory</li><li>Static Site Generation vs Server Side Rendering</li><li>API routes</li><li>Deployment options</li></ul>",
  },
  {
    id: "2",
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    description:
      "Learn how to build beautiful, responsive interfaces quickly with Tailwind CSS.",
    imageUrl:
      "https://images.unsplash.com/photo-1744871358126-0b5acac38ef6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    audioUrl: "/audios/mitchell-obama.mp3",
    videoUrl: "https://www.youtube.com/watch?v=D67eWcX2XYQ&t=151s",
    date: "April 28, 2023",
    duration: "38 min",
    tags: ["Tailwind CSS", "CSS", "Frontend"],
    episodeNumber: 22,
    content:
      "<p>Tailwind CSS has revolutionized how many developers approach styling. In this episode we discuss:</p><ul><li>Utility-first CSS concepts</li><li>Customizing your design system</li><li>Responsive design patterns</li><li>Optimizing for production</li><li>Common pitfalls to avoid</li></ul>",
  },
  // Add more podcasts as needed
];
