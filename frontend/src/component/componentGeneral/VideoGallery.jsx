import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import {Link} from "react-router-dom"; // Assuming getBrandName is a utility function

const extractYouTubeVideoId = (url) => {
  if (!url) return null;

  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/i,
    // Add more patterns if other URL formats are expected
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

const VideoGallery = ({ isHomePage = false }) => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVideoLinks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/video-links`);
        // Filter videos to show only those marked for home page if isHomePage is true
        const filteredLinks = isHomePage
          ? response.data.data.filter((link) => link.showOnHomePage)
          : response.data.data;
        setVideoLinks(filteredLinks);
      } catch (err) {
        setError("Failed to fetch video links.");
        console.error("Error fetching video links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoLinks();
  }, [API_URL, isHomePage]);

  if (loading) {
    return (
      <section className="bg-gray-50 border-b border-gray-200 py-6 md:py-12">
        <div className="xl:container xl:mx-auto px-2 text-center">
          <div className="flex items-center justify-center min-h-[200px]">
            <CircularProgress />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 border-b border-gray-200 py-6 md:py-12">
        <div className="xl:container xl:mx-auto px-2 text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-6 md:py-12">
      <div className="xl:container xl:mx-auto px-2 text-center">
        <div className="mb-8">
          {/* Decorative Top Element - Reusing a simplified version from Service.js */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
            <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
            <div className="w-3 h-3 rotate-45 bg-emerald-500"></div>
            <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
            <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 relative inline-block">
            আমাদের ভিডিও গ্যালারী
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </h2>
          <p className="text-xl md:text-2xl text-amber-700 font-semibold mt-8 mb-4">
            আমাদের স্মরণীয় মুহূর্তগুলি দেখুন
          </p>
          <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
            আস্থা ও বিশ্বাসের যাত্রার কিছু ঝলক
          </p>
        </div>

        {videoLinks.length === 0 ? (
          <p className="text-center text-gray-600">No videos available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 p-2">
            {videoLinks.map((link) => {
              const videoId = extractYouTubeVideoId(link.videoLink);
              return (
                videoId && (
                  <div
                    key={link._id}
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
      {/* View More Services Button */}
      <div className="text-center pt-20">
        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
          <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
          <div className="w-3 h-3 rotate-45 bg-amber-500"></div>
          <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
          <div className="w-24 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
        </div>

        {isHomePage && (
          <div>
            <Link to="/video-gallery">
              <button className="group cursor-pointer relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 uppercase overflow-hidden border-2 border-amber-400/50 hover:border-amber-300 hover:scale-105 active:scale-95">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="more-btn-pattern"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20 0 L30 10 L20 20 L10 10 Z"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="6"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.3"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#more-btn-pattern)"
                    />
                  </svg>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                  <span className="w-2 h-2 rotate-45 bg-white/80 group-hover:rotate-[225deg] transition-transform duration-500"></span>
                  আমাদের আরো ভিডিও দেখুন
                  <span className="w-2 h-2 rotate-45 bg-white/80 group-hover:rotate-[225deg] transition-transform duration-500"></span>
                </span>

                {/* Decorative Corners */}
                <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl transition-all duration-300 group-hover:w-5 group-hover:h-5"></div>
                <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr transition-all duration-300 group-hover:w-5 group-hover:h-5"></div>
                <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl transition-all duration-300 group-hover:w-5 group-hover:h-5"></div>
                <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br transition-all duration-300 group-hover:w-5 group-hover:h-5"></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
