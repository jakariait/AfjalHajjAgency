import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Services = ({ selectedServices, isHomePage = false }) => {
  const services = [
    {
      title: "প্রি-রেজিস্ট্রেশন সহায়তা",
      description:
        "সরকারি নিয়ম অনুযায়ী হজ ও ওমরাহ প্রি-রেজিস্ট্রেশনের সম্পূর্ণ প্রক্রিয়ায় আমরা যাত্রীদের সহায়তা করে থাকি। আবেদন, কাগজপত্র, ফি জমা ও যাচাইকরণ—সবকিছুই আমরা দ্রুত ও নির্ভুলভাবে সম্পন্ন করি।",
      buttonText: "প্রি-রেজিস্ট্রেশন করতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="currentColor"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z"
            transform="translate(-46 -28)"
          />
        </svg>
      ),
    },
    {
      title: "হজ্জ ও উমরাহ ভিসা প্রসেসিং",
      description:
        "ভহজ ও উমরাহ ভিসা প্রক্রিয়ার জন্য প্রয়োজনীয় কাগজপত্র যাচাই, আবেদন প্রক্রিয়া সম্পন্নকরণ এবং ভিসা-সংক্রান্ত সার্বিক সহায়তা প্রদান করা হয়।",
      buttonText: "ভিসা প্রসেসিং করতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "হজ্জ ও উমরাহ ফ্লাইট বুকিং",
      description:
        "বিশ্বস্ত এয়ারলাইন্সের মাধ্যমে সুবিধাজনক সময়সূচি ও প্রতিযোগিতামূলক ভাড়ায় হজ ও উমরাহ যাত্রীদের জন্য ফ্লাইট বুকিং ও রিজার্ভেশন সেবা প্রদান করা হয়।",
      buttonText: "ফ্লাইট বুকিংয়ের জন্য যোগাযোগ করুন।",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
    },
    {
      title: "ট্রান্সপোর্ট সুবিধা",
      description:
        "মক্কা ও মদিনায় অভ্যন্তরীণ যাতায়াতের জন্য এসি কোচ, মিনিবাস ও প্রাইভেট পরিবহন সেবা নিশ্চিতকরণ সহ হোটেল, হারাম শরীফ ও জিয়ারতের প্রতিটি যাত্রায় আরামদায়ক ও নিরাপদ ট্রান্সপোর্ট প্রদান করা হয়।",
      buttonText: "ট্রান্সপোর্ট সুবিধা পেতে যোগাযোগ করুন",
      icon: (
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M678.5 446.8h79.1c7 0 13.7 2.8 18.6 7.7l79.3 79c5 5 7.8 11.7 7.8 18.7v92.5c0 14.7-11.8 26.5-26.4 26.5H678.5c-14.6 0-26.4-11.8-26.4-26.4V473.2c0-14.5 11.9-26.4 26.4-26.4z"
            fill="#FFFFFF"
          />
          <path
            d="M836.9 697.6H678.5c-29.2 0-52.8-23.6-52.8-52.8V473.2c0-29.2 23.6-52.8 52.8-52.8h79.1c14.1 0 27.3 5.5 37.3 15.4l79.2 79c9.9 9.9 15.5 23.4 15.5 37.4v92.5c0.1 29.3-23.5 52.9-52.7 52.9zM678.5 473.2v171.6h158.4v-92.5l-79.2-79h-79.2z"
            fill="#333333"
          />
          <path
            d="M209.2 275.3H686c32.3 0 58.5 26.2 58.5 58.5V639c0 32.3-26.2 58.5-58.5 58.5H209.2c-32.3 0-58.5-26.2-58.5-58.5V333.8c-0.1-32.3 26.1-58.5 58.5-58.5z"
            fill="#FFFFFF"
          />
          <path
            d="M691.7 697.6H203.4c-29.2 0-52.8-23.6-52.8-52.8V328.1c0-29.2 23.6-52.8 52.8-52.8h488.3c29.2 0 52.8 23.6 52.8 52.8v316.7c0 29.2-23.6 52.8-52.8 52.8zM203.4 328.1v316.7h488.3V328.1H203.4z"
            fill="#333333"
          />
          <path
            d="M293.6 618.4c38.2-1.2 69.3 30 68.1 68.1-1.1 34.6-29.2 62.7-63.8 63.8-38.2 1.2-69.3-30-68.1-68.1 1.2-34.5 29.3-62.7 63.8-63.8z"
            fill="#FFFFFF"
          />
          <path
            d="M300.1 776.7c-54.4 2.5-99.1-42.3-96.6-96.6 2.2-47.4 40.6-85.8 87.9-87.9 54.4-2.5 99.1 42.3 96.6 96.6-2.1 47.3-40.5 85.7-87.9 87.9z m-0.7-131.7c-24.7-2.2-45.2 18.4-43 43 1.7 18.9 16.9 34.1 35.8 35.8 24.7 2.2 45.2-18.4 43-43-1.6-18.9-16.9-34.2-35.8-35.8z"
            fill="#333333"
          />
          <path
            d="M663.2 631.6c38.2-1.2 69.3 30 68.1 68.1-1.1 34.6-29.2 62.7-63.8 63.8-38.2 1.2-69.3-30-68.1-68.1 1.1-34.5 29.2-62.7 63.8-63.8z"
            fill="#FFFFFF"
          />
          <path
            d="M669.7 789.9c-54.4 2.5-99.1-42.3-96.6-96.6 2.2-47.4 40.6-85.8 87.9-87.9 54.4-2.5 99.1 42.3 96.6 96.6-2.2 47.3-40.5 85.7-87.9 87.9z m-0.8-131.7c-24.7-2.2-45.2 18.4-43 43 1.7 18.9 16.9 34.1 35.8 35.8 24.7 2.2 45.2-18.4 43-43-1.6-18.9-16.8-34.2-35.8-35.8z"
            fill="#333333"
          />
          <path d="M203.4 407.2h488.3V460H203.4z" fill="#333333" />
          <path d="M203.4 328.1h488.3v79.1H203.4z" fill="#8CAAFF" />
          <path d="M691.7 526h158.4v52.8H691.7z" fill="#333333" />
        </svg>
      ),
    },
    {
      title: "মক্কা ও মদিনায় আবাসন সুবিধা",
      description:
        "মসজিদুল হারাম ও মসজিদে নববীর সন্নিকটে প্যাকেজভিত্তিক মানসম্মত, নিরাপদ ও স্বাচ্ছন্দ্যময় আবাসনের ব্যবস্থা করা হয়।",
      buttonText: "মানসম্মত হোটেল পেতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "দেশীয় খাবার (৩ বেলা)",
      description:
        "প্রতিদিন সকালের নাস্তা, দুপুর ও রাতে স্বাস্থ্যকর দেশীয় খাবার পরিবেশন করা হয়। খাবার প্রস্তুত হয় পরিচ্ছন্ন পরিবেশে, নির্দিষ্ট সময় অনুযায়ী।",
      buttonText: "খাবার সুবিধা পেতে যোগাযোগ করুন",
      icon: (
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M774.8 327.8c-50.6-4.8-97.3 4.3-131 22.7 15.9 20.3 26.1 52.1 26.1 87.9 0 29.2-6.8 55.7-17.9 75.5 28.3 16.9 64.5 28.8 104.6 32.6 96.7 9.2 179.2-32.4 184.2-92.8s-69.3-116.7-166-125.9z"
            fill="#FFB89A"
          />
          <path
            d="M67.2 494l1 31c2.2 67.7 26.2 133.6 69.6 190.4 41.6 54.5 99.6 99.2 167.9 129.3 15.2 6.7 32.9-0.2 39.5-15.4 6.7-15.2-0.2-32.9-15.4-39.5-59-26-108.9-64.3-144.4-110.8-29-38-47.5-80.7-54.4-125h762.6c-7 44.8-25.8 87.9-55.4 126.3-36.1 46.8-86.8 85.2-146.8 110.9-15.2 6.5-22.2 24.2-15.7 39.4 4.9 11.4 15.9 18.2 27.6 18.2 4 0 8-0.8 11.8-2.4 144.5-62.2 237-185.3 241.3-321.4l1-31H67.2z"
            fill="#45484C"
          />
          <path
            d="M591.9 800.1h-159c-35.2 0-64.1 28.8-64.1 64.1s28.8 64.1 64.1 64.1h159c35.2 0 64.1-28.8 64.1-64.1s-28.9-64.1-64.1-64.1z m0 68.1h-159c-2.1 0-4.1-2-4.1-4.1s2-4.1 4.1-4.1h159c2.1 0 4.1 2 4.1 4.1s-2 4.1-4.1 4.1z"
            fill="#45484C"
          />
          <path
            d="M498.1 373.5c-9.6-13.5-28.4-16.6-41.9-6.9-13.5 9.6-16.6 28.4-6.9 41.9 10.8 15.1 16.6 33 16.6 51.7 0 16.6 13.4 30 30 30s30-13.4 30-30c0-31.4-9.6-61.4-27.8-86.7zM432.4 321.8c-17.7-7.1-36.3-10.7-55.5-10.7-82.2 0-149 66.8-149 149 0 16.6 13.4 30 30 30s30-13.4 30-30c0-49.1 39.9-89 89-89 11.5 0 22.6 2.1 33.1 6.4 15.4 6.2 32.8-1.3 39-16.7 6.2-15.4-1.2-32.9-16.6-39z"
            fill="#33CC99"
          />
          <path
            d="M549.4 274.7c-46.7-45.6-107.7-70.8-171.8-70.8-64.1 0-125.1 25.1-171.8 70.8-46.1 45.1-74 106-78.6 171.4-1.2 16.5 11.3 30.9 27.8 32 16.5 1.1 30.9-11.3 32-27.8 3.5-50.8 25.1-97.9 60.7-132.7 35.4-34.6 81.5-53.7 129.9-53.7 48.3 0 94.5 19.1 129.9 53.7 35.6 34.8 57.1 81.9 60.7 132.7 1.1 15.8 14.3 27.9 29.9 27.9 0.7 0 1.4 0 2.1-0.1 16.5-1.2 29-15.5 27.8-32-4.6-65.4-32.5-126.3-78.6-171.4zM895.1 385.9c-11.5-19.4-27.7-36.6-48.1-51.2l53.9-58.3c11.2-12.2 10.5-31.2-1.7-42.4s-31.2-10.5-42.4 1.7l-65 70.4c-5-1.8-10.1-3.5-15.3-5l82.4-159.2c7.6-14.7 1.9-32.8-12.9-40.4-14.7-7.6-32.8-1.9-40.4 12.9l-91.2 176.3c-5.5-0.3-11.1-0.5-16.7-0.5-21.9 0-43.5 2.4-64.3 7.2-16.1 3.7-26.2 19.8-22.5 36 3.7 16.1 19.8 26.2 36 22.5 16.3-3.8 33.4-5.7 50.7-5.7 43.6 0 84.2 11.8 114.3 33.3 27.1 19.3 42 44 42 69.5 0 16.6 13.4 30 30 30s30-13.4 30-30c0-23.5-6.3-46.1-18.8-67.1z"
            fill="#45484C"
          />
        </svg>
      ),
    },
    {
      title: "জিয়ারত সফর",
      description:
        "মক্কা ও মদিনার ঐতিহাসিক ও ধর্মীয় গুরুত্বসম্পন্ন স্থানসমূহে পরিদর্শন এবং পরিকল্পিত জিয়ারত সফরের আয়োজন করি। প্রতিটি সফরে থাকে অভিজ্ঞ গাইড ও নির্ভরযোগ্য পরিবহন ব্যবস্থা।",
      buttonText: "জিয়ারত সফর করতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l4 7H8l4-7zm0 12v8"
          />
        </svg>
      ),
    },
    {
      title: "গাইড ও হজ সহায়তা",
      description:
        "ইহরাম, তাওয়াফ, সাঈ এবং হজ ও ওমরাহর বাদ বাকি ইসলামী বিধিবদ্ধ নিয়ম কানুন ও অন্যান্য ইবাদতের নিয়মকানুন বুঝিয়ে দেয় অভিজ্ঞ আলেমগণ।",
      buttonText: "হজ সহায়তা পেতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    {
      title: "হজ প্রশিক্ষণ ও প্রস্তুতি",
      description:
        "হজের প্রতিটি ধাপ, দোয়া, করণীয়, বর্জনীয় ও বিধি বিধান নিয়ে সরাসরি প্রশিক্ষণ প্রদান করা হয়।",
      buttonText: "হজ প্রশিক্ষণ পেতে যোগাযোগ করুন",
      icon: (
        <svg
          className="w-12 h-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v20M2 12h20"
          />
        </svg>
      ),
    },
  ];
  const displayedServices = selectedServices
    ? services.filter((service) => selectedServices.includes(service.title))
    : services;

  // Container variant for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Refined fade-up animation with smoother easing
  const fadeUpItemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth motion
      },
    },
  };

  // Enhanced card animation with scale and rotation
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
        ease: [0.19, 1.0, 0.22, 1.0], // Exponential easing out
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

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px", amount: 0.1 }}
      className="relative py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden"
    >
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="services-pattern"
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
          <rect width="100%" height="100%" fill="url(#services-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        variants={lineVariants}
      ></motion.div>

      <div className="relative xl:container xl:mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={containerVariants}>
          {/* Decorative Top Line */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            variants={fadeUpItemVariants}
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

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 relative inline-block"
            variants={fadeUpItemVariants}
          >
            আমাদের সেবাসমূহ
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            ></motion.div>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-amber-700 font-semibold mt-8 mb-4"
            variants={fadeUpItemVariants}
          >
            বিশ্বাসের সঙ্গে সেবা, আন্তরিকতার সঙ্গে প্রস্তুতি
          </motion.p>

          <motion.div
            className="max-w-4xl mx-auto mt-8"
            variants={fadeUpItemVariants}
          >
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-emerald-200/50">
              <motion.div
                className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40 rounded-tl"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 rounded-br"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              ></motion.div>
              <p className="text-gray-700 leading-relaxed text-lg">
                হজ্জ ও উমরাহ যাত্রাকে সহজ, নিরাপদ ও স্বাচ্ছন্দ্যময় করতে আমরা
                প্রতিশ্রুতিবদ্ধ । অবিজ্ঞ ব্যাবস্থাপনা ও বিশ্বস্ত সেবার মাধ্যমে
                আপনার ইবাদতের সফরকে করি আরও প্রশান্তিময়।
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Services Grid with Stagger Effect */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          {displayedServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-2 border-emerald-200/50 hover:border-amber-400/50"
              style={{ perspective: "1000px" }}
            >
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id={`card-pattern-${index}`}
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
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#card-pattern-${index})`}
                  />
                </svg>
              </div>

              <motion.div
                className="h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              ></motion.div>

              <div className="relative p-8">
                <motion.div
                  className="relative mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <motion.div
                    className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      rotate: 6,
                      transition: { duration: 0.3, ease: "backOut" },
                    }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-emerald-900 mb-4 group-hover:text-amber-700 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {service.title}
                </motion.h3>

                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                ></motion.div>

                <motion.p
                  className="text-gray-600 leading-relaxed mb-6 min-h-[120px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                >
                  <Link to="/contact-us">
                    <motion.button
                      className="group/btn cursor-pointer relative w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      ></motion.div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {service.buttonText}
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {isHomePage && (
          <motion.div className="text-center" variants={containerVariants}>
            <motion.div
              variants={fadeUpItemVariants}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                className="w-24 h-px bg-gradient-to-r from-transparent to-emerald-300"
                variants={lineVariants}
              ></motion.div>
              <motion.div
                className="w-3 h-3 rotate-45 bg-amber-500"
                variants={diamondVariants}
                custom={0}
              ></motion.div>
              <motion.div
                className="w-24 h-px bg-gradient-to-r from-emerald-300 to-transparent"
                variants={lineVariants}
              ></motion.div>
            </motion.div>

            <motion.div variants={fadeUpItemVariants}>
              <Link to="/services">
                <motion.button
                  className="group relative cursor-pointer bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold px-12 py-4 rounded-2xl shadow-xl overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  ></motion.div>
                  <span className="relative z-10">
                    আমাদের আরো সেবাসমূহ দেখুন
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        variants={lineVariants}
      ></motion.div>
    </motion.section>
  );
};

export default Services;
