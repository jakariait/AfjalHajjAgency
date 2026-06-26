import React from "react";
import { Link } from "react-router-dom";
import LeaderShipMessage from "../componentGeneral/LeaderShipMessage.jsx";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const AboutUs = () => {
  const { GeneralInfoList } = useGeneralInfoStore();

  const services = [
    "২০ বছরের অভিজ্ঞ টিমের সার্বক্ষণিক তত্ত্বাবধান ও শরয়ী পরামর্শ",
    "অভিজ্ঞ আলেমদের মাধ্যমে নিয়মিত হজ্জ প্রশিক্ষণ",
    "প্রতিদিন ৩ বেলা মানসম্মত বাঙালি খাবারের ব্যবস্থা",
    " মক্কা ও মদিনায় উন্নতমানের ৩/৪ স্টার হোটেলে আবাসনের ব্যবস্থা (প্রতি কক্ষে ২/৩ জন)",
    "সৌদি এয়ারলাইন্সে যাতায়াত এবং হজ্জ ফ্লাইট শুরু হওয়ার ১ম দিনেই  সৌদি আরব গমনের ব্যবস্থা",
    "মক্কা ও মদিনার ঐতিহাসিক ও গুরুত্বপূর্ণ স্থানসমূহ জিয়ারাহ",
    "মিনা ও আরাফায় উন্নতমানের তাঁবু, আধুনিক ট্রেন ও পরিবহন সুবিধা",
  ];

  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="about-pattern"
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
          <rect width="100%" height="100%" fill="url(#about-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="xl:container xl:mx-auto">
          {/* Page Title */}
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

            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 relative inline-block">
              আমাদের{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                সম্পর্কে
              </span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
            </h1>
          </div>

          {/* Experience Badge */}
          <div className="flex justify-center mb-16">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 px-12 py-8 rounded-3xl shadow-2xl border-2 border-amber-400/50">
                <div className="text-center">
                  <p className="text-amber-300 text-lg font-semibold mb-2">
                    আল্লাহর মেহমানদের সেবায়
                  </p>
                  <p className="text-white text-6xl font-bold">
                    ২০ বছরের পথচলা
                  </p>
                </div>
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br"></div>
              </div>
            </div>
          </div>

          {/* Main About Content */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-2 border-emerald-200/50">
              {/* Quran Quote */}
              <div className="text-center mb-8 pb-8 border-b-2 border-emerald-200/50">
                <p className="text-2xl text-emerald-800 font-semibold italic leading-relaxed">
                  "নিশ্চয়ই হজ্জ ও ওমরাহ একমাত্র আল্লাহর জন্য।"
                </p>
                <p className="text-amber-600 font-semibold mt-3">
                  – আল কুরআন (সূরা আল-বাকারা: ১৯৬)
                </p>
              </div>

              {/* Description */}
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  দীর্ঘ দুই দশক ধরে উত্তরবঙ্গসহ সারা দেশের হাজীদের বিশ্বস্ত
                  কাফেলা{" "}
                  <strong className="text-emerald-900">
                    {GeneralInfoList?.CompanyName}
                  </strong>
                  । হজ্জ ও ওমরাহ কেবল কোনো সফর নয়, এটি একটি পবিত্র ইবাদত। আর তাই
                  আপনার এই আধ্যাত্মিক যাত্রাকে মশগুল ও নির্বিঘ্ন করতে আমাদের ২০
                  বছরের অভিজ্ঞতাকে কাজে লাগিয়ে প্রদান করি সঠিক দিকনির্দেশনা,
                  উন্নত হোটেল সুবিধা ও নির্ভরযোগ্য গাইডলাইন। আল্লাহর মেহমানদের
                  সেবাকে আমরা একটি পবিত্র দায়িত্ব মনে করি।
                </p>

                {/* Services List */}
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 p-6 rounded-2xl border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rotate-45 bg-amber-500"></span>
                    আমাদের মূল সেবাসমূহ:-
                  </h3>
                  <ul className="space-y-3">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rotate-45 bg-emerald-500 flex-shrink-0"></span>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-center text-xl font-semibold text-emerald-800 pt-4">
                  আপনার ইবাদত হোক কবুল, সফর হোক নিরাপদ ও পুণ্যময়।
                </p>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <Link href="/packages">
              <button className="group cursor-pointer relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-white/80"></span>
                  আমাদের প্যাকেজ সমূহ
                </span>
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br"></div>
              </button>
            </Link>
            <Link href="/services">
              <button className="group cursor-pointer relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-white/80"></span>
                  আমাদের সেবাসমূহ
                </span>
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br"></div>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="vision-pattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30 0 L45 15 L30 30 L15 15 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-pattern)" />
          </svg>
        </div>

        <div className="relative xl:container xl:mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/60 transition-all duration-300">
              <h3 className="text-3xl font-bold text-amber-300 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
                আমাদের আদর্শ ও সেবা
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                হজ্জ ও ওমরাহ একটি মহান ইবাদত ও পবিত্র দায়িত্ব। আল্লাহর মেহমানদের
                এই পুণ্যময় পথচলায় সর্বোচ্চ সততা ও আন্তরিকতার সাথে তাদের আজীবনের
                বিশ্বস্ত সহযাত্রী হওয়াই আমাদের
              </p>
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-400/50 rounded-tl"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-400/50 rounded-br"></div>
            </div>

            {/* Mission */}
            <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400/60 transition-all duration-300">
              <h3 className="text-3xl font-bold text-amber-300 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
                আমাদের মূল উদ্দেশ্য
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                আপনার ইবাদতের সফরকে দুশ্চিন্তামুক্ত ও আরামদায়ক করা। সব লজিস্টিক
                ঝামেলা সামলে আপনাকে এমন পরিবেশ দেওয়া, যেন আপনি পূর্ণ একাগ্রতায়
                ইবাদত শেষে আত্মিক শান্তি নিয়ে ফিরতে পারেন।
              </p>
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-400/50 rounded-tl"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-400/50 rounded-br"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <LeaderShipMessage />

      {/* Certification Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-amber-50 to-emerald-50">
        <div className="xl:container xl:mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 relative inline-block">
              বৈধতার নিশ্চয়তা,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                নিরাপদ সেবার আস্থা
              </span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-700 mt-6">
              বাংলাদেশ ও সৌদি সরকার অনুমোদিত একটি বিশ্বস্ত হজ্জ ও ওমরাহ এজেন্সি
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl border-2 border-amber-400/50">
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                <strong className="text-emerald-900">
                  {GeneralInfoList?.CompanyName}
                </strong>{" "}
                বাংলাদেশ ধর্ম মন্ত্রণালয় ও সৌদি সরকার অনুমোদিত একটি সম্পূর্ণ বৈধ
                ও লাইসেন্সপ্রাপ্ত হজ্জ-ওমরাহ কাফেলা। আমাদের রয়েছে নিজস্ব ট্রাভেল
                লাইসেন্স, হজ্জ নিবন্ধন এবং সৌদি অপারেটর অনুমোদন। আল্লাহর
                মেহমানদের নিরাপদ ও নিখুঁত হজ্জযাত্রা নিশ্চিত করতে আমরা প্রতিটি
                প্রশাসনিক ধাপ শতভাগ সততা ও স্বচ্ছতার সাথে সম্পন্ন করি।
              </p>

              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 rounded-tl"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-500/40 rounded-bl"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-500/40 rounded-br"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
    </div>
  );
};

export default AboutUs;
