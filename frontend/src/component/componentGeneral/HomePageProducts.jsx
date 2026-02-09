import React from "react";
import ProductByFlag from "./ProductByFlag.jsx";

const HomePageProducts = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="product-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 0 L75 25 L50 50 L25 25 Z M50 50 L75 75 L50 100 L25 75 Z M0 25 L25 50 L0 75 L-25 50 Z M100 25 L125 50 L100 75 L75 50 Z"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="#059669"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="none"
                stroke="#059669"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#product-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative xl:container xl:mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
            <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-amber-400"></div>
            <div className="w-3 h-3 rotate-45 bg-emerald-500"></div>
            <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
            <div className="w-12 h-px bg-gradient-to-r from-emerald-400 to-transparent"></div>
          </div>

          {/* Emoji & Title */}
          <div className="mb-4">
            <span className="text-5xl">🛍️</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 relative inline-block">
            হজ ও ওমরাহর জন্য{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
              প্রয়োজনীয় পণ্য
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </h2>

          {/* Description */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-emerald-200/50">
              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40 rounded-tl"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-500/40 rounded-tr"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/40 rounded-bl"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 rounded-br"></div>

              <p className="text-gray-700 leading-relaxed text-lg">
                হজ ও ওমরাহ যাত্রায় আপনার সাথী হতে আমরা নিয়ে এসেছি উচ্চ
                মানসম্পন্ন এবং প্রয়োজনীয় সকল পণ্য। ইহরাম, তাসবীহ, দোয়া বই,
                ভ্রমণ ব্যাগ থেকে শুরু করে পবিত্র যাত্রার প্রতিটি মুহূর্তে
                প্রয়োজনীয় সামগ্রী পাবেন এখানে। মানসম্মত পণ্য এবং সাশ্রয়ী
                মূল্যে আপনার পবিত্র সফরকে করে তুলুন আরও সহজ ও আরামদায়ক।
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-400"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-16 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
          </div>
        </div>

        <ProductByFlag />
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HomePageProducts;
