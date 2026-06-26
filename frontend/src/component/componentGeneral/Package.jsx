import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const Packages = ({ isHomePage = false }) => {
  const [allPackages, setAllPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const { GeneralInfoList } = useGeneralInfoStore();

  const getAllPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/packages`);
      return response.data;
    } catch (error) {
      console.error("Error fetching packages:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetPackages = async () => {
      setLoadingPackages(true);
      setPackagesError(null);
      try {
        const fetchedPackages = await getAllPackages();
        setAllPackages(fetchedPackages);
      } catch (err) {
        setPackagesError("Failed to load packages.");
        console.error("Error fetching packages:", err);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchAndSetPackages();
  }, []);

  // Container variant for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Refined fade-up animation
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Enhanced card animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
  };

  // Decorative line animation
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.65, 0, 0.35, 1],
        delay: 0.3,
      },
    },
  };

  // Diamond decoration animation
  const diamondVariants = {
    hidden: { scale: 0, rotate: 0, opacity: 0 },
    show: (custom) => ({
      scale: 1,
      rotate: 45,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4 + custom * 0.1,
        ease: "backOut",
      },
    }),
  };

  // Badge animation
  const badgeVariants = {
    hidden: { scale: 0, rotate: -10, opacity: 0 },
    show: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "backOut",
      },
    },
  };

  if (loadingPackages) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (packagesError) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{packagesError}</Alert>
      </Box>
    );
  }

  return (
    <motion.section
      viewport={{ once: true, margin: "-80px", amount: 0.1 }}
      className="relative py-20 px-4 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30 overflow-hidden"
    >
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="packages-pattern"
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
          <rect width="100%" height="100%" fill="url(#packages-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        variants={lineVariants}
      ></motion.div>

      <div className="relative xl:container xl:mx-auto">
        {/* Top Call to Action */}
        <motion.div className="text-center mb-12" variants={fadeUpVariants}>
          <div className="inline-block relative">
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-2xl blur-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
            <motion.div
              className="relative bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border-2 border-amber-400/50"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-900">
                পছন্দের প্যাকেজটি আজই বুকিং দিন
              </h3>
              {/* Decorative corners */}
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-500/40 rounded-tl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              ></motion.div>
              <motion.div
                className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-500/40 rounded-tr"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={containerVariants}>
          {/* Decorative Top Element */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            variants={fadeUpVariants}
          >
            <motion.div
              className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"
              variants={lineVariants}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-amber-500"
              variants={diamondVariants}
              custom={0}
            ></motion.div>
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-emerald-400 to-amber-400"
              variants={lineVariants}
            ></motion.div>
            <motion.div
              className="w-3 h-3 rotate-45 bg-emerald-500"
              variants={diamondVariants}
              custom={1}
            ></motion.div>
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-amber-400 to-emerald-400"
              variants={lineVariants}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-amber-500"
              variants={diamondVariants}
              custom={2}
            ></motion.div>
            <motion.div
              className="w-12 h-px bg-gradient-to-r from-emerald-400 to-transparent"
              variants={lineVariants}
            ></motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 relative inline-block"
            variants={fadeUpVariants}
          >
            আমাদের হজ্জ ও ওমরাহ প্যাকেজসমূহ
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            ></motion.div>
          </motion.h2>

          {/* Contact Info */}
          <motion.div
            className="max-w-3xl mx-auto mt-8"
            variants={fadeUpVariants}
          >
            <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-lg border-2 border-emerald-500/50">
              <p className="text-white text-lg leading-relaxed">
                হজ্জ – ২০২৬ ও ২০২৭ সালের প্রাক-নিবন্ধন চলছে এবং প্রতি মাসের ওমরাহ
                সময়সূচী জানতে যোগাযোগ করুন:
                <a
                  href={`tel:${GeneralInfoList?.PhoneNumber[0]}`}
                  className="font-bold ml-2 hover:text-amber-300 transition-colors duration-300"
                >
                  {GeneralInfoList?.PhoneNumber[0]}
                </a>
              </p>
              {/* Decorative corners */}
              <motion.div
                className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              ></motion.div>
              <motion.div
                className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-12"
            variants={fadeUpVariants}
          >
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300"
              variants={lineVariants}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-emerald-400"
              variants={diamondVariants}
              custom={0}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-amber-400"
              variants={diamondVariants}
              custom={1}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-emerald-400"
              variants={diamondVariants}
              custom={2}
            ></motion.div>
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-emerald-300 to-transparent"
              variants={lineVariants}
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 items-stretch"
          variants={containerVariants}
        >
          {allPackages
            .filter((pkg) => (isHomePage ? pkg.showOnHomePage === true : true))
            .map((pkg, index) => (
              <motion.div
                key={pkg._id || index} // Use _id if available, fallback to index
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col h-full ${
                  pkg.featured
                    ? "border-4 border-amber-400 ring-4 ring-amber-400/20 "
                    : "border-2 border-emerald-200/50 hover:border-amber-400/50"
                }`}
                style={{ perspective: "1000px" }}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <motion.div
                    className="absolute top-4 right-4 z-10"
                    variants={badgeVariants}
                  >
                    <motion.div
                      className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      জনপ্রিয়
                      {/* Decorative corners */}
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-white/50"></div>
                      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-white/50"></div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id={`card-pattern-${pkg._id || index}`}
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
                    <rect
                      width="100%"
                      height="100%"
                      fill={`url(#card-pattern-${pkg._id || index})`}
                    />
                  </svg>
                </div>

                {/* Top Decorative Border */}
                <motion.div
                  className={`h-2 ${
                    pkg.type === "hajj"
                      ? "bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600"
                      : "bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"
                  }`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                ></motion.div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Package Type Badge */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                        pkg.type === "hajj"
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {pkg.type === "hajj" ? "🕋 হজ্জ" : "🌙 ওমরাহ"}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-emerald-900 mb-3 group-hover:text-amber-700 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {pkg.title}
                  </motion.h3>

                  {/* Price */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.4,
                      ease: "backOut",
                    }}
                  >
                    <div className="relative inline-block">
                      <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-lg blur-sm"></div>
                      <div className="relative text-4xl font-bold text-amber-600 bg-white px-4 py-2 rounded-lg border-2 border-amber-400/30">
                        {pkg.price}
                      </div>
                    </div>
                  </motion.div>

                  {/* Decorative Line */}
                  <motion.div
                    className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full mb-6"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  ></motion.div>

                  {/* Features List */}
                  <motion.ul
                    className="space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  >
                    {pkg.feature.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + 0.7 + idx * 0.05,
                        }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-emerald-500 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Note */}
                  <motion.div
                    className="mb-6 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                  >
                    <p className="text-xs text-gray-600 italic">
                      বিঃ দ্রঃ পরিবর্তিত পরিস্থিতিতে প্যাকেজ পরিবর্তনযোগ্য
                    </p>
                  </motion.div>

                  {/* Registration Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                  >
                    <Link to={`/package/${pkg.slug}`}>
                      <motion.button
                        className="group/btn cursor-pointer relative w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg overflow-hidden"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.7 }}
                        ></motion.div>

                        <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                          <span className="w-2 h-2 rotate-45 bg-white/80"></span>
                          বিস্তারিত দেখুন
                          <span className="w-2 h-2 rotate-45 bg-white/80"></span>
                        </span>

                        {/* Decorative Corners */}
                        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl"></div>
                        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br"></div>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Card Decorative Corners */}
                <motion.div
                  className={`absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl transition-colors duration-300 ${
                    pkg.featured
                      ? "border-amber-400"
                      : "border-emerald-300/30 group-hover:border-amber-400/50"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.0 }}
                ></motion.div>
                <motion.div
                  className={`absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 rounded-tr transition-colors duration-300 ${
                    pkg.featured
                      ? "border-amber-400"
                      : "border-emerald-300/30 group-hover:border-amber-400/50"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.1 }}
                ></motion.div>
                <motion.div
                  className={`absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 rounded-bl transition-colors duration-300 ${
                    pkg.featured
                      ? "border-amber-400"
                      : "border-emerald-300/30 group-hover:border-amber-400/50"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                ></motion.div>
                <motion.div
                  className={`absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br transition-colors duration-300 ${
                    pkg.featured
                      ? "border-amber-400"
                      : "border-emerald-300/30 group-hover:border-amber-400/50"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.3 }}
                ></motion.div>
              </motion.div>
            ))}
        </motion.div>

        {/* View All Packages Button */}
        <motion.div className="text-center" variants={containerVariants}>
          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            variants={fadeUpVariants}
          >
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent to-emerald-300"
              variants={lineVariants}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-emerald-400"
              variants={diamondVariants}
              custom={0}
            ></motion.div>
            <motion.div
              className="w-3 h-3 rotate-45 bg-amber-500"
              variants={diamondVariants}
              custom={1}
            ></motion.div>
            <motion.div
              className="w-2 h-2 rotate-45 bg-emerald-400"
              variants={diamondVariants}
              custom={2}
            ></motion.div>
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-emerald-300 to-transparent"
              variants={lineVariants}
            ></motion.div>
          </motion.div>

          {isHomePage && (
            <motion.div variants={fadeUpVariants}>
              <Link to="/packages">
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
                    প্যাকেজগুলো দেখুন
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
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        variants={lineVariants}
      ></motion.div>
    </motion.section>
  );
};

export default Packages;
