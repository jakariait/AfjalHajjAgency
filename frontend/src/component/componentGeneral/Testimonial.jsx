"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${apiUrl}/testimonials`);
        setTestimonials(response.data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials.");
        toast.error("Failed to load testimonials.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="pt-10 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="text-center py-10">Loading testimonials...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-10 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="text-center py-10 text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className=" pt-10 pb-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
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

      <div className="text-center mb-16">
        <div className="text-5xl mb-4">🕌</div>
        <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 inline-block">
          আস্থার সঙ্গে,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
            স্বীকৃত হজ সেবা
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-amber-700 font-semibold mt-4">
          আমাদের সম্মানিত হজ ও ওমরাহ যাত্রীদের অভিমত
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        navigation
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 3 },
        }}
        className="px-4 xl:container xl:mx-auto"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t._id}>
            <div className="group relative bg-white rounded-2xl  p-6 border-2 border-emerald-200/50 hover:border-amber-400/50 transition-all h-full flex flex-col justify-between">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-amber-100 text-emerald-800 text-sm font-semibold rounded-full mb-4">
                {t.category}
              </span>
              <p className="text-gray-700 mb-4 min-h-[120px]">{`"${t.review}"`}</p>
              <div className="border-t-2 border-emerald-200/50 pt-4 flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">{t.name}</h4>
                  <p className="text-amber-600 text-sm">{t.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-3 mt-20 ">
        <div className="w-24 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
        <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
        <div className="w-3 h-3 rotate-45 bg-amber-500"></div>
        <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
        <div className="w-24 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
      </div>
    </section>
  );
};

export default Testimonials;
