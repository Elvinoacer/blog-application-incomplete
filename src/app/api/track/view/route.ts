import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, autoblogId, articleId } = body;

    if (!visitorId) {
      return NextResponse.json(
        { message: 'Visitor ID is required' },
        { status: 400 }
      );
    }

    let updateData: any = {
      lastVisitDate: new Date(),
    };

    if (autoblogId) {
      updateData.autoblogId = autoblogId;
    }

    if (articleId) {
      updateData.articleId = articleId;
    }

    await prisma.visitor.upsert({
      where: { visitorId },
      update: updateData,
      create: {
        visitorId,
        isFirstVisit: false,
        firstVisitDate: new Date(),
        lastVisitDate: new Date(),
        visitCount: 1,
        ...updateData,
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json(
      { message: 'Error tracking view' },
      { status: 500 }
    );
  }
}
