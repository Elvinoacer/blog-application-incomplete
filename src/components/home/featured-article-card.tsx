import Image from 'next/image';
import Link from 'next/link';

interface FeaturedArticleCardProps {
  id: string;
  topic: string;
  imageUrl: string | null;
}

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({ id, topic, imageUrl }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1585079374502-431f8a3c9338?q=80&w=2070&auto=format&fit=crop';

  return (
    <Link href={`/autoblogs/${id}`} className="group block overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="relative h-48 w-full md:w-64">
            <Image
              src={imageUrl || fallbackImage}
              alt={topic}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Autoblog</div>
          <h3 className="mt-1 block text-2xl font-bold leading-tight text-black dark:text-white">{topic}</h3>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-300">Read more &rarr;</p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;