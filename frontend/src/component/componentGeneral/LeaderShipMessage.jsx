import React from "react";
import mustofa from "../../../public/Al-Haj-Ghulam-Mustafa.webp";
import ithan from "../../../public/Iqramul-Hasan-Ether.webp";

const LeaderShipMessage = () => {
  const leaders = [
    {
      name: "আলহাজ্ব গোলাম মোস্তফা",
      position: "চেয়ারম্যান",
      image: mustofa,
      message: `"بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"

আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ

পবিত্র হজ ও উমরা শুধুমাত্র আল্লাহর সন্তুষ্টির উদ্দেশ্যে পালন করা একটি মহান ইবাদত। এ মহান সফরে যাত্রাপথ সহজ ও নির্বিঘ্ন করতে সহায়তা করাই আমাদের প্রধান দায়িত্ব ও অঙ্গীকার। Hajj Express BD একটি সৎ, নির্ভরযোগ্য ও অভিজ্ঞ প্রতিষ্ঠান হিসেবে দীর্ঘদিন যাবত দেশ-বিদেশে সম্মানের সাথে হজ ও উমরা যাত্রীদের সেবা দিয়ে আসছে।

আমরা বিশ্বাস করি, প্রতিজন হাজীই আমাদের হাতে আমানত। তাই প্রতিটি ধাপে আমরা নিশ্চিত করি আদর্শ ব্যবস্থাপনা, দোয়া-দারুদে পরিপূর্ণ পরিবেশ ও আন্তরিক খেদমত। আল্লাহর ঘরের সফরে আপনার বিশ্বস্ত সহযোগী হতে পেরে আমরা গর্বিত।

আসুন, এই পবিত্র সফরে একসাথে যাই, আল্লাহর সন্তুষ্টির পথে।`,
    },
    {
      name: "ইকরামুল হাসান ইথার",
      position: "ব্যবস্থাপনা পরিচালক",
      image: ithan,
      message: `"بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"

আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ

সমস্ত প্রশংসা সেই আল্লাহর, যিনি আমাদের ইসলাম, ঈমান ও হজের মতো বরকতময় ইবাদাত দান করেছেন। Hajj Express BD – এর পক্ষ থেকে সকল মুসলিম ভাই – বোনদের আন্তরিক শুভেচ্ছা ও অভিনন্দন জানাচ্ছি।

এই প্রতিষ্ঠান গড়ে তোলার মূল উদ্দেশ্য হলো — হজ ও ওমরাহর পবিত্র সফরকে সহজ, নিরাপদ ও নির্ভরযোগ্য করে তোলা। আধুনিক প্রযুক্তি এবং আন্তরিক সেবার মাধ্যমে আমরা চেষ্টা করবো যেন আপনার ইবাদতের সফরটি হয় আরও প্রশান্তিময় ও ঝামেলামুক্ত। আমাদের অভিজ্ঞ টিম সর্বদা প্রস্তুত থাকবে আপনাদের প্রয়োজনীয় দিকনির্দেশনা ও সহায়তা দিতে।

আমরা বিশ্বাস করি, এই সফর শুধু একটি ভ্রমণ নয় — এটি এক আত্মিক ও আধ্যাত্মিক যাত্রা। সেই যাত্রায় আপনাদের সহযাত্রী হতে পারা আমাদের জন্য গর্বের ও আমানতের ব্যাপার।

পরিশেষে, আপনাদের দোয়া ও সহযোগিতা কামনা করছি যেন আমরা এ মহান দায়িত্ব যথাযথভাবে পালন করতে পারি।
আল্লাহ আমাদের সবাইকে কবুল করুন। আমিন।`,
    },
  ];
  return (
    <section className="relative py-20 px-4">
      <div className="xl:container xl:mx-auto">
        <div className="space-y-16">
          {leaders.map((leader, index) => (
            <div key={index} className="max-w-5xl mx-auto">
              <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border-2 border-emerald-200/50">
                {/* Leader Info */}
                <div className="text-center mb-8">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      width={200}
                      height={220}
                      className=" object-cover border-1 border-emerald-400 shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-lg text-amber-600 font-semibold">
                    {leader.position}
                  </p>
                </div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
                  <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
                  <div className="w-2 h-2 rotate-45 bg-amber-400"></div>
                  <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
                  <div className="w-16 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
                </div>

                {/* Message */}
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {leader.message}
                </div>

                {/* Signature */}
                <div className="mt-8 pt-6 border-t-2 border-emerald-200/50 text-right">
                  <p className="text-emerald-900 font-semibold text-lg">
                    শুভেচ্ছান্তে –
                  </p>
                  <p className="text-amber-700 font-bold text-xl">
                    {leader.name}
                  </p>
                  <p className="text-gray-600">{leader.position}</p>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-300/40 rounded-tr"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/40 rounded-bl"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaderShipMessage;
