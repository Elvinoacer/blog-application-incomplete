import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      select: {
        email: true,
      },
    });
    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching subscribers', { status: 500 });
  }
}
