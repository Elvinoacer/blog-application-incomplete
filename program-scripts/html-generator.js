const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { getTopicAndImage } = require("./topic-generator.js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const prisma = new PrismaClient();

const fetchData = async (topic) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_WEBSCRAPE_URL || "http://localhost:3000/scrape",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      }
    );
    return await response.json();
  } catch (error) {
    return {
      error: "An error occurred while processing your request.",
      details: error.message,
    };
  }
};

const generateReport = async () => {
  let retries = 5;

  while (retries > 0) {
    const { topic, imageUrl } = await getTopicAndImage();
    console.log(`Fetching data for topic: "${topic}"`);
    const rawData = await fetchData(topic);

    let data;
    if (typeof rawData === "string") {
      try {
        data = JSON.parse(rawData);
      } catch (e) {
        console.error(
          "Received data is a malformed string, cannot parse. Retrying..."
        );
        retries--;
        continue;
      }
    } else {
      data = rawData;
    }

    if (data && !data.error) {
      try {
        let reportData;

        // Try to extract nested report data
        let nested = null;
        if (typeof data.detailedReport === "string") {
          try {
            nested = JSON.parse(data.detailedReport);
          } catch (e) {
            /* ignore */
          }
        } else if (
          typeof data.detailedReport === "object" &&
          data.detailedReport !== null
        ) {
          nested = data.detailedReport;
        }

        if (
          nested &&
          typeof nested === "object" &&
          "detailedReport" in nested
        ) {
          reportData = nested;
        } else {
          // Fallback to flat structure
          reportData = {
            detailedReport: data.detailedReport,
            links: data.links,
            images: data.images,
            videos: data.videos,
          };
        }

        const images = Array.isArray(reportData.images)
          ? [...reportData.images]
          : [];
        images.unshift({ url: imageUrl, description: "Featured Image" });

        await prisma.autoblog.create({
          data: {
            topic: data.topic,
            detailedReport: reportData.detailedReport || "",
            links: reportData.links || [],
            images: images,
            videos: reportData.videos || [],
          },
        });
        fs.writeFileSync("data.json", JSON.stringify(rawData, null, 2));
        console.log(
          `Successfully saved report for topic "${data.topic}" to the database.`
        );
        return; // Exit successfully
      } catch (e) {
        console.error(
          "Error processing data or creating autoblog. Retrying...",
          e
        );
        retries--;
      }
    } else {
      console.error(
        `Error in fetched data: ${
          data ? data.details : "Unknown error"
        }. Retrying...`
      );
      retries--;
    }
  }

  console.error(
    "Failed to fetch and process data after multiple retries. Aborting."
  );
  process.exit(1);
};

module.exports = { generateReport };
