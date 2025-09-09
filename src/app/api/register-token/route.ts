// src/app/api/register-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  try {
    await prisma.token.upsert({
      where: { token },
      update: {},
      create: { token },
    });
    return NextResponse.json({ message: 'Token registered' });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ error: 'Failed to save token' }, { status: 500 });
  }
}
