// Example data structure - replace with your actual data fetching
import posts from "../data/posts.json";
import authors from "../data/authors.json";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  tags?: string[];
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readingTime: number;
}

export async function getAuthors(): Promise<Author[]> {
  // Replace with your actual data fetching
  return authors; /**[
    {
      id: "1",
      name: "Jane Doe",
      avatar:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
      role: "Senior Writer",
      bio: "Jane has been writing about technology for over 10 years. She specializes in web development and design systems.",
      tags: ["React", "CSS", "Accessibility"],
      socialLinks: [
        { name: "Twitter", url: "#", icon: "twitter" },
        { name: "GitHub", url: "#", icon: "github" },
      ],
    },
    // Add more authors
  ];
  */
}
export async function getAuthor(id: string): Promise<Author | null> {
  const authors = await getAuthors();
  return authors.find((author) => author.id === id) || null;
}

export async function getAuthorPosts(authorId: string): Promise<Post[]> {
  // Replace with your actual data fetching
  return posts;

  /**
   * [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      slug: "getting-started-with-nextjs",
      date: "2023-05-15",
      readingTime: 5,
    },
  ];
   */
}
