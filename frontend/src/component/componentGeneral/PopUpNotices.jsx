import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import ImageComponent from "./ImageComponent.jsx";

const PopUpNotices = ({
  image,
  active = true,
  storageKey = "popup_notice_shown",
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem(storageKey);
    if (!shown) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleClose = () => {
    sessionStorage.setItem(storageKey, "true");
    setVisible(false);
  };

  if (!visible || !image || !active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        className="relative max-w-lg w-full mx-4 rounded-lg overflow-hidden shadow-lg bg-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 hover:bg-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <ImageComponent
          imageName={image}
          altName={"Notice"}
          className={"w-full h-auto object-cover"}
          skeletonHeight={300}
        />
        <div className="p-4 text-center">
          <button
            onClick={() => {
              handleClose();
              navigate("/contact-us");
            }}
            className="primaryBgColor text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpNotices;
