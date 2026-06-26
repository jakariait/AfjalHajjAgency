import React from "react";
import mustofa from "../../../public/Al-Haj-Ghulam-Mustafa.webp";
import ithan from "../../../public/Iqramul-Hasan-Ether.webp";

const LeaderShipMessage = () => {
  const leaders = [
    {
      name: "আলহাজ্ব আফজাল হোসেন",
      position: "চেয়ারম্যান",
      image: mustofa,
      message: `"بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"

আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ

বিত্র হজ্জ ও ওমরাহ মহান আল্লাহর সন্তুষ্টি অর্জনের এক অনন্য ইবাদত। আল্লাহর মেহমানদের এই পবিত্র সফরের যাত্রাপথ সহজ, নিরাপদ ও নির্বিঘ্ন করতে সহায়তা করাই আমাদের প্রধান দায়িত্ব ও মূল অঙ্গীকার। দীর্ঘ ২০ বছর ধরে উত্তরবঙ্গের ধর্মপ্রাণ মুসলমানদের অত্যন্ত নির্ভরযোগ্য ও বিশ্বস্ত কাফেলা হিসেবে আফজাল হজ্জ এজেন্সি অত্যন্ত সুনামের সাথে হজ্জ ও ওমরাহ যাত্রীদের খিদমত করে আসছে।

ঠাকুরগাঁওসহ পুরো উত্তরবঙ্গের মানুষের ভালোবাসা ও আস্থাই আমাদের পথচলার মূল চালিকাশক্তি। আমরা বিশ্বাস করি, প্রতিটি হাজী সাহেব আমাদের কাছে মহান আল্লাহর পক্ষ থেকে এক একটি পবিত্র আমানত। তাই নিজ এলাকার মানুষের এই আধ্যাত্মিক সফরের প্রতিটি ধাপে সঠিক শরয়ী দিকনির্দেশনা, মানসম্মত আবাসন ও আন্তরিক সেবার মাধ্যমে একটি ইবাদত-অনুকূল পরিবেশ নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ। আল্লাহর ঘরের সফরে আপনার বিশ্বস্ত সহযাত্রী হতে পেরে আমরা অত্যন্ত আনন্দিত ও গর্বিত।

আসুন, এই পবিত্র সফরে আমরা একসাথে এগিয়ে যাই আল্লাহর সন্তুষ্টির খোঁজে।`,
    },
    {
      name: "মোঃ সাইফুল রাজা",
      position: "ব্যবস্থাপনা পরিচালক",
      image: ithan,
      message: `"بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"

আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ

সমস্ত প্রশংসা সেই মহান আল্লাহর, যিনি আমাদের ইসলাম, ঈমান ও হজ্জের মতো বরকতময় ইবাদত দান করেছেন। আফজাল হজ্জ এজেন্সি-এর পক্ষ থেকে দেশ ও উত্তরবঙ্গের সকল মুসলিম ভাই-বোনদের জানাই আন্তরিক শুভেচ্ছা ও মোবারকবাদ।

আমাদের এই প্রতিষ্ঠান গড়ে তোলার মূল উদ্দেশ্য হলো—হজ্জ ও ওমরাহর পবিত্র সফরকে হাজীদের জন্য সহজ, নিরাপদ ও শতভাগ নির্ভরযোগ্য করে তোলা। আধুনিক প্রযুক্তি, সুপরিকল্পিত ব্যবস্থাপনা এবং আন্তরিক সেবার মাধ্যমে আমরা সর্বদা চেষ্টা করি যেন আপনার ইবাদতের সফরটি হয় আরও প্রশান্তিময় ও ঝামেলামুক্ত। উত্তরবঙ্গের মানুষের ধর্মীয় আবেগ ও আস্থাকে সম্মান জানিয়ে আমাদের অভিজ্ঞ টিম ২৪/৭ আপনাদের প্রয়োজনীয় দিকনির্দেশনা ও সহায়তা দিতে প্রস্তুত থাকে।

আমরা বিশ্বাস করি, এই সফর শুধু একটি সাধারণ ভ্রমণ নয়—এটি একটি আত্মিক ও আধ্যাত্মিক পরম যাত্রা। সেই পুণ্যময় যাত্রায় আপনাদের সেবক ও সহযাত্রী হতে পারা আমাদের জন্য অত্যন্ত গর্বের এবং একটি পবিত্র আমানত।

পরিশেষে, আপনাদের দোয়া ও সহযোগিতা কামনা করছি যেন আমরা এই মহান দায়িত্ব যথাযথভাবে পালন করতে পারি। আল্লাহ আমাদের সবার হজ্জ ও ওমরাহকে কবুল করুন। আমিন।
`,
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
                  {/*<div className="mb-4 flex justify-center">*/}
                  {/*  <img*/}
                  {/*    src={leader.image}*/}
                  {/*    alt={leader.name}*/}
                  {/*    width={200}*/}
                  {/*    height={220}*/}
                  {/*    className=" object-cover border-1 border-emerald-400 shadow-lg"*/}
                  {/*  />*/}
                  {/*</div>*/}
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
