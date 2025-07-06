// generate-authors.js
const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateAuthors = (count) => {
  const techTopics = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Web Development",
    "CSS",
    "Accessibility",
    "Design Systems",
    "Testing",
    "DevOps",
    "Cloud Computing",
    "UI/UX",
    "Performance",
    "Security",
    "Mobile Development",
    "Database",
    "GraphQL",
    "REST",
  ];

  const socialPlatforms = [
    { name: "Twitter", icon: "twitter", domain: "twitter.com" },
    { name: "GitHub", icon: "github", domain: "github.com" },
    { name: "LinkedIn", icon: "linkedin", domain: "linkedin.com" },
    { name: "Medium", icon: "medium", domain: "medium.com" },
    { name: "Dev.to", icon: "dev", domain: "dev.to" },
  ];

  return faker.helpers.multiple(
    () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet
        .username({ firstName, lastName })
        .toLowerCase();
      const experienceYears = faker.number.int({ min: 1, max: 20 });
      const specialtyCount = faker.number.int({ min: 1, max: 5 });

      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        avatar: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${faker.helpers.arrayElement(
          ["male", "female"]
        )}/${faker.number.int({ min: 1, max: 100 })}.jpg`,
        role: faker.helpers.arrayElement([
          "Senior Writer",
          "Technical Editor",
          "Content Creator",
          "Developer Advocate",
          "Engineering Blogger",
          "Tech Journalist",
          "Documentation Specialist",
        ]),
        bio: `${firstName} has been writing about ${faker.helpers.arrayElement([
          "technology",
          "software development",
          "web technologies",
        ])} for over ${experienceYears} years. ${faker.helpers.arrayElement([
          `They specialize in ${faker.helpers
            .arrayElements(techTopics, specialtyCount)
            .join(", ")}.`,
          `Their expertise includes ${faker.helpers
            .arrayElements(techTopics, specialtyCount)
            .join(", ")}.`,
          `They focus on ${faker.helpers
            .arrayElements(techTopics, specialtyCount)
            .join(", ")}.`,
        ])}`,
        tags: faker.helpers.arrayElements(
          techTopics,
          faker.number.int({ min: 2, max: 5 })
        ),
        socialLinks: faker.helpers
          .arrayElements(socialPlatforms, faker.number.int({ min: 1, max: 3 }))
          .map((platform) => ({
            name: platform.name,
            url: `https://${platform.domain}/${username}`,
            icon: platform.icon,
          })),
      };
    },
    { count }
  );
};

const authors = generateAuthors(1000);

fs.writeFileSync("authors.json", JSON.stringify(authors, null, 2), "utf-8");
console.log("Successfully generated 1000 authors and saved to authors.json");
