import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "hajj-umrah",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear the error for the current field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (setFieldErrors = true) => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "পূর্ণ নাম আবশ্যক!";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর আবশ্যক!";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "বার্তা আবশ্যক!";
      isValid = false;
    }

    if (setFieldErrors) {
      setErrors(newErrors);
    }
    return isValid;
  };

  useEffect(() => {
    setFormIsValid(validateForm(false)); // Validate without setting errors
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // validateForm will set errors if it's called with setFieldErrors = true (default)
      return; // Stop submission if validation fails
    }

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phone,
      emailAddress: formData.email,
      services: formData.service,
      message: formData.message,
    };

    try {
      const res = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // ✅ Fire GTM event on success
        gtmPushEvent("form_submission", {
          formType: "ContactForm",
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        });

        setSuccessMsg("✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "hajj-umrah",
          message: "",
        });

        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        console.error("❌ Failed to send message");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-300">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="form-pattern"
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
          <rect width="100%" height="100%" fill="url(#form-pattern)" />
        </svg>
      </div>

      {/* Top Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
          আমাদের বার্তা পাঠান
          <span className="w-2 h-2 rotate-45 bg-amber-400"></span>
        </h3>

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              পূর্ণ নাম *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-emerald-900 placeholder-gray-400"
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-300/30 rounded-tl pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-300/30 rounded-br pointer-events-none"></div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              ইমেইল ঠিকানা
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-emerald-900 placeholder-gray-400"
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              />
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-300/30 rounded-tl pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-300/30 rounded-br pointer-events-none"></div>
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              ফোন নম্বর *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-emerald-900 placeholder-gray-400"
                placeholder="আপনার ফোন নম্বর লিখুন"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-300/30 rounded-tl pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-300/30 rounded-br pointer-events-none"></div>
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              সেবা নির্বাচন করুন
            </label>
            <div className="relative">
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-emerald-900 cursor-pointer"
              >
                <option value="hajj-umrah">হজ ও ওমরাহ</option>
                <option value="hajj">হজ প্যাকেজ</option>
                <option value="umrah">ওমরাহ প্যাকেজ</option>
                <option value="visa">ভিসা সেবা</option>
                <option value="other">অন্যান্য</option>
              </select>
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-300/30 rounded-tl pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-300/30 rounded-br pointer-events-none"></div>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              বার্তা *
            </label>
            <div className="relative">
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-emerald-900 placeholder-gray-400 resize-none"
                placeholder="আপনার প্রয়োজন সম্পর্কে আমাদের জানান..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-300/30 rounded-tl pointer-events-none"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-300/30 rounded-br pointer-events-none"></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            // disabled={!formIsValid}
            className={`group/btn relative w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 overflow-hidden
            `}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              <span className="w-2 h-2 rotate-45 bg-white/80"></span>
              <Send className="w-5 h-5" />
              <span className="text-lg">বার্তা পাঠান</span>
              <span className="w-2 h-2 rotate-45 bg-white/80"></span>
            </span>

            {/* Decorative Corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/40 rounded-tl"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/40 rounded-br"></div>
          </button>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="relative mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="success-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="8" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#success-pattern)" />
              </svg>
            </div>

            <p className="relative z-10">{successMsg}</p>

            {/* Decorative corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white/50 rounded-tl"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white/50 rounded-br"></div>
          </div>
        )}
      </div>

      {/* Card Decorative Corners */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl"></div>
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr"></div>
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl"></div>
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br"></div>
    </div>
  );
};

export default ContactForm;
