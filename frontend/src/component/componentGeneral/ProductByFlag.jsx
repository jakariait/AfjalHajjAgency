import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore.js";
import useFlagStore from "../../store/useFlagStore.js";
import ProductList from "./ProductList.jsx";
import Skeleton from "react-loading-skeleton";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductByFlag = () => {
  const { homeProducts, loading: productsLoading } = useProductStore();
  const { flags, fetchFlags, loading: flagsLoading } = useFlagStore();

  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const hasAnyProducts = flags.some(
    (flag) => (homeProducts[flag.name] || []).length > 0,
  );

  if (productsLoading || flagsLoading)
    return (
      <div className="xl:container xl:mx-auto p-4 justify-center md:justify-start">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
          <Skeleton height={250} width="100%" />
        </div>
      </div>
    );

  if (!hasAnyProducts)
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-6xl mb-6">📦</div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-3">
          এখনও কোনো পণ্য যোগ করা হয়নি
        </h3>
        <p className="text-gray-500 text-lg text-center max-w-md">
          খুব শীঘ্রই হজ ও ওমরাহর জন্য প্রয়োজনীয় পণ্য এখানে পাওয়া যাবে।
        </p>
      </div>
    );

  return (
    <div className="xl:container xl:mx-auto  justify-center md:justify-start">
      {flags.map((flag) => {
        const products = homeProducts[flag.name] || [];
        if (products.length === 0) return null; // Skip if no products for this flag

        const encodedFlag = encodeURIComponent(flag.name); // for URL safety
        const viewAllLink = `/shop?page=1&limit=20&flags=${encodedFlag}`;

        const slicedProducts = products.slice(0, 6); // Show max 8

        return (
          <div key={flag._id} className={"mb-5"}>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-grow h-px bg-gray-400"></div>
              <h2 className="text-lg pl-10 pr-10 font-bold secondaryTextColor whitespace-nowrap uppercase tracking-widest">
                {flag.name}
              </h2>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>

            {/* ✅ Render once with sliced products */}
            <ProductList products={slicedProducts} />
            <div className={"flex flex-wrap justify-center mt-10 -mb-10"}>
              {products.length > 6 && (
                <Link to={viewAllLink}>
                  <motion.button
                    className="group cursor-pointer relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white font-bold px-12 py-4 rounded-2xl shadow-xl uppercase overflow-hidden border-2 border-amber-400/50 hover:border-amber-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id="view-btn-pattern"
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
                          fill="url(#view-btn-pattern)"
                        />
                      </svg>
                    </div>

                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1.0 }}
                    ></motion.div>

                    {/* Button Text */}
                    <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                      <motion.span
                        className="w-2 h-2 rotate-45 bg-white/80"
                        whileHover={{ rotate: 225 }}
                        transition={{ duration: 0.5 }}
                      ></motion.span>
                      বাকি পণ্যগুলো দেখুন
                      <motion.span
                        className="w-2 h-2 rotate-45 bg-white/80"
                        whileHover={{ rotate: 225 }}
                        transition={{ duration: 0.5 }}
                      ></motion.span>
                    </span>

                    {/* Decorative Corners */}
                    <motion.div
                      className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl"
                      whileHover={{ width: "1.25rem", height: "1.25rem" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.div
                      className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr"
                      whileHover={{ width: "1.25rem", height: "1.25rem" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl"
                      whileHover={{ width: "1.25rem", height: "1.25rem" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br"
                      whileHover={{ width: "1.25rem", height: "1.25rem" }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>

                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductByFlag;
