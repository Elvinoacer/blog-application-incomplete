import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Using the singleton prisma instance

/**
 * Handles GET requests to fetch all autoblog entries from the database.
 * @returns {Promise<NextResponse>} A JSON response containing the list of autoblogs or an error message.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
  const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;

  try {
    const autoblogs = await prisma.autoblog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take,
      skip,
    });

    const total = await prisma.autoblog.count();

    return NextResponse.json({ autoblogs, total });

  } catch (error) {
    console.error('Failed to fetch autoblogs:', error);
    return new NextResponse('Internal Server Error: Could not fetch autoblogs.', { status: 500 });
  }
}
