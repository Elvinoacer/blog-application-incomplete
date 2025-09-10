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
        const emailHtml = `
          <h1>${newBlog.topic}</h1>
          <p>A new blog post has been published on our website.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/autoblogs/${newBlog.id}">Read it here</a>
        `;

        for (const subscriber of subscribers) {
          await sendEmail(subscriber.email, emailSubject, emailHtml);
        }
      }
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

