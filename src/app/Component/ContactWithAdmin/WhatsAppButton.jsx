'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const phoneNumber = '8801316034237';
  const message = 'Hello! I would like to know more about CareHive services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Only show on /dashboard/user/goals route


  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 ease-out overflow-hidden"
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
        <MessageCircle className="w-4 md:w-6 h-4 md:h-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
      </div>
      
      {/* Text that expands on hover */}
      <div className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-out overflow-hidden whitespace-nowrap">
        <span className="pr-5 font-semibold text-sm">Chat on WhatsApp</span>
      </div>
      
      {/* Animated pulse ring */}
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
    </a>
  );
}