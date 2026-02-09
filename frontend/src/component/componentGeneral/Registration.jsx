import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="flex justify-center items-center w-32">
      <Link to="/registration">
        <button className="group relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white font-bold px-2 py-1 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 uppercase cursor-pointer overflow-hidden border-2 border-amber-400/50 hover:border-amber-300 hover:scale-105 active:scale-95">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="btn-pattern"
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
              <rect width="100%" height="100%" fill="url(#btn-pattern)" />
            </svg>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Button Text */}
          <span className="relative z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-white/80 group-hover:rotate-[225deg] transition-transform duration-500"></span>
            Register Now
            <span className="w-1.5 h-1.5 rotate-45 bg-white/80 group-hover:rotate-[225deg] transition-transform duration-500"></span>
          </span>

          {/* Decorative Corners */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white/40 rounded-tr transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white/40 rounded-bl transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br transition-all duration-300 group-hover:w-4 group-hover:h-4"></div>

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </Link>
    </div>
  );
};

export default Registration;
