import React from "react";
import { Facebook, MapPin } from "lucide-react";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";

import useSocialMediaLinkStore from "../../store/SocialMediaLinkStore.js";

const SocialMediaLink = () => {
  const { socialMediaLinks } = useSocialMediaLinkStore();

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(location)}`;

  const socialLinks = [
    {
      icon: Facebook,
      href: socialMediaLinks?.facebook,
      label: "Facebook",
    },

    {
      icon: FaWhatsapp,
      href: `https://wa.me/${socialMediaLinks?.facebook}`,
      label: "WhatsApp",
    },
    {
      icon: FaYoutube,
      href: socialMediaLinks?.facebook,
      label: "YouTube",
    },
    {
      icon: MapPin,
      href: socialMediaLinks?.facebook,
      label: "Location",
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        return (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent bg-secondary/40 p-2 rounded-md transition-all duration-300 transform hover:scale-110 hover:text-accent/90"
            aria-label={social.label}
          >
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLink;
