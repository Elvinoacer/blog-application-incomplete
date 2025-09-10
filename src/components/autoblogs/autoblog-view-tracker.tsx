"use client";

import { useEffect } from "react";

interface AutoblogViewTrackerProps {
  autoblogId: string;
}

const AutoblogViewTracker: React.FC<AutoblogViewTrackerProps> = ({
  autoblogId,
}) => {
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const visitorId = getCookie("visitor_id");

    if (visitorId) {
      fetch("/api/track/view", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId,
          autoblogId,
        }),
      });
    }
  }, [autoblogId]);

  return null;
};

export default AutoblogViewTracker;
