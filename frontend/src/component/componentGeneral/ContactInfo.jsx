import { Phone, Mail } from "lucide-react";
import GeneralInfoStore from "../../store/GeneralInfoStore.js";

export default function ContactInfo() {
  const { GeneralInfoList } = GeneralInfoStore();

  return (
    <div className="flex gap-6">
      {/* Phone */}
      <a
        href={`tel:${GeneralInfoList?.PhoneNumber[0]}`}
        className="group flex items-center gap-2 cursor-pointer"
      >
        <Phone
          className="text-secondary group-hover:text-accent transition-all duration-300 ease-in-out"
          size={26}
        />

        <span className="text-md font-semibold text-accent group-hover:text-secondary transition-all duration-300 ease-in-out">
          {GeneralInfoList?.PhoneNumber[0]}
        </span>
      </a>

      {/* Email */}
      <a
        href={`mailto:${GeneralInfoList?.CompanyEmail[0]}`}
        className="group flex items-center gap-2 cursor-pointer"
      >
        <Mail
          className="text-secondary group-hover:text-accent transition-all duration-300 ease-in-out"
          size={26}
        />

        <span className="text-md font-semibold text-accent group-hover:text-secondary transition-all duration-300 ease-in-out">
          {GeneralInfoList?.CompanyEmail[0]}
        </span>
      </a>
    </div>
  );
}
