import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { generateTechReportHTML } from '@/lib/htmlv2';

// This helper function generates the raw HTML for the related articles section.
// It includes its own styling to be injected alongside the main report HTML.
const generateRelatedArticlesHTML = (articles: any[]) => {
  if (articles.length === 0) {
    return '';
  }

  const cardsHtml = articles.map(blog => {
    const imageUrl = (blog.images && Array.isArray(blog.images) && blog.images.length > 0)
        ? (blog.images[0] as any).url
        : 'https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop';
    return `
    <a href="/autoblogs/${blog.id}" class="featured-card-link">
      <div class="featured-card group relative block h-64 w-full overflow-hidden rounded-xl bg-cover bg-center text-white shadow-lg">
        <img src="${imageUrl}" alt="${blog.topic}" class="featured-card-image" />
        <div class="featured-card-overlay"></div>
        <div class="featured-card-content">
          <h3 class="text-xl font-bold tracking-tight">${blog.topic}</h3>
        </div>
      </div>
    </a>
  `}).join('');

  return `
    <style>
      .related-articles-wrapper {
        font-family: 'Poppins', sans-serif;
        margin-top: 5rem;
        padding-top: 3rem;
        border-top: 1px solid rgba(120, 81, 255, 0.2);
      }
      .related-articles-title {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        background: linear-gradient(90deg, #8A2BE2, #4169E1, #00FFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        color: #E0E0E0;
      }
      .related-articles-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
      }
      @media (min-width: 768px) {
        .related-articles-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .related-articles-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .featured-card-link { text-decoration: none; }
      .featured-card-image {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease-in-out;
      }
      .featured-card:hover .featured-card-image {
        transform: scale(1.1);
      }
      .featured-card-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0,0,0,0.5);
        transition: background-color 0.3s ease-in-out;
      }
      .featured-card:hover .featured-card-overlay { background-color: rgba(0,0,0,0.6); }
      .featured-card-content { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 1.5rem; }
    </style>
    <div class="container related-articles-wrapper">
      <h2 class="related-articles-title">Related Articles</h2>
      <div class="related-articles-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
};

export default async function AutoblogPage({ params }: { params: { id: string } }) {
  
  const [autoblog, relatedArticles] = await Promise.all([
    prisma.autoblog.findUnique({
      where: { id: params.id },
    }),
    prisma.autoblog.findMany({
      where: { id: { not: params.id } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
  ]);

  if (!autoblog) {
    notFound();
  }

  const reportData = {
      topic: autoblog.topic,
      detailedReport: autoblog.detailedReport,
      links: autoblog.links as any[],
      images: autoblog.images as any[],
      videos: autoblog.videos as any[],
  }

  // Generate the main HTML content
  const mainHtml = generateTechReportHTML(reportData as any);

  // Generate the HTML for the related articles section
  const relatedArticlesHtml = generateRelatedArticlesHTML(relatedArticles);

  // Inject the related articles HTML just before the closing body tag of the main report
  const finalHtml = mainHtml.replace(
    '</body>',
    `${relatedArticlesHtml}</body>`
  );

  return (
    <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
  );
}
