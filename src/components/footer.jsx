import React from "react";
import whatsappImg from "../assets/whatsapp.png";
import instaImg from "../assets/insta.png";

const Footer = () => {
  return (
    <div className="m-auto mt-20 px-8 py-3 w-full max-w-[600px] h-26 bg-slate-400 flex flex-col text-center text-slate-700">
      <div className="text-xs font-medium text-gray-50">@made by toiga_sait_shakirtu</div>
      <div className="flex flex-wrap justify-center items-center mt-2 gap-1">
        <a
          href="https://wa.me/+77718544450"
          target="_blank"
          without
          rel="noreferrer"
        >
          <img className="w-8 h-8" src={whatsappImg} alt="whatsappIcon" />
        </a>
        <a
          href="https://instagram.com/toiga_sait_shakirtu?igshid=MzNlNGNkZWQ4Mg=="
          target="_blank"
          without
          rel="noreferrer"
        >
          <img className="w-7 h-7" src={instaImg} alt="instaIcon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;