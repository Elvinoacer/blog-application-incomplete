import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Using the singleton prisma instance
import { sendBulkyNotification } from '@/lib/notifications';

/**
 * Handles GET requests to fetch all autoblog entries from the database.
 * @returns {Promise<NextResponse>} A JSON response containing the list of autoblogs or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');

  try {
    const autoblogs = await prisma.autoblog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit, 10) : undefined,
    });

    if (autoblogs.length > 0) {
      // Sending a notification whenever autoblogs are fetched.
      // This is not ideal, but it is what the user requested.
      await sendBulkyNotification(autoblogs[0].topic, 'A new article is available!');
    }

    return NextResponse.json(autoblogs);

  } catch (error) {
    console.error('Failed to fetch autoblogs:', error);
    return new NextResponse('Internal Server Error: Could not fetch autoblogs.', { status: 500 });
  }
}
