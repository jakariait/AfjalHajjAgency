"use client";
import React, { useEffect, useState } from "react";
import { Image } from "primereact/image"; // Import PrimeReact Image component
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css";
import { Eye } from "lucide-react"; // Import Eye icon from lucide-react
import { Link } from "react-router-dom";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js"; //core css

const Gallery = ({ isHomePage = false }) => {
  const { GeneralInfoList } = useGeneralInfoStore();

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = apiURL ? apiURL.replace("/api", "") : "";

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${apiURL}/getallresults`);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

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
            অবিশ্বাস্য মুহূর্তগুলি
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </h2>
          <p className="text-xl md:text-2xl text-amber-700 font-semibold mt-8 mb-4">
            আস্থা ও বিশ্বাসের যাত্রা, &quot;{GeneralInfoList?.CompanyName}&quot;
            এর সাথে
          </p>
          <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
            একসাথে কাটানো মুহূর্তগুলো
          </p>
        </div>
        <div className="columns-2 md:columns-3 gap-4 p-2">
          {loading ? (
            // Basic skeleton loading if brands are still loading
            Array.from({ length: isHomePage ? 6 : 8 }).map((_, i) => (
              <div
                key={i}
                className="relative w-full h-48 bg-gray-300 rounded-lg animate-pulse mb-4"
              ></div>
            ))
          ) : brands.length > 0 ? (
            // Duplicate brands for a richer gallery effect if desired, ensuring unique keys
            (isHomePage ? brands.slice(0, 6) : brands).map((brand, i) => (
              <div
                key={`${brand._id}-${i}`} // Use a combination for unique key
                className="mb-4 overflow-hidden  transition-shadow duration-300 ease-in-out break-inside-avoid-column  shadow-md p-2 rounded-xl"
              >
                <Image
                  src={`${baseUrl}/uploads/${brand.imgSrc}`}
                  alt="Gallery Image"
                  preview
                  width="100%"
                  className="h-full w-full object-cover rounded-lg"
                  indicatorIcon={<Eye size={40} color="white" />} // Use Lucide Eye icon
                />
                {brand.description && (
                  <p className={"text-primary font-bold"}>
                    {brand.description}
                  </p>
                )}

              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No images available.
            </p>
          )}
        </div>
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
            <Link to="/image-gallery">
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
                  আমাদের আরো ছবিসমূহ দেখুন
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

export default Gallery;
