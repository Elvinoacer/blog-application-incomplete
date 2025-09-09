const OpenAI = require('openai');
const axios = require('axios');
require('dotenv').config();

const getTopicAndImage = async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set. Please add it to your environment variables.');
    // Fallback for topic if OpenAI key is missing
    const topic = "The Importance of Setting Up API Keys";
    const imageUrl = "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";
    return { topic, imageUrl };
  }

  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  let topic;
  try {
    // Step 1: Generate a topic
    const topicResponse = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that provides trending technology topics. Your response should be a single, interesting tech topic, no more than 10 words long. Do not include any introductory text or quotation marks.'
        },
        {
          role: 'user',
          content: 'Give me a compelling, modern technology topic.'
        }
      ],
    });
    topic = topicResponse.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching topic from OpenAI:", error);
    // Fallback topic in case of error
    topic = "Error Fetching Topic";
    const imageUrl = "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";
    return { topic, imageUrl };
  }

  // Step 2: Find an image on Unsplash based on the topic
  if (!process.env.UNSPLASH_API_KEY) {
    console.warn('UNSPLASH_API_KEY is not set. Using fallback image.');
    const imageUrl = "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";
    return { topic, imageUrl };
  }

  try {
    const unsplashResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: topic,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
      }
    });

    let imageUrl;
    if (unsplashResponse.data.results && unsplashResponse.data.results.length > 0) {
      imageUrl = unsplashResponse.data.results[0].urls.regular;
    } else {
      console.warn(`No image found on Unsplash for topic: "${topic}". Using fallback image.`);
      imageUrl = "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";
    }
    
    return { topic, imageUrl };

  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    const imageUrl = "https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop";
    return { topic, imageUrl };
  }
};

module.exports = { getTopicAndImage };
