import OffersHero from '@/app/Components/Offers/OffersHero';
import ExclusiveOffers from '@/app/Components/Offers/ExclusiveOffers';
import AppDownload from '@/app/Components/Offers/AppDownload';
import FeaturesBar from '@/app/Components/Offers/FeaturesBar';
import BottomCTA from '@/app/Components/Offers/BottomCTA';
import { User, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#333] font-['Poppins',sans-serif]">
     
      {/* Page Content */}
      <OffersHero />
      <ExclusiveOffers />
      <AppDownload />
      <FeaturesBar />
      <BottomCTA />
    </div>
  );
}