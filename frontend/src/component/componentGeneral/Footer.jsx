import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SocialMediaLink from "../componentGeneral/SocialMediaLink.jsx";
import { Link } from "react-router-dom";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js";
import ImageComponent from "./ImageComponent.jsx";

const Footer = () => {
  const year = new Date().getFullYear();
  const mainMenus = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "About Us", href: "/about-us" },
    { label: "Registration", href: "/registration" },
  ];

  const usefulLinks = [
    { label: "FAQs", href: "/faqs" },
    { label: "Image Gallery", href: "/image-gallery" },
    { label: "Video Gallery", href: "/video-gallery" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ];

  const { GeneralInfoList } = useGeneralInfoStore();

  const location = GeneralInfoList?.CompanyAddress;

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(location)}`;

  return (
    <footer className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="islamic-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 0 L75 25 L50 50 L25 25 Z M50 50 L75 75 L50 100 L25 75 Z M0 25 L25 50 L0 75 L-25 50 Z M100 25 L125 50 L100 75 L75 50 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border - Islamic Arch Pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>

      {/* Decorative Geometric Border */}
      <div className="absolute top-2 left-0 right-0 flex justify-center">
        <svg
          width="100%"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          <pattern
            id="top-pattern"
            x="0"
            y="0"
            width="60"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="30,0 45,15 30,30 15,15"
              fill="white"
              opacity="0.3"
            />
          </pattern>
          <rect width="100%" height="30" fill="url(#top-pattern)" />
        </svg>
      </div>

      <div className="relative xl:container xl:mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          {/* Logo & Social Media */}
          <div className="flex flex-col gap-6">
            {/* Decorative Frame */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-sm"></div>
              <Link href="/" className="relative block">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border-2 border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:shadow-amber-500/20 hover:shadow-xl">
                  <ImageComponent
                    imageName={GeneralInfoList?.PrimaryLogo}
                    altName={GeneralInfoList?.CompanyName}
                    className="w-full  cursor-pointer transition-transform duration-300 hover:scale-105"
                  />

                  {/* Decorative Corners */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-500/50 rounded-tl"></div>
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-500/50 rounded-tr"></div>
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-500/50 rounded-bl"></div>
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-500/50 rounded-br"></div>
                </div>
              </Link>
            </div>

            {/* Islamic Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
              <div className="w-2 h-2 rotate-45 bg-amber-400/50"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
            </div>

            <SocialMediaLink />
          </div>

          {/* Main Menus */}
          <div>
            <div className="relative inline-block mb-6">
              <h3 className="font-bold text-2xl text-amber-300 relative">
                Main Menus
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent rounded"></span>
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {mainMenus.map((menu, i) => (
                <li key={i} className="group">
                  <a
                    href={menu.href}
                    className="flex items-center gap-2 text-white/90 hover:text-amber-300 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 bg-amber-400/70 group-hover:bg-amber-300 transition-colors duration-300"></span>
                    {menu.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <div className="relative inline-block mb-6">
              <h3 className="font-bold text-2xl text-amber-300 relative">
                Useful Links
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent rounded"></span>
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {usefulLinks.map((link, i) => (
                <li key={i} className="group">
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-white/90 hover:text-amber-300 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 bg-amber-400/70 group-hover:bg-amber-300 transition-colors duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <div className="relative inline-block mb-6 ">
              <h3 className="font-bold text-2xl text-amber-300 relative">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent rounded"></span>
              </h3>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="group flex items-center gap-3 text-white/90 hover:text-amber-300 transition-all duration-300">
                {/* Single Icon */}
                <div className="p-2 bg-emerald-700/50 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>

                {/* All Phone Numbers */}
                <div className="flex flex-col gap-1 flex-1">
                  {GeneralInfoList?.PhoneNumber?.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                {/* The Single Icon */}
                <div className="p-2 bg-emerald-700/50 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>

                {/* The List of Emails */}
                <div className="flex flex-col gap-2 flex-1">
                  {GeneralInfoList?.CompanyEmail?.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email}`}
                      className="hover:text-amber-300 transition-all duration-300 text-sm md:text-base"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-white/90 hover:text-amber-300 transition-all duration-300"
              >
                <div className="mt-1 p-2 bg-emerald-700/50 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="flex-1">{location}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Middle Border */}
        <div className="flex items-center gap-4 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-amber-400/30"></div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rotate-45 bg-amber-400/50"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-400/70"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-400/50"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent"></div>
        </div>

        {/* Footer Bottom */}
        <div className="pb-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-400/50"></span>
              <span>
                © {year} {GeneralInfoList?.CompanyName}
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-400/50"></span>
            </div>
            <div className="hidden sm:block text-amber-400/30">•</div>
            <div className="flex items-center gap-2">
              <span>Created with</span>
              <svg
                className="w-4 h-4 text-amber-400 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>by</span>
              <a
                href="https://www.digiwebdigital.com/"
                className="text-amber-300 hover:text-amber-200 font-medium transition-colors duration-300 hover:underline decoration-amber-400/50"
              >
                DigiWeb
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
    </footer>
  );
};

export default Footer;
