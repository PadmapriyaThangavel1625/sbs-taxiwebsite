
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text)] mb-5">
        Get in Touch
      </h2>

      <div className="space-y-3">
        {/* Call Us */}
        <div
          className="
            bg-white
            border border-[var(--border)]
            p-4
            rounded-xl
            shadow-sm
            flex items-start gap-3.5
          "
        >
          <div
            className="
              p-3
              bg-[var(--primary-light)]
              text-[var(--primary)]
              rounded-full
              shrink-0
            "
          >
            <Phone className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-[var(--text-light)] font-medium">
              Call Us
            </p>

            <p className="text-sm font-bold text-[var(--text)] mt-0.5">
              81440 65688
            </p>

            <p className="text-xs text-[var(--text-light)] mt-0.5">
              24/7 Available
            </p>
          </div>
        </div>

        {/* Email */}
        <div
          className="
            bg-white
            border border-[var(--border)]
            p-4
            rounded-xl
            shadow-sm
            flex items-start gap-3.5
          "
        >
          <div
            className="
              p-3
              bg-[var(--primary-light)]
              text-[var(--primary)]
              rounded-full
              shrink-0
            "
          >
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-[var(--text-light)] font-medium">
              Email Us
            </p>

            <p className="text-sm font-bold text-[var(--primary)] mt-0.5">
              support@sbstaxi.com
            </p>

            <p className="text-xs text-[var(--text-light)] mt-0.5">
              We reply within minutes
            </p>
          </div>
        </div>

        {/* WhatsApp */}
        <div
          className="
            bg-white
            border border-[var(--border)]
            p-4
            rounded-xl
            shadow-sm
            flex items-start gap-3.5
          "
        >
          <div
            className="
              p-3
              bg-[var(--primary-light)]
              text-[var(--primary)]
              rounded-full
              shrink-0
            "
          >
            <MessageCircle className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-[var(--text-light)] font-medium">
              WhatsApp
            </p>

            <p className="text-sm font-bold text-[var(--text)] mt-0.5">
              81440 65688
            </p>

            <p className="text-xs text-[var(--text-light)] mt-0.5">
              Chat with us on WhatsApp
            </p>
          </div>
        </div>

        {/* Visit Us */}
        <div
          className="
            bg-white
            border border-[var(--border)]
            p-4
            rounded-xl
            shadow-sm
            flex items-start gap-3.5
          "
        >
          <div
            className="
              p-3
              bg-[var(--primary-light)]
              text-[var(--primary)]
              rounded-full
              shrink-0
            "
          >
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs text-[var(--text-light)] font-medium">
              Visit Us
            </p>

            <p className="text-sm font-bold text-[var(--text)] mt-0.5 leading-snug">
              123, SBS Taxi Office, Anna Salai, Chennai, Tamil Nadu - 600002
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
