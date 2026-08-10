
"use client";

export default function ContactForm() {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text)] mb-5">
        Send Us a Message
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text)] mb-1">
            Your Name <span className="text-[var(--primary)]">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="
              w-full px-3.5 py-2.5
              bg-[var(--background)]
              border border-[var(--border)]
              rounded-lg
              text-sm text-[var(--text)]
              placeholder:text-[var(--text-light)]
              focus:outline-none
              focus:border-[var(--primary)]
              focus:bg-white
              transition-colors
            "
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text)] mb-1">
            Phone Number <span className="text-[var(--primary)]">*</span>
          </label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            className="
              w-full px-3.5 py-2.5
              bg-[var(--background)]
              border border-[var(--border)]
              rounded-lg
              text-sm text-[var(--text)]
              placeholder:text-[var(--text-light)]
              focus:outline-none
              focus:border-[var(--primary)]
              focus:bg-white
              transition-colors
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text)] mb-1">
            Email Address <span className="text-[var(--primary)]">*</span>
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            className="
              w-full px-3.5 py-2.5
              bg-[var(--background)]
              border border-[var(--border)]
              rounded-lg
              text-sm text-[var(--text)]
              placeholder:text-[var(--text-light)]
              focus:outline-none
              focus:border-[var(--primary)]
              focus:bg-white
              transition-colors
            "
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text)] mb-1">
            Subject <span className="text-[var(--primary)]">*</span>
          </label>

          <select
            className="
              w-full px-3.5 py-2.5
              bg-[var(--background)]
              border border-[var(--border)]
              rounded-lg
              text-sm text-[var(--text)]
              focus:outline-none
              focus:border-[var(--primary)]
              focus:bg-white
              transition-colors
            "
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="booking">Booking Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text)] mb-1">
            Message <span className="text-[var(--primary)]">*</span>
          </label>

          <textarea
            rows={4}
            placeholder="Type your message here..."
            className="
              w-full px-3.5 py-2.5
              bg-[var(--background)]
              border border-[var(--border)]
              rounded-lg
              text-sm text-[var(--text)]
              placeholder:text-[var(--text-light)]
              focus:outline-none
              focus:border-[var(--primary)]
              focus:bg-white
              resize-none
              transition-colors
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-3
            bg-[var(--primary)]
            hover:bg-[var(--primary-dark)]
            text-white
            font-medium
            rounded-lg
            text-sm
            transition-colors
            flex items-center justify-center gap-2
            shadow-md
            cursor-pointer
          "
        >
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
}
