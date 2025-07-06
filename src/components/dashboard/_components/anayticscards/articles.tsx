"use client";
import LikesAnalyticsModal from "@/components/LikesAnalyticsModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  MessageCircle,
  PlusCircle,
  Clock,
  Heart,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

function AnalyticalCard({
  title,
  length,
  icon,
  incrementalStatement,
}: {
  length: string;
  title: string;
  icon: iconType;
  incrementalStatement: string;
}) {
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  return (
    <>
      <Card onClick={() => setIsLikesModalOpen(true)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {returnIcon(icon)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {incrementalStatement}
          </p>
        </CardContent>
      </Card>
      <LikesAnalyticsModal
        isOpen={isLikesModalOpen}
        onClose={() => setIsLikesModalOpen(false)}
        // Pass actual article stats when available
        // articleStats={articleStats}
      />
    </>
  );
}

export default AnalyticalCard;

export enum iconType {
  MessageCircle = "MessageCircle",
  FileText = "FileText",
  PlusCircle = "PlusCircle",
  Clock = "heClockart",
  Heart = "Heart",
}

function returnIcon(icon: iconType) {
  switch (icon) {
    case iconType.Heart:
      return <Heart className="h-4 w-4 text-muted-foreground" />;
    case iconType.FileText:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case iconType.MessageCircle:
      return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    case iconType.PlusCircle:
      return <PlusCircle className="h-4 w-4 text-muted-foreground" />;
    case iconType.Clock:
      return <Clock className="h-4 w-4 text-muted-foreground" />;

    default:
      break;
  }
}
