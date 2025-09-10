import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id: visitorId,
      isFirstVisit,
      firstVisitDate,
      lastVisitDate,
      visitCount,
      country,
      countryCode,
      type,
      url,
      title,
    } = body;

    if (type === 'page_view') {
      // Handle page view tracking
      const pageViewData = {
        url,
        title,
        timestamp: new Date(),
      };

      await prisma.visitor.update({
        where: { visitorId },
        data: {
          pageViews: {
            push: pageViewData,
          },
        },
      });
    } else {
      // Handle first visit or return visit
      const visitor = await prisma.visitor.findUnique({
        where: { visitorId },
      });

      const { articleId, autoblogId } = body;

      if (visitor) {
        // Update existing visitor
        await prisma.visitor.update({
          where: { visitorId },
          data: {
            lastVisitDate,
            visitCount,
          },
        });
      } else {
        // Create new visitor
        await prisma.visitor.create({
          data: {
            visitorId,
            isFirstVisit,
            firstVisitDate,
            lastVisitDate,
            visitCount,
            country,
            countryCode,
            articleId,
            autoblogId,
          },
        });
      }
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { message: 'Error tracking visitor' },
      { status: 500 }
    );
  }
}
