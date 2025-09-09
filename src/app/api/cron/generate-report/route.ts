import { NextResponse } from "next/server";
import { generateReport } from "../../../../../program-scripts/html-generator";

// This function is the entry point for the Vercel Cron Job.
export async function GET() {
  try {
    console.log("CRON_JOB_STARTED: Report generation initiated.");

    // Await the report generation process.
    await generateReport();

    console.log(
      "CRON_JOB_SUCCESS: Report has been successfully generated and saved."
    );

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
