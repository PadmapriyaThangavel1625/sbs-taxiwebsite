import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeroBannerProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

export default function HeroBanner({ title, breadcrumb }: HeroBannerProps) {
  return (
    <div className="bg-[#1A365D] text-white relative overflow-hidden py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h1>
          <div className="flex items-center space-x-2 text-sm text-slate-300 mt-2">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.href}>
                <Link href={item.href} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </Link>
                {index < breadcrumb.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Decorative Map/Car Illustration Area */}
        <div className="hidden md:flex items-center space-x-4 opacity-80">
          <div className="text-right">
            <span className="block text-xs text-amber-400 font-semibold tracking-wider">ON THE WAY</span>
            <span className="text-sm">Fast & Reliable</span>
          </div>
          <MapPin className="text-amber-400 w-8 h-8 animate-bounce" />
        </div>
      </div>
    </div>
  );
}