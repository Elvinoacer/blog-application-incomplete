"use client";
import React, { use } from "react";
import PodcastPage from "../pods";
import { podcastData } from "@/lib/data";

function PodViews({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <>
      {/* <PodcastPage podcast={podcastData[0]} relatedPodcasts={podcastData} /> */}
      <PodcastPage slug={slug} />
    </>
  );
}

export default PodViews;
