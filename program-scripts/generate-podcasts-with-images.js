// require('dotenv').config();
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = "vN1106m4c7Ujug8GxHI4xIgrPpGiDpKKwIzllyscatI";
const UNSPLASH_BASE_URL = "https://api.unsplash.com";

async function fetchUnsplashImage(searchQuery) {
  try {
    const response = await axios.get(`${UNSPLASH_BASE_URL}/photos/`, {
      params: {
        query: searchQuery,
        orientation: "square",
        count: 30,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data[0].urls.regular; // Note the [0] since we requested count=1
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error.message);
    // Fallback to generic placeholder
    return `https://source.unsplash.com/random/800x800/?${searchQuery}`;
  }
}

async function generatePodcasts(count) {
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
    "AI",
    "Startups",
    "Design",
    "Security",
    "DevOps",
    "Mobile",
    "Data Science",
  ];

  const podcasts = [];

  for (let i = 0; i < count; i++) {
    const searchQuery = faker.helpers.arrayElement([
      "podcast",
      "microphone",
      "recording",
      "studio",
      "audio",
      "tech",
    ]);

    const title = `${faker.hacker.phrase()} ${faker.helpers.arrayElement([
      "Explained",
      "Deep Dive",
      "Unpacked",
      "Decoded",
    ])}`;

    const durationHours = faker.number.int({ min: 0, max: 2 });
    const durationMinutes = faker.number.int({ min: 5, max: 59 });
    const durationSeconds = faker.number.int({ min: 0, max: 59 });

    // Fetch actual image from Unsplash API
    const imageUrl = await fetchUnsplashImage(searchQuery);

    const podcast = {
      id: uuidv4(),
      slug: faker.helpers.slugify(title).toLowerCase(),
      title,
      description: faker.lorem.paragraphs(3),
      imageUrl,
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
    };

    podcasts.push(podcast);
    console.log(`Generated podcast ${i + 1}/${count} - ${title}`);

    // Rate limiting - be nice to Unsplash API
    await new Promise((resolve) => setTimeout(resolve, 500)); // Increased delay to 500ms
  }

  return podcasts;
}

(async () => {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      throw new Error("Unsplash access key not found in .env file");
    }

    const podcasts = await generatePodcasts(30);
    fs.writeFileSync(
      "podcasts-with-images.json",
      JSON.stringify(podcasts, null, 2)
    );
    console.log(
      "Successfully generated 100 podcasts with real Unsplash images!"
    );
  } catch (error) {
    console.error("Error generating podcasts:", error.message);
    process.exit(1);
  }
})();
