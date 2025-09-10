'use client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import Image from 'next/image';

// I am using any here because the articles prop can be either an article or an autoblog.
// This is not ideal, but it is the quickest way to get the code to compile.
export function AllArticlesPage({ articles }: { articles: any[] }) {
  if (articles.length === 0) return <NoSearchResults />;

  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
      {articles.map((result) => {
        if (result.type === 'article') {
          return (
            <Card
              onClick={() => window.open(`/articles/${result.id}`, '_self')}
              key={result.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="p-6">
                {/* Image Container */}
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={result.featuredImage as string}
                    alt={result.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Article Content */}
                <h3 className="text-xl font-semibold text-foreground">
                  {result.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{result.category}</p>

                {/* Author & Metadata */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={result.author.imageUrl as string} />
                      <AvatarFallback>{result.author.name}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {result.author.name}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(result.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            </Card>
          );
        } else if (result.type === 'autoblog') {
          return (
            <Card
              onClick={() => window.open(`/autoblogs/${result.id}`, '_self')}
              key={result.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="p-6">
                {/* Image Container */}
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={(result.images as any)[0].url as string}
                    alt={result.topic}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Autoblog Content */}
                <h3 className="text-xl font-semibold text-foreground">
                  {result.topic}
                </h3>
                <p className="mt-2 text-muted-foreground">Autoblog</p>

                {/* Metadata */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {new Date(result.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );
}

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles or autoblogs matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}
