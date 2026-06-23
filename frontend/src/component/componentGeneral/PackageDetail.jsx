import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const SectionCard = ({ title, children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white rounded-2xl shadow-lg border-2 border-emerald-200/50 overflow-hidden ${className}`}
  >
    {title && (
      <div className="px-8 pt-6 pb-3">
        <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-3">
          <span className="w-2 h-2 rotate-45 bg-emerald-500" />
          {title}
        </h2>
        <div className="mt-2 w-20 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full" />
      </div>
    )}
    <div className="px-8 pb-6">{children}</div>
  </motion.div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3 text-gray-700">
        <span className="mt-1.5 w-2 h-2 rotate-45 bg-emerald-500 flex-shrink-0" />
        <span className="text-base leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const PackageDetail = () => {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { GeneralInfoList } = useGeneralInfoStore();
  const hasPushedRef = useRef(false);

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/packages/slug/${slug}`);
        setPkg(response.data);
      } catch (err) {
        setError("Failed to load package details.");
        console.error("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  useEffect(() => {
    if (pkg) {
      document.title = `${pkg.title} | ${GeneralInfoList?.CompanyName || "Afjal Hajj Agency"}`;
    }
  }, [pkg, GeneralInfoList]);

  useEffect(() => {
    if (!pkg || hasPushedRef.current) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_content",
      content_type: "package",
      content_name: pkg.title,
      content_id: pkg._id,
      content_category: pkg.type,
      currency: "BDT",
      value: pkg.price,
      year: pkg.year,
      featured: pkg.featured,
    });

    hasPushedRef.current = true;
  }, [pkg]);

  if (loading) {
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

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!pkg) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">Package not found.</Alert>
      </Box>
    );
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30"
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="detail-pattern"
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
          <rect width="100%" height="100%" fill="url(#detail-pattern)" />
        </svg>
      </div>

      <div className="relative xl:container xl:mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              হোম
            </Link>
            <span>/</span>
            <Link
              to="/packages"
              className="hover:text-emerald-600 transition-colors"
            >
              প্যাকেজ সমূহ
            </Link>
            <span>/</span>
            <span className="text-emerald-700 font-semibold">{pkg.title}</span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Main Content ===== */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-200/50"
            >
              <div
                className={`h-3 ${pkg.type === "hajj" ? "bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" : "bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"}`}
              />
              <div className="p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-5 py-2 rounded-full text-sm font-semibold ${pkg.type === "hajj" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"}`}
                    >
                      {pkg.type === "hajj" ? "🕋 হজ" : "🌙 ওমরাহ"}
                    </span>
                    {pkg.year && (
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-700">
                        {pkg.year}
                      </span>
                    )}
                  </div>
                  {pkg.featured && (
                    <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg">
                      জনপ্রিয়
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                  {pkg.title}
                </h1>

                <div className="relative inline-block mb-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-lg blur-sm" />
                  <div className="relative text-5xl font-bold text-amber-600 bg-white px-6 py-3 rounded-xl border-2 border-amber-400/30">
                    {pkg.price}
                  </div>
                </div>

                {(pkg.priceWithQurbani || pkg.priceWithoutQurbani) && (
                  <div className="mt-4 space-y-2">
                    {pkg.priceWithQurbani && (
                      <p className="text-gray-700">
                        <span className="font-semibold text-emerald-700">
                          কুরবানি সহ:
                        </span>{" "}
                        {pkg.priceWithQurbani}
                      </p>
                    )}
                    {pkg.priceWithoutQurbani && (
                      <p className="text-gray-700">
                        <span className="font-semibold text-emerald-700">
                          কুরবানি ছাড়া:
                        </span>{" "}
                        {pkg.priceWithoutQurbani}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Info */}
            {(pkg.duration || pkg.flightInfo) && (
              <SectionCard delay={0.08}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 -mb-9">
                  {pkg.duration && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">
                        মেয়াদকাল
                      </p>
                      <p className="text-lg font-semibold text-emerald-800">
                        {pkg.duration}
                      </p>
                    </div>
                  )}
                  {pkg.flightInfo && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">
                        ফ্লাইট তথ্য
                      </p>
                      <p className="text-base text-gray-700">
                        {pkg.flightInfo}
                      </p>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {/* Special Features */}
            {pkg.specialFeatures?.length > 0 && (
              <SectionCard title="বিশেষ বৈশিষ্ট্য" delay={0.12}>
                <BulletList items={pkg.specialFeatures} />
              </SectionCard>
            )}

            {/* Journey Details */}
            {pkg.journeyDetails && (
              <SectionCard title="হজ্জ সফরের ধারাবাহিকতা" delay={0.16}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.journeyDetails}
                </p>
              </SectionCard>
            )}

            {/* Accommodation */}
            {(pkg.accommodationMakkah || pkg.accommodationMedina) && (
              <SectionCard title="আবাসন ব্যবস্থা" delay={0.2}>
                <div className="space-y-5">
                  {pkg.accommodationMakkah && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-2">
                        🕋 মক্কায় আবাসন
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {pkg.accommodationMakkah}
                      </p>
                    </div>
                  )}
                  {pkg.accommodationMedina && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-2">
                        🕌 মদিনায় আবাসন
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {pkg.accommodationMedina}
                      </p>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {/* Room Facilities */}
            {pkg.roomFacilities?.length > 0 && (
              <SectionCard title="কক্ষ সুবিধাসমূহ" delay={0.24}>
                <BulletList items={pkg.roomFacilities} />
              </SectionCard>
            )}

            {/* Food */}
            {pkg.foodArrangements && (
              <SectionCard title="খাবারের ব্যবস্থা" delay={0.28}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.foodArrangements}
                </p>
              </SectionCard>
            )}

            {/* Included Services (detailed text) */}
            {pkg.includedServices && (
              <SectionCard title="প্যাকেজে অন্তর্ভুক্ত সেবাসমূহ" delay={0.32}>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line prose prose-emerald max-w-none">
                  {pkg.includedServices}
                </div>
              </SectionCard>
            )}

            {/* Other Service Sections */}
            {pkg.transportation && (
              <SectionCard title="হজ্জকালীন পরিবহন ব্যবস্থা" delay={0.36}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.transportation}
                </p>
              </SectionCard>
            )}
            {pkg.ziyarat && (
              <SectionCard title="জিয়ারত" delay={0.38}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.ziyarat}
                </p>
              </SectionCard>
            )}
            {pkg.guidanceService && (
              <SectionCard title="বিশেষ গাইড সেবা" delay={0.4}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.guidanceService}
                </p>
              </SectionCard>
            )}
            {pkg.religiousEducation && (
              <SectionCard title="ধর্মীয় শিক্ষা ও সহায়ক সামগ্রী" delay={0.42}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.religiousEducation}
                </p>
              </SectionCard>
            )}
            {pkg.supervision && (
              <SectionCard title="সর্বিক তত্ত্বাবধান" delay={0.44}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {pkg.supervision}
                </p>
              </SectionCard>
            )}

            {/* Registration CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-xl p-8 text-center border-2 border-emerald-500/50"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                পছন্দের প্যাকেজটি আজই বুকিং দিন
              </h2>
              <p className="text-emerald-100 mb-6">
                হজ – ২০২৬ ও ২০২৭ সালের প্রাক-নিবন্ধন চলছে এবং প্রতি মাসের ওমরাহ
                সময়সূচী জানতে যোগাযোগ করুন
              </p>
              <Link to="/contact-us">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-12 rounded-xl shadow-lg text-lg transition-all duration-300"
                >
                  এখনই রেজিস্ট্রেশন করুন
                </motion.button>
              </Link>
            </motion.div>

            {/* Special Note */}
            {(pkg.specialNote || pkg.note) && (
              <SectionCard title="বিশেষ দ্রষ্টব্য" delay={0.55}>
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {pkg.specialNote || pkg.note}
                  </p>
                </div>
              </SectionCard>
            )}
          </motion.div>

          {/* ===== Sidebar ===== */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-24 space-y-6"
            >
              {/* Contact Card */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-xl shadow-lg border-2 border-emerald-500/50">
                <h3 className="text-white text-lg font-bold mb-4">
                  যোগাযোগ করুন
                </h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন:
                </p>
                <a
                  href={`tel:${GeneralInfoList?.PhoneNumber?.[0]}`}
                  className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  {GeneralInfoList?.PhoneNumber?.[0] || "যোগাযোগ করুন"}
                </a>
              </div>

              {/* Quick package features */}
              {pkg.feature?.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-200/50">
                  <h3 className="text-emerald-900 font-bold mb-4">
                    প্যাকেজ সারসংক্ষেপ
                  </h3>
                  <ul className="space-y-2">
                    {pkg.feature.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rotate-45 bg-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* View All Packages */}
              <Link to="/packages">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-200/50 hover:border-amber-400/50 cursor-pointer transition-colors duration-300"
                >
                  <h3 className="text-emerald-900 font-bold mb-2">
                    সকল প্যাকেজ
                  </h3>
                  <p className="text-gray-600 text-sm">
                    আমাদের অন্যান্য হজ ও ওমরাহ প্যাকেজ সমূহ দেখুন
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PackageDetail;
