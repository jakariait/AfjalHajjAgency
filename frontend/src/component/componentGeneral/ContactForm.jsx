import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const ContactForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateSingleField(name);
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    validateSingleField("phone");
  };

  const validateSingleField = (fieldName) => {
    const value =
      typeof formData[fieldName] === "string"
        ? formData[fieldName].trim()
        : formData[fieldName] || "";
    let error = "";

    if (fieldName === "name") {
      if (!value) error = "পূর্ণ নাম আবশ্যক!";
      else if (value.length < 3) error = "নাম কমপক্ষে ৩ অক্ষর হতে হবে!";
    } else if (fieldName === "phone") {
      if (!value) error = "ফোন নম্বর আবশ্যক!";
    } else if (fieldName === "address") {
      if (!value) error = "ঠিকানা আবশ্যক!";
      else if (value.length < 5) error = "ঠিকানা কমপক্ষে ৫ অক্ষর হতে হবে!";
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
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
    if (!formData.address.trim()) {
      newErrors.address = "ঠিকানা আবশ্যক!";
      isValid = false;
    }

    if (setFieldErrors) {
      setErrors(newErrors);
      setTouched({ name: true, phone: true, address: true });
    }
    return isValid;
  };
  useEffect(() => {
    setFormIsValid(validateForm(false));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg(""); // Clear previous success messages
    setErrorMsg(""); // Clear previous error messages

    if (!validateForm()) {
      return;
    }

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phone,
      address: formData.address,
      message: formData.message,
    };

    try {
      const res = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submission",
          formType: "ContactForm",
          fullName: formData.name,
          phone: formData.phone,
          address: formData.address,
          message: formData.message,
        });

        setSuccessMsg("✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
        setFormData({
          name: "",
          phone: "",
          address: "",
          message: "",
        });

        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        let errorMessage = "❌ বার্তা পাঠাতে ব্যর্থ হয়েছে!";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.error("❌ Failed to parse error response:", jsonError);
        }
        setErrorMsg(errorMessage);
        console.error(
          "❌ Failed to send message with status:",
          res.status,
          errorMessage,
        );
        setTimeout(() => setErrorMsg(""), 5000);
      }
    } catch (error) {
      setErrorMsg(
        "❌ বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      );
      console.error("❌ Error submitting form:", error);
      setTimeout(() => setErrorMsg(""), 5000);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
      <style>{`
                .phone-input {
                  display: flex;
                  align-items: center;
                  gap: 0;
                }
                .phone-input .PhoneInputCountry {
                  background: rgba(255,255,255,0.95);
                  backdrop-filter: blur(4px);
                  border: 2px solid rgba(52,211,153,0.5);
                  border-right: none;
                  border-radius: 12px 0 0 12px;
                  padding: 10px 8px 10px 14px;
                  margin: 0;
                  transition: all 0.3s;
                  cursor: pointer;
                }
                .phone-input .PhoneInputCountry:hover {
                  background: rgba(255,255,255,1);
                }
                .phone-input .PhoneInputCountrySelect {
                  cursor: pointer;
                }
                .phone-input .PhoneInputCountryIcon {
                  box-shadow: none;
                }
                .phone-input .PhoneInputCountryIcon--border {
                  box-shadow: none;
                }
                .phone-input .PhoneInputInput {
                  width: 100%;
                  padding: 12px 16px;
                  background: rgba(255,255,255,0.95);
                  backdrop-filter: blur(4px);
                  border: 2px solid rgba(52,211,153,0.5);
                  border-left: none;
                  border-radius: 0 12px 12px 0;
                  font-size: 16px;
                  color: #064e3b;
                  outline: none;
                  transition: all 0.3s;
                }
                .phone-input .PhoneInputInput:focus {
                  border-color: #f59e0b;
                  box-shadow: 0 0 0 2px rgba(245,158,11,0.2);
                }
                .phone-input:focus-within .PhoneInputCountry {
                  border-color: #f59e0b;
                }
                .phone-input-error .PhoneInputInput,
                .phone-input-error .PhoneInputCountry {
                  border-color: #f87171 !important;
                }
                .phone-input-error .PhoneInputCountry {
                  border-right: none !important;
                }
                .phone-input-error .PhoneInputInput:focus {
                  border-color: #ef4444 !important;
                  box-shadow: 0 0 0 2px rgba(239,68,68,0.2) !important;
                }
                .phone-input-error:focus-within .PhoneInputCountry {
                  border-color: #ef4444 !important;
                  border-right: none !important;
                }
              `}</style>
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
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-emerald-900 placeholder-gray-400 ${touched.name && errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-emerald-300/50 focus:border-amber-400 focus:ring-amber-400/20"}`}
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
              {touched.name && errors.name && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.name}
                </p>
              )}
              {/* Decorative corners */}
              <div
                className={`absolute top-1 left-1 w-2 h-2 border-t border-l rounded-tl pointer-events-none ${touched.name && errors.name ? "border-red-400/60" : "border-emerald-300/30"}`}
              ></div>
              <div
                className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r rounded-br pointer-events-none ${touched.name && errors.name ? "border-red-400/60" : "border-emerald-300/30"}`}
              ></div>
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              ঠিকানা *
            </label>
            <div className="relative">
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-white/95 backdrop-blur-sm border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-emerald-900 placeholder-gray-400 ${touched.address && errors.address ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-emerald-300/50 focus:border-amber-400 focus:ring-amber-400/20"}`}
                placeholder="আপনার ঠিকানা লিখুন"
              />
              {touched.address && errors.address && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.address}
                </p>
              )}
              {/* Decorative corners */}
              <div
                className={`absolute top-1 left-1 w-2 h-2 border-t border-l rounded-tl pointer-events-none ${touched.address && errors.address ? "border-red-400/60" : "border-emerald-300/30"}`}
              ></div>
              <div
                className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r rounded-br pointer-events-none ${touched.address && errors.address ? "border-red-400/60" : "border-emerald-300/30"}`}
              ></div>
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              ফোন নম্বর *
            </label>
            <div className="relative">
              <PhoneInput
                international
                defaultCountry="BD"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                className={`phone-input ${touched.phone && errors.phone ? "phone-input-error" : ""}`}
                placeholder="আপনার ফোন নম্বর লিখুন"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-amber-400"></span>
              বার্তা
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
            disabled={!formIsValid}
            className={`group/btn relative w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden ${formIsValid ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/50" : "bg-gray-400 text-gray-200 cursor-not-allowed shadow"}
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
        {/* Error Message */}
        {errorMsg && (
          <div className="relative mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg overflow-hidden">
            {/* Background pattern (similar to success, but with a different color/pattern if desired) */}
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="error-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M20 0 L40 20 L20 40 L0 20 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#error-pattern)" />
              </svg>
            </div>
            <p className="relative z-10">{errorMsg}</p>
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

