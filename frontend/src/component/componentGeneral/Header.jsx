"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Registration from "../componentGeneral/Registration.jsx";
import GeneralInfoStore from "../../store/GeneralInfoStore.js";
import ImageComponent from "./ImageComponent.jsx";
import CartLogin from "./CartLogin.jsx";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Packages",
    path: "/packages",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Gallery",
    path: "/amazon",
    subItems: [
      { name: "Image Gallery", path: "/image-gallery" },
      { name: "Video Gallery", path: "/video-gallery" },
    ],
  },
  { name: "Contact Us", path: "/contact-us" },
];

export default function Header() {
  const { GeneralInfoList, GeneralInfoListLoading, GeneralInfoListError } =
    GeneralInfoStore();

  // Desktop submenu state
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const timeoutRef = useRef(null);

  // Mobile drawer and submenu states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSubmenuOpenIndex, setMobileSubmenuOpenIndex] = useState(null);

  // Improved desktop hover handlers
  const handleMenuEnter = (idx) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenuIndex(idx);
  };

  const handleMenuItemLeave = (idx) => {
    // Set a longer timeout to allow mouse movement to submenu
    timeoutRef.current = setTimeout(() => {
      setOpenMenuIndex(null);
    }, 300); // Increased timeout for better UX
  };

  const handleSubmenuEnter = () => {
    // Clear timeout when entering submenu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubmenuLeave = () => {
    // Immediate close when leaving submenu
    timeoutRef.current = setTimeout(() => {
      setOpenMenuIndex(null);
    }, 150);
  };

  // Mobile submenu toggle
  const toggleMobileSubmenu = (idx) => {
    if (mobileSubmenuOpenIndex === idx) {
      setMobileSubmenuOpenIndex(null);
    } else {
      setMobileSubmenuOpenIndex(idx);
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerOpen && !event.target.closest(".mobile-drawer")) {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="relative  border-amber-400/30 px-4 sticky top-0 z-50 bg-white shadow-md">
      {/* Subtle Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="header-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L45 15 L30 30 L15 15 Z"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle
                cx="30"
                cy="30"
                r="10"
                fill="none"
                stroke="#059669"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#header-pattern)" />
        </svg>
      </div>

      <div className="relative xl:container xl:mx-auto flex justify-between py-1 md:py-2 items-center">
        {/* Logo with Islamic Frame */}
        <Link to="/" className="flex items-center group">
          <div className="relative">
            {/* Decorative background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald-50 to-amber-50 p-3 rounded-xl border-2 border-emerald-200/50 group-hover:border-amber-400/50 transition-all duration-300">
              <ImageComponent
                imageName={GeneralInfoList?.PrimaryLogo}
                altName={GeneralInfoList?.CompanyName}
                className="w-30 md:w-40 cursor-pointer transition-transform duration-300 group-hover:scale-105"
              />

              {/* Decorative Corners */}
              <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t-2 border-l-2 border-emerald-600/30 rounded-tl"></div>
              <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t-2 border-r-2 border-emerald-600/30 rounded-tr"></div>
              <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b-2 border-l-2 border-emerald-600/30 rounded-bl"></div>
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b-2 border-r-2 border-emerald-600/30 rounded-br"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative">
              {item.subItems ? (
                <div
                  onMouseEnter={() => handleMenuEnter(idx)}
                  onMouseLeave={() => handleMenuItemLeave(idx)}
                >
                  <button
                    className="relative text-emerald-900 uppercase font-semibold py-1 px-1 rounded-lg transition-all duration-300 hover:text-amber-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 group"
                    aria-expanded={openMenuIndex === idx}
                    aria-haspopup="true"
                  >
                    <span className="relative z-10 flex items-center ">
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMenuIndex === idx ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    {/* Hover underline effect */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                  </button>

                  {/* Desktop Submenu with Islamic styling */}
                  <div
                    className={`absolute top-full left-0 bg-white rounded-xl shadow-xl border-2 border-emerald-200/50 transition-all duration-300 transform overflow-hidden  ${
                      openMenuIndex === idx
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                    style={{
                      minWidth: "220px",
                      marginTop: "8px",
                    }}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {/* Decorative top border */}
                    <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>

                    <div className="py-2 bg-gradient-to-br from-white to-emerald-50/30">
                      {item.subItems.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          className="group/item relative block px-5 py-3 text-emerald-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:text-amber-600 transition-all duration-200 font-medium"
                          onClick={() => setOpenMenuIndex(null)}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rotate-45 bg-emerald-400/50 group-hover/item:bg-amber-500 transition-colors duration-200 "></span>
                            {subItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Decorative corners */}
                    <div className="absolute top-2 left-1 w-2 h-2 border-t border-l border-emerald-300/50"></div>
                    <div className="absolute top-2 right-1 w-2 h-2 border-t border-r border-emerald-300/50"></div>
                  </div>
                </div>
              ) : (
                <Link
                  to={`${item.path}`}
                  className="relative group text-emerald-900 uppercase font-semibold py-1 px-2 rounded-lg transition-all duration-300 hover:text-amber-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 block"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover underline effect */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          {/*<Registration />*/}
          <CartLogin />
        </div>

        {/* Mobile Hamburger with Islamic styling */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="relative p-3 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 overflow-hidden group"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fbbf24,transparent_50%)]"></div>
            </div>

            <svg
              className="relative z-10 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            {/* Decorative corners */}
            <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-amber-300/50"></div>
            <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-amber-300/50"></div>
            <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-amber-300/50"></div>
            <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-amber-300/50"></div>
          </button>
        </div>

        {/* Mobile Drawer Overlay */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Mobile Drawer with Islamic Design */}
        <div
          className={`mobile-drawer fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-white via-emerald-50/30 to-white shadow-2xl z-50 transform transition-all duration-500 ease-in-out lg:hidden overflow-hidden ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="drawer-pattern"
                  x="0"
                  y="0"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M40 0 L60 20 L40 40 L20 20 Z M40 40 L60 60 L40 80 L20 60 Z"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="15"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#drawer-pattern)" />
            </svg>
          </div>

          {/* Decorative Border */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 via-amber-400 to-emerald-500"></div>

          {/* Close Button */}
          <div className="relative flex justify-end p-4 border-b-2 border-emerald-200/50">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="relative p-3 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:rotate-90 active:scale-95 overflow-hidden group"
            >
              {/* Background glow */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#fbbf24,transparent_50%)]"></div>
              </div>

              <svg
                className="relative z-10 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              {/* Decorative corners */}
              <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-amber-300/50"></div>
              <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-amber-300/50"></div>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="relative px-4 py-2 overflow-y-auto max-h-[calc(100vh-120px)]">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-emerald-200/30 last:border-b-0"
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(idx)}
                      className="w-full flex justify-between items-center py-4 px-3 text-left uppercase font-semibold text-emerald-900 hover:text-amber-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 focus:outline-none rounded-lg transition-all duration-300 group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rotate-45 bg-emerald-500 group-hover:bg-amber-500 transition-colors duration-300"></span>
                        {item.name}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          mobileSubmenuOpenIndex === idx ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Mobile Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        mobileSubmenuOpenIndex === idx
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-6 pb-2 space-y-1">
                        {item.subItems.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            to={subItem.path}
                            onClick={() => setDrawerOpen(false)}
                            className="group/sub flex items-center gap-2 py-3 px-3 text-emerald-800 hover:text-amber-600 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-amber-50/50 rounded-lg transition-all duration-200 font-medium"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-400 group-hover/sub:bg-amber-500 transition-colors duration-200"></span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={`${item.path}`}
                    onClick={() => setDrawerOpen(false)}
                    className="group flex items-center gap-2 py-4 px-3 uppercase font-semibold text-emerald-900 hover:text-amber-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 bg-emerald-500 group-hover:bg-amber-500 transition-colors duration-300"></span>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Registration */}
          <div className="relative md:hidden border-t-2 border-emerald-200/50 p-4 bg-gradient-to-r from-emerald-50/50 to-amber-50/50">
            <Registration />
          </div>

          {/* Decorative Bottom Corners */}
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-400/30 rounded-br-lg"></div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"></div>
    </nav>
  );
}
