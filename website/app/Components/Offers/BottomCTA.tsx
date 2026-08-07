import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function BottomCTA() {
  return (
    <div className="bg-[#0d1b2a] text-white px-[5%] py-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-1">Ready to Save More?</h3>
        <p className="text-xs text-gray-400">Book your ride now and enjoy the best offers!</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <a href="tel:8144065688" className="bg-white text-[#0d1b2a] px-5 py-2.5 rounded-full flex items-center gap-2.5 font-semibold text-xs md:text-sm hover:bg-gray-100 transition">
          <Phone size={16} /> 81440 65688
        </a>
        <a href="https://wa.me/" className="bg-[#25d366] text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 font-semibold text-xs md:text-sm hover:bg-[#20ba5a] transition">
          <FaWhatsapp size={16} /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}