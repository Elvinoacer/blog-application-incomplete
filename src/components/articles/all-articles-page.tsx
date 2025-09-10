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
    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
      {articles.map((result) => {
        if (result.type === 'article') {
          return (
            <Card
              onClick={() => window.open(`/articles/${result.id}`, '_self')}
              key={result.id}
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800 md:flex"
            >
              <div className="md:flex-shrink-0">
                <div className="relative h-48 w-full md:w-64">
                  <Image
                    src={result.featuredImage as string}
                    alt={result.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{result.category}</div>
                <h3 className="mt-1 block text-2xl font-bold leading-tight text-black dark:text-white">{result.title}</h3>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={result.author.imageUrl as string} />
                      <AvatarFallback>{result.author.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{result.author.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(result.createdAt).toDateString()}</div>
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
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800 md:flex"
            >
              <div className="md:flex-shrink-0">
                <div className="relative h-48 w-full md:w-64">
                  <Image
                    src={(result.images as any)[0].url as string}
                    alt={result.topic}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Autoblog</div>
                <h3 className="mt-1 block text-2xl font-bold leading-tight text-black dark:text-white">{result.topic}</h3>
                <p className="mt-4 text-base text-gray-500 dark:text-gray-300">Read more &rarr;</p>
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
