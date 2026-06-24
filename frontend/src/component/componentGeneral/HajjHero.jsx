import { useEntranceAnimation } from "../../hooks/useEntranceAnimation.js";
import { Link } from "react-router-dom";

export default function HajjHero() {
  const isVisible = useEntranceAnimation();

  return (
    <section className="relative pt-10 pb-30 w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/75 via-black/65 to-teal-800/75 z-10 animate-pulse-slow" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover brightness-[0.7] contrast-110"
        >
          <source src="/12575031_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Islamic Geometric Pattern Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(212, 175, 55, 0.03) 100px, rgba(212, 175, 55, 0.03) 102px),
            repeating-linear-gradient(-45deg, transparent, transparent 100px, rgba(212, 175, 55, 0.03) 100px, rgba(212, 175, 55, 0.03) 102px)
          `,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-30 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-0 animate-float"
            style={{
              left: `${(i + 1) * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-40 text-center text-white max-w-7xl px-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Islamic Ornament */}
        <div
          className={`w-20 h-20 mx-auto mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
          >
            <path
              d="M50 5L55 25L65 15L60 35L80 30L65 45L85 50L65 55L80 70L60 65L65 85L55 75L50 95L45 75L35 85L40 65L20 70L35 55L15 50L35 45L20 30L40 35L35 15L45 25L50 5Z"
              fill="#D4AF37"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="12"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="6" fill="#D4AF37" />
          </svg>
        </div>

        {/* Bismillah */}
        <div
          className={`font-amiri text-4xl md:text-5xl text-amber-400 mb-10 tracking-wider transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ textShadow: "0 2px 20px rgba(212, 175, 55, 0.5)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Main Title */}
        <h1
          className={`font-noto-serif-bengali text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)" }}
        >
          আপনার হজ্জ
          <br />
          আমাদের দায়িত্ব
        </h1>

        {/* Subtitle */}
        <p
          className={`font-noto-serif-bengali text-xl md:text-3xl leading-relaxed mb-12 text-stone-100 max-w-4xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ textShadow: "0 2px 15px rgba(0, 0, 0, 0.6)" }}
        >
          বিশ্বস্ত সেবা, অভিজ্ঞ গাইড ও সার্বক্ষণিক তত্ত্বাবধানে সম্পন্ন করুন আপনার পবিত্র হজ্জ । আমরা আছি আপনার পাশে প্রতিটি পদক্ষেপ ।
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex gap-6 justify-center flex-wrap transition-all duration-1000 delay-[1100ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link to="/packages">
            {" "}
            <button className="group cursor-pointer relative px-12 py-4 text-xl font-semibold font-noto-serif-bengali rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black overflow-hidden shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-0 h-0 rounded-full bg-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:w-[400px] group-hover:h-[400px]" />
              <span className="relative z-10">হজ্জ প্যাকেজ দেখুন</span>
            </button>
          </Link>

          <Link to="/contact-us">
            <button className="group cursor-pointer relative px-12 py-4 text-xl font-semibold font-noto-serif-bengali rounded-full bg-transparent text-white border-2 border-amber-400 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] hover:bg-amber-400/15 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-0 h-0 rounded-full bg-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:w-[400px] group-hover:h-[400px]" />
              <span className="relative z-10">এখনই যোগাযোগ করুন</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 delay-[1500ms] ${isVisible ? "opacity-100" : "opacity-0"} animate-bounce-slow`}
      >
        <svg
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-12 stroke-amber-400"
        >
          <rect x="1" y="1" width="22" height="38" rx="11" strokeWidth="2" />
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="currentColor"
            className="animate-scroll-dot"
          />
        </svg>
      </div>
    </section>
  );
}
