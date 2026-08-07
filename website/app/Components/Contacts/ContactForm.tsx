// components/contact/ContactForm.tsx
"use client";

export default function ContactForm() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-blue-600 focus:bg-white">
            <option>Select a subject</option>
            <option>General Inquiry</option>
            <option>Booking Support</option>
            <option>Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Type your message here..."
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#003399] hover:bg-blue-900 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
}