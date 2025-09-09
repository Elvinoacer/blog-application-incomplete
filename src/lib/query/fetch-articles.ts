import { prisma } from "@/lib/prisma";

export const fetchArticleByQuery = async (searchText: string, skip: number, take: number) => {
  const [articles, autoblogs, totalArticles, totalAutoblogs] = await prisma.$transaction([
    prisma.articles.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
      include: {
        author: {
          select: { name: true, imageUrl: true, email: true },
        },
      },
      skip: skip,
      take: take,
    }),
    prisma.autoblog.findMany({
      where: {
        OR: [
          { topic: { contains: searchText, mode: 'insensitive' } },
          { detailedReport: { contains: searchText, mode: 'insensitive' } },
        ],
      },
      skip: skip,
      take: take,
    }),
    prisma.articles.count({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
    }),
    prisma.autoblog.count({
      where: {
        OR: [
          { topic: { contains: searchText, mode: 'insensitive' } },
          { detailedReport: { contains: searchText, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  const results = [
    ...articles.map(article => ({ ...article, type: 'article' })),
    ...autoblogs.map(autoblog => ({ ...autoblog, type: 'autoblog' }))
  ];

  return { articles: results, total: totalArticles + totalAutoblogs };
};