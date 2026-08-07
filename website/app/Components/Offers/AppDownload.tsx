import { FaGooglePlay, FaApple } from 'react-icons/fa';

export default function AppDownload() {
  return (
    <div className="bg-white mx-[5%] my-10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0d1b2a] mb-2">More Offers in Our App!</h3>
        <p className="text-xs md:text-sm text-gray-600">Download the SBS Taxi app and unlock app-exclusive deals and a seamless booking experience.</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
          <FaGooglePlay size={24} />
          <div className="text-[10px] leading-tight">GET IT ON<br /><span className="text-sm font-bold">Google Play</span></div>
        </div>
        <div className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-90 transition">
          <FaApple size={24} />
          <div className="text-[10px] leading-tight">Download on the<br /><span className="text-sm font-bold">App Store</span></div>
        </div>
      </div>
    </div>
  );
}