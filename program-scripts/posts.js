// generate-posts.js
const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generatePosts = (count) => {
  const techTopics = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "Vue",
    "Angular",
    "Svelte",
    "GraphQL",
    "REST API",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "AWS",
    "Docker",
    "Kubernetes",
    "Machine Learning",
    "AI",
    "CSS",
    "Tailwind",
    "SASS",
    "Webpack",
    "Babel",
    "Jest",
    "Testing",
    "CI/CD",
    "Git",
    "GitHub",
    "DevOps",
  ];

  return faker.helpers.multiple(
    () => {
      const topic = faker.helpers.arrayElement(techTopics);
      const title = `${faker.helpers.arrayElement([
        "Getting Started with",
        "Advanced Techniques in",
        "The Complete Guide to",
        "Best Practices for",
        "Understanding",
        "Mastering",
        "10 Tips for",
        "Common Mistakes in",
        "How to Optimize",
        "Deep Dive into",
      ])} ${topic}`;

      return {
        id: faker.string.uuid(),
        title,
        excerpt: faker.lorem.paragraphs({ min: 1, max: 2 }),
        slug: faker.helpers.slugify(title).toLowerCase(),
        date: faker.date
          .between({ from: "2020-01-01", to: "2023-12-31" })
          .toISOString()
          .split("T")[0],
        readingTime: faker.number.int({ min: 3, max: 20 }),
        tags: [
          topic,
          faker.helpers.arrayElement(techTopics.filter((t) => t !== topic)),
          faker.helpers.arrayElement([
            "Web Development",
            "Programming",
            "Tutorial",
            "Guide",
          ]),
        ],
        author: {
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
        },
        content: Array.from(
          { length: faker.number.int({ min: 3, max: 10 }) },
          () =>
            `<h2>${faker.lorem.sentence()}</h2><p>${faker.lorem.paragraphs({
              min: 1,
              max: 3,
            })}</p>`
        ).join(""),
      };
    },
    { count }
  );
};

const posts = generatePosts(1000);

fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2), "utf-8");
console.log("Successfully generated 1000 posts and saved to posts.json");
