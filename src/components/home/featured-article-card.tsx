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
    <Link href={`/autoblogs/${id}`} className="featured-card group relative block h-64 w-full overflow-hidden rounded-xl bg-cover bg-center text-white shadow-lg">
      <Image
        src={imageUrl || fallbackImage}
        alt={topic}
        layout="fill"
        objectFit="cover"
        className="transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-60"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <h3 className="text-xl font-bold tracking-tight">{topic}</h3>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;