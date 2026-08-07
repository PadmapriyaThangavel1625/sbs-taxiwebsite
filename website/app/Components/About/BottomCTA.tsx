import { Headphones, PhoneCall, MessageCircle } from "lucide-react";

export default function BottomCTA() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-blue-950 text-white rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center shadow-xl">
        {/* Item 1 */}
        <div className="flex items-center space-x-4 border-b lg:border-b-0 lg:border-r border-blue-900 pb-6 lg:pb-0 lg:pr-6">
          <div className="w-12 h-12 rounded-full bg-blue-900/80 flex items-center justify-center text-blue-300 shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-base">Have Questions?</h4>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5">We're here to help you 24/7</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center space-x-4 border-b lg:border-b-0 lg:border-r border-blue-900 pb-6 lg:pb-0 lg:pr-6">
          <div className="w-12 h-12 rounded-full bg-blue-900/80 flex items-center justify-center text-blue-300 shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <a href="tel:8144065688" className="font-bold text-white text-lg hover:underline">
              81440 65688
            </a>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Call Us Now</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-900/80 flex items-center justify-center text-emerald-400 shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-base">Chat on WhatsApp</h4>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Quick support</p>
          </div>
        </div>
      </div>
    </div>
  );
}