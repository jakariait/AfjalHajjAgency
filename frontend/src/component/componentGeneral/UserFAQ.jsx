"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserFAQ = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/faq`);

        // ✅ Same working logic
        const publishedFaqs =
          res.data?.data?.filter((faq) => faq.status === "published") || [];

        setFaqs(publishedFaqs);
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) fetchFAQs();
  }, [apiUrl]);

  return (
    <section className="py-20 bg-gray-50 xl:container xl:mx-auto px-4 md:px-8">
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
          প্রায়শই জিজ্ঞাসিত{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
            প্রশ্নাবলী
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-8">
          আপনার হজ ও ওমরাহ সম্পর্কিত সাধারণ প্রশ্নের উত্তর এখানে পাবেন
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

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-40 gap-3">
          <CircularProgress sx={{ color: "#059669" }} />
          <p className="text-emerald-700 font-semibold">লোড হচ্ছে...</p>
        </div>
      )}

      {/* FAQ List */}
      {!loading && faqs.length > 0 && (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Accordion
              key={faq._id}
              sx={{
                background: "#ffffff",
                border: "1px solid #d1fae5",
                borderRadius: "14px !important",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "all .3s ease",

                "&:before": { display: "none" },

                "&:hover": {
                  borderColor: "#fbbf24",
                  boxShadow: "0 10px 20px rgba(251,191,36,.2)",
                },

                "&.Mui-expanded": {
                  margin: "0",
                  borderColor: "#10b981",
                },
              }}
            >
              {/* Question */}
              <AccordionSummary
                expandIcon={
                  <div className="p-2 rounded-full bg-emerald-100">
                    <ExpandMoreIcon sx={{ color: "#059669" }} />
                  </div>
                }
                aria-controls={`panel-${faq._id}`}
                sx={{
                  padding: "18px 22px",

                  "&:hover": {
                    background: "rgba(16,185,129,0.04)",
                  },

                  "& .MuiAccordionSummary-content": {
                    margin: "8px 0",
                  },
                }}
              >
                <div className="flex gap-3 items-start w-full">
                  {/* Number */}
                  <span className="flex-shrink-0 w-7 h-7 rounded-md bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>

                  <h3 className="text-lg md:text-xl font-semibold text-emerald-900 leading-relaxed">
                    {faq.question}
                  </h3>
                </div>
              </AccordionSummary>

              {/* Answer */}
              <AccordionDetails
                sx={{
                  padding: "18px 22px 22px",
                  background: "rgba(16,185,129,0.02)",
                  borderTop: "1px solid #d1fae5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    lineHeight: "1.8",
                    color: "#374151",
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && faqs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">কোনো প্রশ্ন পাওয়া যায়নি</p>
        </div>
      )}
    </section>
  );
};

export default UserFAQ;
