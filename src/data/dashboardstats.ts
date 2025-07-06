export type Like = {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  date: string;
  articleTitle: string;
};

export type ArticleStats = {
  id: string;
  title: string;
  tally: number;
  tallyLast7Days: number;
  tallyLast30Days: number;
  tallyByDay: { day: string; count: number }[];
  topActors: Like[];
  actionGrowthRate: number;
  publishedDate: string;
};
export const mockStats: ArticleStats = {
  id: "1",
  title: "Advanced React Patterns in 2023",
  tally: 1243,
  tallyLast7Days: 156,
  tallyLast30Days: 542,
  tallyByDay: [
    { day: "Mon", count: 32 },
    { day: "Tue", count: 45 },
    { day: "Wed", count: 28 },
    { day: "Thu", count: 51 },
    { day: "Fri", count: 38 },
    { day: "Sat", count: 22 },
    { day: "Sun", count: 18 },
  ],
  topActors: [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/default-avatar.jpg",
        username: "alexj",
      },
      date: "2023-05-15T14:30:00Z",
      articleTitle: "Advanced React Patterns in 2023",
    },
    {
      id: "2",
      user: {
        name: "Sam Wilson",
        avatar: "/default-avatar.jpg",
        username: "samwilson",
      },
      date: "2023-05-14T09:15:00Z",
      articleTitle: "Advanced React Patterns in 2023",
    },
    {
      id: "3",
      user: {
        name: "Taylor Smith",
        avatar: "/default-avatar.jpg",
        username: "taylors",
      },
      date: "2023-05-13T18:45:00Z",
      articleTitle: "Advanced React Patterns in 2023",
    },
  ],
  actionGrowthRate: 12.5,
  publishedDate: "2023-04-10",
};
