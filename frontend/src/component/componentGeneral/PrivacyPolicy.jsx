import React from "react";
import useGeneralInfoStore from "../../store/GeneralInfoStore.js";

const PrivacyPolicy = () => {
  const { GeneralInfoList } = useGeneralInfoStore();

  const email = GeneralInfoList?.CompanyEmail[0];

  const policySections = [
    {
      title: "Introduction",
      content: () => (
        <>
          <p>
            {GeneralInfoList?.CompanyName} (“we”, “our”, “us”) is committed to
            protecting and respecting your privacy. This Privacy Policy explains
            how we collect, use, store, and disclose your personal information
            when you interact with our website or use our services related to
            Hajj and Umrah travel bookings.
          </p>
          <p className="mt-4">
            We advise you to read this Privacy Policy carefully to understand
            how your data is handled. By using our website or submitting your
            information to us, you consent to the practices described herein.
          </p>
        </>
      ),
    },
    {
      title: "Information We Collect",
      content: () => (
        <>
          <p>
            We collect various categories of personal and non-personal data
            depending on how you interact with our services.
          </p>

          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            01. Personal Information
          </h4>
          <p className="mb-2">
            When you register, book, or inquire about Hajj or Umrah packages, we
            may collect the following:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name (as per passport)</li>
            <li>Passport number, issue & expiry dates</li>
            <li>National ID or Birth Certificate number</li>
            <li>Date of birth</li>
            <li>Gender</li>
            <li>Marital status</li>
            <li>Country of residence</li>
            <li>Address (permanent and present)</li>
            <li>Phone number and email address</li>
            <li>Emergency contact details</li>
            <li>Travel preferences and special requests</li>
            <li>Copy of passport and photographs</li>
          </ul>

          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            02. Payment Information
          </h4>
          <p className="mb-2">We may collect or facilitate:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mobile banking details (e.g., bKash, Nagad)</li>
            <li>Credit/debit card details</li>
            <li>Bank transaction receipts (for manual bookings)</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600">
            Note: We do not store full credit/debit card numbers. All payments
            are processed through secure third-party payment gateways.
          </p>

          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            03. Technical Information
          </h4>
          <p className="mb-2">
            Automatically collected data via cookies and analytics tools may
            include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type and OS</li>
            <li>Pages visited</li>
            <li>Time spent on each page</li>
            <li>Referring website or URL</li>
            <li>Geographic location (approximate)</li>
          </ul>
        </>
      ),
    },
    {
      title: "How We Use Your Information",
      content: () => (
        <>
          <p className="mb-2">We use your data to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Register and manage your Hajj/Umrah booking</li>
            <li>Process and confirm travel itineraries</li>
            <li>Fulfill legal requirements with Saudi and local authorities</li>
            <li>Provide customer support and travel assistance</li>
            <li>
              Send administrative notifications (e.g., booking confirmations,
              visa status)
            </li>
            <li>Send marketing communications (if you opt-in)</li>
            <li>Improve website functionality and user experience</li>
          </ul>

          <h4 className="text-lg font-semibold text-emerald-800 mt-4 mb-2">
            Legal Basis for Processing
          </h4>
          <p className="mb-2">
            We collect and process your data based on the following lawful
            grounds under applicable laws:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your explicit consent</li>
            <li>To fulfill contractual obligations (e.g., booking services)</li>
            <li>
              To comply with legal obligations (e.g., sharing data with Hajj
              regulatory bodies)
            </li>
            <li>
              For our legitimate interests in improving service quality and
              security
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Sharing & Disclosure",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `<p class="mb-2">We do not sell or rent your data to any third parties. However, we may share information with:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Government Authorities: including the Ministry of Hajj & Umrah (KSA), MOFA, and Bangladesh Hajj Office</li>
  <li>Third-party travel partners: airlines, hotels, transport providers</li>
  <li>Payment processors: for secure financial transactions</li>
  <li>IT service providers: hosting, analytics, and email delivery systems</li>
</ul>
<p class="mt-2 text-sm text-gray-600">All third parties are required to comply with data protection laws and confidentiality agreements.</p>`,
          }}
        />
      ),
    },
    {
      title: "Data Storage & Security",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `<p class="mb-2">We use strong administrative, physical, and technical safeguards to protect your personal information:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>SSL encryption for secure website communications</li>
  <li>Firewall and malware protection</li>
  <li>Secure servers with restricted access</li>
  <li>Role-based access control for internal staff</li>
  <li>Data retention policies to delete information no longer required</li>
</ul>
<p class="mt-2 text-sm text-gray-600">Your personal data is retained only as long as necessary to fulfill the purposes for which it was collected, or as required by law.</p>`,
          }}
        />
      ),
    },
    {
      title: "Your Rights",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `<p class="mb-2">As a data subject, you have the following rights:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Right to Access – Request a copy of the information we hold about you</li>
  <li>Right to Correction – Request updates or corrections to your information</li>
  <li>Right to Deletion – Request your data be erased under certain conditions</li>
  <li>Right to Object – Object to processing your data for marketing purposes</li>
  <li>Right to Withdraw Consent – You may withdraw your consent at any time</li>
  <li>Right to Data Portability – Request transfer of your data to another provider</li>
</ul>
<p class="mt-2 text-sm text-gray-600">To exercise these rights, please email us at: contact @hajjexpressbd.com</p>`,
          }}
        />
      ),
    },
    {
      title: "Cookies & Tracking",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `<p class="mb-2">We use cookies and similar tools to collect technical information and improve your browsing experience.</p>

<h4 class="text-lg font-semibold text-emerald-800 mt-4 mb-2">Types of Cookies Used:</h4>
<ul class="list-disc pl-5 space-y-1">
  <li>Essential Cookies – Necessary for site functionality</li>
  <li>Performance Cookies – Analyze site performance (e.g., Google Analytics)</li>
  <li>Functional Cookies – Save your preferences</li>
  <li>Marketing Cookies – Personalize offers and content (with consent)</li>
</ul>
<p class="mt-2 text-sm text-gray-600">You can manage or disable cookies through your browser settings.</p>

<h4 class="text-lg font-semibold text-emerald-800 mt-4 mb-2">Third-Party Links</h4>
<p class="mb-2">Our website may contain links to other sites. We are not responsible for the privacy practices of third-party websites. We recommend reviewing their policies before submitting any personal data.</p>`,
          }}
        />
      ),
    },
    {
      title: "Children's Privacy",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `Our services are not directed to individuals under the age of 18. We do not knowingly collect data from minors. If we become aware that a child has submitted personal data, we will delete it immediately.`,
          }}
        />
      ),
    },
    {
      title: "International Transfers",
      content: () => (
        <div
          dangerouslySetInnerHTML={{
            __html: `In the course of processing your Hajj and Umrah booking, your data may be transferred outside Bangladesh (e.g., to Saudi Arabia). We ensure such transfers are made securely and in accordance with applicable data protection laws.

Policy Updates
We reserve the right to update this Privacy Policy at any time. The updated version will be posted on our website with a revised “Effective Date”. We encourage you to review this page periodically.`,
          }}
        />
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
            Privacy Policy
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
                Thank you for visiting {GeneralInfoList?.CompanyName}. Please
                read this Privacy Policy carefully. By using our website or
                submitting your information to us, you consent to the practices
                described herein.
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
                  Questions about your privacy?
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
                We reserve the right to update this Privacy Policy at any time.
                Please review this page periodically.
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

export default PrivacyPolicy;
