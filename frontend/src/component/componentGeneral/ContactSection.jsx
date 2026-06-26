import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "../componentGeneral/ContactForm.jsx";

import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const ContactSection = () => {
  const { GeneralInfoList } = useGeneralInfoStore();

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-20 px-6 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="contact-pattern"
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
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
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

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 relative inline-block">
            যোগাযোগ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
              করুন
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-8">
            আপনার হজ্জ বা ওমরাহ যাত্রা সম্পর্কে জানতে আমাদের সাথে যোগাযোগ করুন।
            আমরা আপনাকে সর্বোত্তম সেবা প্রদান করতে প্রস্তুত।
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-400"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-16 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative">
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <div className="group relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
              {/* Decorative Pattern Background */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-300">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="contact-card-pattern"
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
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#contact-card-pattern)"
                  />
                </svg>
              </div>

              {/* Top Decorative Border */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
                  যোগাযোগের তথ্য
                  <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="group/item flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                    {/* Single Icon Box */}
                    <div className="relative bg-white/20 p-4 rounded-xl backdrop-blur-sm group-hover/item:bg-white/30 group-hover/item:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-amber-400" />
                      {/* Decorative corners */}
                      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-300/50"></div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-300/50"></div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 text-amber-300">
                        ইমেইল করুন
                      </h4>

                      {/* Emails Container */}
                      <div className="flex flex-col gap-1">
                        {GeneralInfoList?.CompanyEmail?.map((email, index) => (
                          <p
                            key={index}
                            className="text-emerald-100 hover:text-white transition-colors duration-300"
                          >
                            <a
                              href={`mailto:${email}`}
                              className="break-all text-sm md:text-base"
                            >
                              {email}
                            </a>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group/item flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                    {/* Single Icon Box */}
                    <div className="relative bg-white/20 p-4 rounded-xl backdrop-blur-sm group-hover/item:bg-white/30 group-hover/item:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-amber-400" />
                      {/* Decorative corners */}
                      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-300/50"></div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-300/50"></div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 text-amber-300">
                        ফোন করুন
                      </h4>

                      {/* Phones Container */}
                      <div className="flex flex-col gap-1">
                        {GeneralInfoList?.PhoneNumber?.map((phone, index) => (
                          <p
                            key={index}
                            className="text-emerald-100 hover:text-white transition-colors duration-300"
                          >
                            <a
                              href={`tel:${phone.replace(/\s+/g, "")}`}
                              className="text-sm md:text-base"
                            >
                              {phone}
                            </a>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="group/item flex items-center  space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="relative bg-white/20 p-4 rounded-xl backdrop-blur-sm group-hover/item:bg-white/30 group-hover/item:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-amber-400" />
                      {/* Decorative corners on icon */}
                      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-amber-300/50"></div>
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-amber-300/50"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 text-amber-300">
                        আমাদের ঠিকানা
                      </h4>
                      <p className="text-emerald-100 hover:text-white transition-colors duration-300">
                        {GeneralInfoList?.CompanyAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Decorative Corners */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br"></div>
            </div>

            {/* Additional Info Card */}
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-200/50 hover:border-amber-400/50 transition-all duration-300 overflow-hidden group">
              {/* Decorative Pattern Background */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="info-pattern"
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
                  <rect width="100%" height="100%" fill="url(#info-pattern)" />
                </svg>
              </div>

              {/* Top Decorative Border */}
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full mb-6"></div>

              <div className="relative">
                <h4 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-emerald-500"></span>
                  কার্যালয় সময়
                </h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rotate-45 bg-amber-500"></div>
                    <p>
                      <span className="font-semibold">
                        শনিবার - বৃহস্পতিবার:
                      </span>{" "}
                      সকাল ৯:০০ - সন্ধ্যা ৬:০০
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rotate-45 bg-amber-500"></div>
                    <p>
                      <span className="font-semibold">শুক্রবার:</span> বন্ধ
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-300/40 rounded-tl group-hover:border-amber-400/60 transition-colors duration-300"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-300/40 rounded-tr group-hover:border-amber-400/60 transition-colors duration-300"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-300/40 rounded-bl group-hover:border-amber-400/60 transition-colors duration-300"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-300/40 rounded-br group-hover:border-amber-400/60 transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
    </section>
  );
};

export default ContactSection;
