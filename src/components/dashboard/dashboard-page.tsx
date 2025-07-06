import {
  FileText,
  MessageCircle,
  PlusCircle,
  Clock,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RecentArticles from "./recent-articles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AnalyticalCard, { iconType } from "./_components/anayticscards/articles";

export async function BlogDashboard() {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comment.count(),
  ]);

  return (
    <main className="flex-1 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your content and analytics
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <AnalyticalCard
          icon={iconType.FileText}
          length={"1"}
          incrementalStatement="+5 from last month"
          title="Total Articles"
        />
        {/* likes */}

        <AnalyticalCard
          icon={iconType.Heart}
          length={"2"}
          incrementalStatement="+5 from last month"
          title="Total Likes"
        />

        <AnalyticalCard
          icon={iconType.MessageCircle}
          length={"3"}
          incrementalStatement="12 awaiting moderation"
          title="Total Comments"
        />

        <AnalyticalCard
          icon={iconType.Clock}
          length={"4.2m"}
          incrementalStatement=" +0.8m from last month"
          title="Avg. Reading Time"
        />
      </div>

      {/* Recent Articles */}
      <RecentArticles articles={articles} />
    </main>
  );
}

// TODO: IMPLEMENT THE MODAL FOR EACH OF THEM
