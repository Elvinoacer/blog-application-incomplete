// generate-podcasts.js
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const generatePodcasts = (count) => {
  const categories = [
    "Technology",
    "Business",
    "Science",
    "Health",
    "Entertainment",
    "News",
    "Education",
    "Arts",
    "Sports",
    "Comedy",
  ];

  const podcastTags = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Web Development",
    "AI",
    "Machine Learning",
    "Startups",
    "Productivity",
    "Design",
    "Security",
    "DevOps",
    "Cloud",
    "Mobile",
    "Data Science",
  ];

  return Array.from({ length: count }, (_, i) => {
    const title = `${faker.hacker.phrase()} ${faker.helpers.arrayElement([
      "Explained",
      "Deep Dive",
      "Unpacked",
      "Decoded",
      "Revealed",
      "Demystified",
    ])}`;

    const durationHours = faker.number.int({ min: 0, max: 2 });
    const durationMinutes = faker.number.int({ min: 5, max: 59 });
    const durationSeconds = faker.number.int({ min: 0, max: 59 });

    return {
      id: uuidv4(),
      slug: faker.helpers.slugify(title).toLowerCase(),
      title,
      description: faker.lorem.paragraphs(3),
      imageUrl: `https://source.unsplash.com/random/800x800/?podcast,${faker.helpers.arrayElement(
        ["tech", "microphone", "studio", "recording"]
      )}&sig=${i}`,
      audioUrl: `https://example.com/audio/${uuidv4()}.mp3`,
      date: faker.date
        .between({ from: "2022-01-01", to: "2023-12-31" })
        .toISOString(),
      duration: `${
        durationHours > 0 ? `${durationHours}:` : ""
      }${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`,
      tags: faker.helpers.arrayElements(
        podcastTags,
        faker.number.int({ min: 2, max: 5 })
      ),
      isFeatured: faker.datatype.boolean({ probability: 0.2 }),
      episodeNumber: i + 1,
      content: Array.from(
        { length: faker.number.int({ min: 3, max: 8 }) },
        () =>
          `<h2>${faker.lorem.sentence()}</h2><p>${faker.lorem.paragraphs(
            faker.number.int({ min: 1, max: 3 })
          )}</p>`
      ).join(""),
      category: faker.helpers.arrayElement(categories),
      guests: Array.from(
        { length: faker.number.int({ min: 0, max: 3 }) },
        () => ({
          name: faker.person.fullName(),
          title: faker.person.jobTitle(),
          company: faker.company.name(),
          twitter: `@${faker.internet.username()}`,
        })
      ),
      transcript: faker.lorem.paragraphs(10),
      relatedLinks: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => ({
          title: faker.lorem.sentence(),
          url: faker.internet.url(),
          description: faker.lorem.sentence(),
        })
      ),
    };
  });
};

const podcasts = generatePodcasts(100);

fs.writeFileSync("podcasts.json", JSON.stringify(podcasts, null, 2), "utf-8");
console.log("Successfully generated 100 podcasts and saved to podcasts.json");
