import React from "react";
import ContactInfo from "../componentGeneral/ContactInfo.jsx";
import SocialMediaLink from "../componentGeneral/SocialMediaLink.jsx";

const TopHeader = () => {
  return (
    <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-4 overflow-hidden">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="top-islamic-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L60 20 L40 40 L20 20 Z M40 40 L60 60 L40 80 L20 60 Z"
                    fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="12" fill="none" stroke="white" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#top-islamic-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      {/* Main Content */}
      <div className="relative xl:container xl:mx-auto py-3 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Left Side - Contact Info */}
        <div className="flex items-center gap-3">
          {/* Decorative Element */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/70"></div>
            <div className="w-1 h-1 rotate-45 bg-amber-400/50"></div>
          </div>

          <ContactInfo />
        </div>

        {/* Center Decorative Divider - Only visible on larger screens */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/30"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/60"></div>
          <div className="w-8 h-px bg-gradient-to-r from-amber-400/30 to-transparent"></div>
        </div>

        {/* Right Side - Social Media */}
        <div className="flex items-center gap-3">
          <SocialMediaLink />

          {/* Decorative Element */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-1 h-1 rotate-45 bg-amber-400/50"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/70"></div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>

      {/* Corner Decorative Elements */}
      <div className="absolute top-1 left-4 w-3 h-3 border-t border-l border-amber-400/20 rounded-tl"></div>
      <div className="absolute top-1 right-4 w-3 h-3 border-t border-r border-amber-400/20 rounded-tr"></div>
      <div className="absolute bottom-1 left-4 w-3 h-3 border-b border-l border-amber-400/20 rounded-bl"></div>
      <div className="absolute bottom-1 right-4 w-3 h-3 border-b border-r border-amber-400/20 rounded-br"></div>
    </div>
  );
};

export default TopHeader;