// components/contact/ContactInfo.tsx
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Get in Touch</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-full shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Call Us</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">81440 65688</p>
            <p className="text-xs text-gray-500 mt-0.5">24/7 Available</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-full shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Email Us</p>
            <p className="text-sm font-bold text-blue-700 mt-0.5">support@sbstaxi.com</p>
            <p className="text-xs text-gray-500 mt-0.5">We reply within minutes</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-full shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">81440 65688</p>
            <p className="text-xs text-gray-500 mt-0.5">Chat with us on WhatsApp</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-full shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Visit Us</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5 leading-snug">
              123, SBS Taxi Office, Anna Salai, Chennai, Tamil Nadu - 600002
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}