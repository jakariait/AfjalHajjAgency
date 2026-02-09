import React from "react";
import { Link } from "react-router-dom"

import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const TermsCondition = () => {

  const { GeneralInfoList } = useGeneralInfoStore();

  const email = GeneralInfoList?.CompanyEmail[0];

  const policySections = [
    {
      title: "Definitions",
      content: () => (
        <>
          <p className="mb-2">
            “Company,” “we,” “us,” “our” refers to {GeneralInfoList?.CompanyName}.
          </p>
          <p className="mb-2">
            “User,” “you,” “your” refers to the person using our website or
            services.
          </p>
          <p className="mb-2">
            “Service(s)” refers to Hajj and Umrah booking, visa processing,
            transport, accommodation, and other related services provided by us.
          </p>
          <p className="mb-2">
            “Website” refers to www.hajjexpressbd.com.
          </p>
        </>
      ),
    },
    {
      title: "Booking and Payment Policy",
      content: () => (
        <>
          <p className="mb-2">
            Bookings can be made online, over the phone, or in person.
          </p>
          <p className="mb-2">
            A minimum deposit (as specified on each package) is required to
            confirm your reservation.
          </p>
          <p className="mb-2">
            Full payment must be made within the specified timeline, typically
            30 days before departure unless otherwise stated.
          </p>
          <p className="mb-2">
            All prices are listed in Bangladeshi Taka (BDT) and are subject to
            change based on currency fluctuations, fuel surcharges, or Saudi
            policy changes.
          </p>
          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            Accepted Payment Methods:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bank Transfer</li>
            <li>Mobile Banking (bKash/Nagad)</li>
            <li>Credit/Debit Cards</li>
            <li>Cash (in person)</li>
          </ul>
        </>
      ),
    },
    {
      title: "Travel Documents and Requirements",
      content: () => (
        <>
          <p className="mb-2">
            You are solely responsible for ensuring the following:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A valid passport with at least 6 months’ validity from travel date</li>
            <li>Required vaccinations (e.g., Meningitis, COVID-19 if applicable)</li>
            <li>Correct documentation for Hajj/Umrah as per Saudi Arabia’s Ministry of Hajj</li>
            <li>Compliance with visa rules, health screening, and country-specific regulations</li>
          </ul>
          <p className="mt-2">
            Failure to provide necessary documents may lead to denial of service
            without refund.
          </p>
        </>
      ),
    },
    {
      title: "Cancellation and Refund Policy",
      content: () => (
        <>
          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            By Client:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cancellations must be made in writing (email or letter).</li>
            <li>Refund eligibility depends on the time of cancellation and payment stage.</li>
            <li>Non-refundable fees include visa costs, flight penalties, and administrative charges.</li>
          </ul>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
              <tr>
                <th className="py-2 px-4 border-b">Cancellation Timeframe</th>
                <th className="py-2 px-4 border-b">Refund Eligibility</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="py-2 px-4 border-b">60+ Days before Departure</td>
                <td className="py-2 px-4 border-b">75% Refund</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">30 – 59 Days before Departure</td>
                <td className="py-2 px-4 border-b">50% Refund</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Less than 30 Days</td>
                <td className="py-2 px-4 border-b">No Refund</td>
              </tr>
              </tbody>
            </table>
          </div>
          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            By Company:
          </h4>
          <p className="mb-2">
            We reserve the right to cancel any package due to unforeseen
            circumstances (e.g., government restrictions, low participation,
            pandemic), in which case a full or partial refund may be offered.
          </p>
        </>
      ),
    },
    {
      title: "Travel Insurance",
      content: () => (
        <>
          <p className="mb-2">
            We strongly recommend that all travelers obtain comprehensive travel
            insurance to cover medical expenses, personal belongings, delays,
            and cancellations. {GeneralInfoList?.CompanyName} is not liable for any loss or
            injury not directly caused by our negligence.
          </p>
        </>
      ),
    },
    {
      title: "Changes and Substitutions",
      content: () => (
        <>
          <p className="mb-2">We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Modify routes, hotels, flights, or schedules due to unforeseen
              operational needs or external events.
            </li>
            <li>
              Substitute services of similar or higher standard without
              additional cost.
            </li>
            <li>
              Adjust pricing if significant cost changes occur beyond our control
              (e.g., airfare, visa fees).
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Code of Conduct and Behavior",
      content: () => (
        <>
          <p className="mb-2">All pilgrims are expected to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Follow Islamic etiquette and Saudi laws</li>
            <li>Obey instructions from group leaders and officials</li>
            <li>Avoid disruptive behavior or illegal activities</li>
            <li>Respect group timings and schedules</li>
          </ul>
          <p className="mt-2">
            {GeneralInfoList?.CompanyName} reserves the right to remove any individual from the
            group for misconduct without refund.
          </p>
        </>
      ),
    },
    {
      title: "Limitation of Liability",
      content: () => (
        <>
          <p className="mb-2">{GeneralInfoList?.CompanyName} shall not be held responsible for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Loss, damage, or theft of personal belongings</li>
            <li>
              Delays or disruptions due to airline strikes, natural disasters, or
              political unrest
            </li>
            <li>
              Acts beyond our control, including changes in Saudi policy
            </li>
            <li>
              Any accident, injury, or death not caused directly by our
              negligence
            </li>
          </ul>
          <p className="mt-2">
            Our maximum liability shall not exceed the total amount paid for the
            affected service.
          </p>
        </>
      ),
    },
    {
      title: "Intellectual Property",
      content: () => (
        <>
          <p className="mb-2">
            All content on our website, including text, images, logos, graphics,
            and software, is the property of {GeneralInfoList?.CompanyName} and protected by
            copyright laws. Unauthorized use, copying, or reproduction is
            strictly prohibited.
          </p>
        </>
      ),
    },
    {
      title: "Privacy Policy",
      content: () => (
        <>
          <p className="mb-2">
            Your use of our website is also governed by our{" "}
            <Link href="/privacy-policy" className="text-emerald-700 hover:underline">
              Privacy Policy
            </Link>
            , which outlines how your personal data is collected and processed.
          </p>
        </>
      ),
    },
    {
      title: "Governing Law",
      content: () => (
        <>
          <p className="mb-2">
            These Terms are governed by the laws of the People’s Republic of
            Bangladesh. Any disputes shall be subject to the exclusive
            jurisdiction of the courts in Dhaka, Bangladesh.
          </p>
        </>
      ),
    },
    {
      title: "Changes to Terms",
      content: () => (
        <>
          <p className="mb-2">
            We reserve the right to amend these Terms at any time. Continued use
            of our services after such changes implies your acceptance of the
            updated Terms. Please check this page periodically.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="privacy-pattern"
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
          <rect width="100%" height="100%" fill="url(#privacy-pattern)" />
        </svg>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

      <div className="relative xl:container xl:mx-auto">
        {/* Section Header */}
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
            Terms and Conditions
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-amber-700 font-semibold mt-8 mb-4">
            Your Privacy, Our Commitment
          </p>

          {/* Description */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-emerald-200/50">
              {/* Decorative Corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40 rounded-tl"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-500/40 rounded-tr"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/40 rounded-bl"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 rounded-br"></div>

              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                Thank you for visiting {GeneralInfoList?.CompanyName}. Please read this Terms
                and Conditions carefully. By using our website or submitting
                your information to us, you consent to the practices described
                herein.
              </p>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-400"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-16 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
          </div>
        </div>

        {/* Policy Sections Grid */}
        <div className="grid grid-cols-1  gap-8 mb-16">
          {policySections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-emerald-200/50 hover:border-amber-400/50"
            >
              {/* Decorative Background Pattern */}
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
                    fill={`url(#card-pattern-${index})`}
                  />
                </svg>
              </div>

              {/* Top Decorative Border */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>

              {/* Content */}
              <div className="relative p-8">
                {/* Title */}
                <h3 className="text-2xl font-bold text-emerald-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                  {section.title}
                </h3>

                {/* Decorative Line */}
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full mb-4"></div>

                {/* Description */}
                <div className="text-gray-600 leading-relaxed mb-6 ">
                  {section.content()}
                </div>
              </div>

              {/* Card Decorative Corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-300/30 rounded-tl group-hover:border-amber-400/50 transition-colors duration-300"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-300/30 rounded-tr group-hover:border-amber-400/50 transition-colors duration-300"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-300/30 rounded-bl group-hover:border-amber-400/50 transition-colors duration-300"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-300/30 rounded-br group-hover:border-amber-400/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Contact & Updates Section */}
        <div className="text-center">
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-3 h-3 rotate-45 bg-amber-500"></div>
            <div className="w-2 h-2 rotate-45 bg-emerald-400"></div>
            <div className="w-24 h-px bg-gradient-to-r from-emerald-300 to-transparent"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Contact Info */}
            <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-200/50">
              <p className="text-gray-700 text-lg">
                <strong className="text-emerald-900">
                  Questions about your Terms and Conditions?
                </strong>
                <br />
                Contact us at:{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-emerald-700 font-semibold hover:text-amber-600 transition-colors duration-300"
                >
                  {email}
                </a>
              </p>
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-300/40 rounded-tl"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/40 rounded-br"></div>
            </div>

            {/* Last Updated */}
            <div className="relative bg-gradient-to-r from-emerald-50 to-amber-50 p-6 rounded-xl border-2 border-amber-400/30">
              <p className="text-gray-700">
                <strong className="text-emerald-900">Last Updated:</strong>{" "}
                {"February 4, 2026"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                We reserve the right to update this Terms and Condition at any
                time. Please review this page periodically.
              </p>
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/40 rounded-tl"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400/40 rounded-br"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
    </section>
  );
};

export default TermsCondition;
