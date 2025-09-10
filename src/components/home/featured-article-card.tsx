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
    <Link href={`/autoblogs/${id}`} className="group block overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || fallbackImage}
          alt={topic}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold tracking-tight text-foreground">{topic}</h3>
        <p className="mt-2 text-sm text-muted-foreground">Autoblog</p>
      </div>
    </Link>
  );
};

export default FeaturedArticleCard;