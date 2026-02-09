import React from "react";

// আইডি এক্সট্রাক্ট করার ফাংশনটি এখানে নিয়ে আসা হয়েছে
const extractYouTubeVideoId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
};

const YouTubeEmbed = ({ videoUrl }) => {


  const videoId = extractYouTubeVideoId(videoUrl);

  if (!videoId) return null;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;