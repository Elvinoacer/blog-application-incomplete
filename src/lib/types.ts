// lib/types.ts

export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  date: string;
  duration: string;
  tags: string[];
  isFeatured?: boolean;
  episodeNumber: number;
  content: string;
  // Optional fields you might want to add later:
  guests?: Guest[];
  transcript?: string;
  relatedLinks?: RelatedLink[];
  category?: string;
}

export interface Guest {
  name: string;
  bio: string;
  avatarUrl: string;
  twitterHandle?: string;
  websiteUrl?: string;
}

export interface RelatedLink {
  title: string;
  url: string;
  description?: string;
}

// You might also want to add these types for the player component
export interface PlayerState {
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  playbackRate: number;
  isMuted: boolean;
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleMute: () => void;
}

// For API responses if you're fetching podcasts from a CMS
export interface PodcastsResponse {
  data: Podcast[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
}

// For single podcast API response
export interface PodcastResponse {
  data: Podcast;
}
