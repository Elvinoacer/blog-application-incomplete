import { NextResponse } from "next/server";
import { generateReport } from "../../../../../program-scripts/html-generator";
import { sendEmail } from "@/lib/email";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This function is the entry point for the Vercel Cron Job.
export async function GET() {
  try {
    console.log("CRON_JOB_STARTED: Report generation initiated.");

    // Await the report generation process.
    const newBlog = await generateReport();

    if (newBlog) {
      console.log(
        "CRON_JOB_SUCCESS: Report has been successfully generated and saved."
      );

      // Fetch all subscribers
      const subscribers = await prisma.subscriber.findMany({
        select: {
          email: true,
        },
      });

      if (subscribers.length > 0) {
        const emailSubject = `New Blog Post: ${newBlog.topic}`;
        const description = newBlog.detailedReport.split('\n')[0];
        const imageUrl = newBlog.images[0]?.url;

        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="padding: 20px; text-align: center; background-color: #f7f7f7;">
              <h1 style="color: #333;">${newBlog.topic}</h1>
            </div>
            ${imageUrl ? `<img src="${imageUrl}" alt="${newBlog.topic}" style="width: 100%;">` : ''}
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #555;">${description}</p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/autoblogs/${newBlog.id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Read More</a>
            </div>
          </div>
        `;

        for (const subscriber of subscribers) {
          await sendEmail(subscriber.email, emailSubject, emailHtml);
        }
      }

      // Send push notification
      const notificationTitle = `New Post: ${newBlog.topic}`;
      const notificationBody = newBlog.detailedReport.split('\n')[0];
      const notificationImageUrl = newBlog.images[0]?.url;

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notificationTitle,
          body: notificationBody,
          imageUrl: notificationImageUrl,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/autoblogs/${newBlog.id}`
        }),
      });
    }

    // Return a success response.
    return NextResponse.json({ message: "Cron job completed successfully." });
  } catch (error) {
    // Log any errors that occur during the process.
    console.error(
      "CRON_JOB_ERROR: An error occurred during report generation.",
      error
    );

    // Return an error response.
    return new NextResponse("An error occurred during report generation.", {
      status: 500,
    });
  }
}

