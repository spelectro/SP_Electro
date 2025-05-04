import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppMessage = () => {
  const [showText, setShowText] = useState(true);

  const handleRedirect = () => {
    window.open("https://wa.me/+919404702745?", "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-5 z-50 right-5 p-2 bg-[#25D366] text-white rounded-lg shadow-lg flex items-center cursor-pointer transition-all duration-500 ease-in-out ${
        showText ? "w-auto" : "w-16"
      }`}
      onClick={handleRedirect}
    >
      <div className="flex items-center justify-center w-12 h-10">
        <FaWhatsapp className="text-2xl" />
      </div>
      {showText && (
        <span className="whitespace-nowrap animate-slideText mx-2 ">
          Chat with us on WhatsApp!
        </span>
      )}
    </div>
  );
};

export default WhatsAppMessage;
