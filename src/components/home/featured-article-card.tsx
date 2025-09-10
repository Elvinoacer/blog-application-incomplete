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
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || fallbackImage}
          alt={topic}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{topic}</h3>
        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Autoblog</p>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;