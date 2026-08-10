
import { Headphones, Phone } from "lucide-react";

export default function HelpBanner() {
  return (
    <div className="mt-5 rounded-xl bg-primary p-5 text-white flex flex-col md:flex-row justify-between items-center gap-5">
      
      {/* Left Content */}
      <div className="flex gap-4 items-center">
        <Headphones size={45} />

        <div>
          <h3 className="text-xl font-bold">
            Need Help Choosing the Right Service?
          </h3>

          <p className="mt-1">
            Our team is available 24/7 to assist you.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
        
        <a
          href="tel:9843544844"
          className="bg-white text-primary px-8 py-3 rounded-lg font-bold flex gap-2 items-center justify-center hover:bg-primary-light transition"
        >
          <Phone size={20} />
          9843544844
        </a>

        <a
          href="https://wa.me/9843544844"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-green-50 transition"
        >
          Chat on WhatsApp
        </a>

      </div>
    </div>
  );
}
