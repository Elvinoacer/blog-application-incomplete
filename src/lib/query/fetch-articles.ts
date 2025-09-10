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
      select: {
        id: true,
        title: true,
        category: true,
        featuredImage: true,
        createdAt: true,
        content: true,
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
      select: {
        id: true,
        topic: true,
        detailedReport: true,
        images: true,
        createdAt: true,
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

  const articleIds = articles.map(a => a.id);
  const autoblogIds = autoblogs.map(a => a.id);

  const articleViews = await prisma.visitor.groupBy({
    by: ['articleId'],
    where: { articleId: { in: articleIds } },
    _count: {
      articleId: true,
    },
  });

  const autoblogViews = await prisma.visitor.groupBy({
    by: ['autoblogId'],
    where: { autoblogId: { in: autoblogIds } },
    _count: {
      autoblogId: true,
    },
  });

  const articleViewMap = new Map(articleViews.map(v => [v.articleId, v._count.articleId]));
  const autoblogViewMap = new Map(autoblogViews.map(v => [v.autoblogId, v._count.autoblogId]));

  const results = [
    ...articles.map(article => ({ ...article, type: 'article', views: articleViewMap.get(article.id) || 0 })),
    ...autoblogs.map(autoblog => ({ ...autoblog, type: 'autoblog', views: autoblogViewMap.get(autoblog.id) || 0 }))
  ];

  return { articles: results, total: totalArticles + totalAutoblogs };
};