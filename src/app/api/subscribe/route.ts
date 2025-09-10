import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse('Email is required', { status: 400 });
  }

  try {
    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });
    return NextResponse.json(newSubscriber, { status: 201 });
  } catch (error) {
    console.error(error);
    // Check if the error is due to a unique constraint violation
    if (error.code === 'P2002') {
      return new NextResponse('Email already subscribed', { status: 409 });
    }
    return new NextResponse('Error subscribing', { status: 500 });
  }
}
