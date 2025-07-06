export const handleDownload = (audioSrc: string) => {
  // Check if there's an audio source
  if (!audioSrc) {
    console.error("No audio source provided");
    return;
  }

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = audioSrc;

  // Extract filename from URL or use a default name
  const fileName = audioSrc.split("/").pop() || "audio";
  link.download = fileName.includes(".") ? fileName : `${fileName}.mp3`;

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleShare = async (audioTitle: string, audioSrc: string) => {
  try {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      await navigator.share({
        title: audioTitle,
        text: "Listen to this audio clip",
        url: audioSrc,
      });
    } else {
      // Fallback for desktop browsers
      const shareUrl = audioSrc;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");

      // Alternatively, you could implement a custom share modal here
      // with options like Twitter, Facebook, etc.
    }
  } catch (err) {
    console.error("Error sharing:", err);
    // Fallback if clipboard API fails too
    prompt("Copy this link to share:", audioSrc);
  }
};
