import { ArrowRight } from 'lucide-react';

interface OfferCardProps {
  tag: string;
  title: string;
  description: string;
  code?: string;
  customBody?: string;
  headerBg?: string;      // Made optional
  bgGradient?: string;    // Added to support the new property
  textColor: string;
  tagBg: string;
  actionText: string;
  isEnquire?: boolean;
  illustrationType: string;
}

export default function OfferCard({
  tag,
  title,
  description,
  code,
  customBody,
  headerBg,
  bgGradient,
  textColor,
  tagBg,
  actionText,
  isEnquire,
  illustrationType
}: OfferCardProps) {
  // Fallback to headerBg if bgGradient isn't passed
  const backgroundStyle = bgGradient || headerBg || '';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col justify-between border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
      
      {/* Top Banner Content */}
      <div className={`${backgroundStyle} ${textColor} p-5 relative overflow-hidden min-h-[175px] flex flex-col justify-between`}>
        <div>
          <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md ${tagBg} inline-block mb-3 tracking-wider shadow-sm`}>
            {tag}
          </span>
          <h3 className="text-3xl font-extrabold tracking-tight mb-1">{title}</h3>
          <p className="text-xs opacity-90 whitespace-pre-line font-medium leading-relaxed">{description}</p>
        </div>

        {/* Floating Icons / Visual Elements matching design */}
        <div className="absolute right-3 bottom-3 opacity-90 pointer-events-none">
          {illustrationType === 'gift' && (
            <div className="bg-blue-600 w-16 h-20 rounded-lg shadow-xl relative flex items-center justify-center border border-blue-400 rotate-3">
              <div className="absolute top-0 w-4 h-full bg-yellow-400"></div>
              <div className="absolute h-4 w-full bg-yellow-400"></div>
              <div className="absolute -top-3 w-6 h-4 border-2 border-yellow-400 rounded-full"></div>
            </div>
          )}
          {illustrationType === 'coupon' && (
            <div className="bg-blue-600 text-white w-16 h-16 rounded-xl shadow-lg flex items-center justify-center font-bold text-xl rotate-12 border-2 border-white">
              %
            </div>
          )}
          {illustrationType === 'luggage' && (
            <div className="flex items-end gap-1">
              <div className="w-5 h-4 bg-yellow-400 rounded-t-full"></div>
              <div className="w-10 h-12 bg-blue-600 rounded-lg shadow-md border border-blue-400 relative">
                <div className="absolute top-2 w-full h-1 bg-blue-800"></div>
              </div>
            </div>
          )}
          {illustrationType === 'briefcase' && (
            <div className="flex items-end gap-1">
              <div className="w-10 h-8 bg-blue-900 rounded-md shadow-md relative flex flex-col items-center justify-center">
                <div className="absolute -top-2 w-4 h-2 border-2 border-blue-900 rounded-t-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full text-[8px] text-center font-bold text-black flex items-center justify-center">🆔</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle Body (Promo Code / Custom Text) */}
      <div className="p-4 bg-white flex items-center justify-between text-xs">
        {isEnquire ? (
          <p className="text-gray-700 font-medium whitespace-pre-line py-1 text-[11px] leading-snug">
            {customBody}
          </p>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <span className="text-gray-500 font-medium text-[11px]">Use Code</span>
            <span className="border border-dashed border-blue-500 px-3 py-1 rounded-md font-bold text-blue-700 bg-blue-50/50 tracking-wider text-xs">
              {code}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer Button */}
      <div className="border-t border-gray-100 p-3 text-center bg-white">
        <a href="#" className="text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:gap-2.5 transition-all">
          {actionText} <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
}