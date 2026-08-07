import { ShieldCheck, Headset, MapPin, Wallet } from 'lucide-react';

export default function FeaturesBar() {
  return (
    <div className="bg-white mx-[5%] mb-10 p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shadow-sm">
      <div className="flex gap-4 items-start">
        <ShieldCheck className="text-[#0056b3] bg-[#eef4f8] p-3 rounded-lg shrink-0" size={48} />
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-[#0d1b2a] mb-1">Safe & Secure Rides</h4>
          <p className="text-[11px] text-gray-600">Verified drivers & well maintained cars</p>
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <Headset className="text-[#0056b3] bg-[#eef4f8] p-3 rounded-lg shrink-0" size={48} />
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-[#0d1b2a] mb-1">24/7 Customer Support</h4>
          <p className="text-[11px] text-gray-600">We're always here to help you</p>
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <MapPin className="text-[#0056b3] bg-[#eef4f8] p-3 rounded-lg shrink-0" size={48} />
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-[#0d1b2a] mb-1">Live Tracking</h4>
          <p className="text-[11px] text-gray-600">Track your ride in real time</p>
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <Wallet className="text-[#0056b3] bg-[#eef4f8] p-3 rounded-lg shrink-0" size={48} />
        <div>
          <h4 className="text-xs md:text-sm font-semibold text-[#0d1b2a] mb-1">Multiple Payment Options</h4>
          <p className="text-[11px] text-gray-600">UPI, Cards, Net Banking & more</p>
        </div>
      </div>
    </div>
  );
}