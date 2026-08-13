"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/Components/Logo";
import { useState, useRef, useEffect } from "react";

import {
  Bot,
  X,
  Send,
  MessageCircle,
  Phone,
  MapPin,
  Car,
  IndianRupee,
  Plane,
  Building2,
  HelpCircle,
  AlertCircle,
  Star,
  FileText,
  Package,
  UserRound,
  ChevronRight,
  Minimize2,
} from "lucide-react";

/* =========================================================
   MESSAGE TYPE
========================================================= */

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

/* =========================================================
   MENU ITEMS
========================================================= */

const menuItems = [
  {
    label: "🚖 Book a Taxi",
    key: "book",
    icon: Car,
  },
  {
    label: "💰 Fare Estimate",
    key: "fare",
    icon: IndianRupee,
  },
  {
    label: "📍 Track My Ride",
    key: "track",
    icon: MapPin,
  },
  {
    label: "🚗 Our Fleet",
    key: "fleet",
    icon: Car,
  },
  {
    label: "🎁 Offers & Discounts",
    key: "offers",
    icon: Star,
  },
  {
    label: "🛫 Airport Transfer",
    key: "airport",
    icon: Plane,
  },
  {
    label: "🏢 Corporate Booking",
    key: "corporate",
    icon: Building2,
  },
  {
    label: "📦 Parcel Delivery",
    key: "parcel",
    icon: Package,
  },
  {
    label: "❓ FAQs",
    key: "faq",
    icon: HelpCircle,
  },
  {
    label: "🆘 Emergency Support",
    key: "emergency",
    icon: AlertCircle,
  },
  {
    label: "📞 Call Customer Care",
    key: "contact",
    icon: Phone,
  },
  {
    label: "💬 Chat with Executive",
    key: "executive",
    icon: UserRound,
  },
  {
    label: "⭐ Rate Your Ride",
    key: "rate",
    icon: Star,
  },
  {
    label: "📝 Feedback & Complaints",
    key: "feedback",
    icon: FileText,
  },
];

/* =========================================================
   QUICK REPLIES
========================================================= */

const quickReplies = [
  {
    label: "🚖 Book Now",
    key: "book",
  },
  {
    label: "📍 Track Ride",
    key: "track",
  },
  {
    label: "💵 Check Fare",
    key: "fare",
  },
  {
    label: "📞 Call Us",
    key: "contact",
  },
  {
    label: "💬 Live Chat",
    key: "executive",
  },
];

/* =========================================================
   BOT ANSWERS
========================================================= */

const answers: Record<string, string> = {
  welcome: `Welcome to SBS Taxi! 🚖

One Brand. One Fare. One Trusted Service.

How can we help you today?`,

  book: `Booking a taxi is simple! 🚖

Please share:

1. 📍 Pickup Location
2. 📍 Drop Location
3. 📅 Travel Date
4. 🕒 Pickup Time
5. 👥 Number of Passengers

We'll confirm your booking within minutes.

You can also book through our website or mobile app.`,

  fare: `Our starting fares:

🚗 SBS Mini – From ₹12/km
🚙 SBS Sedan – From ₹12.50/km
🚘 SBS SUV – From ₹17/km
🚖 SBS MUV – From ₹18/km
👑 SBS MUV+ – From ₹19/km

The final fare depends on distance, trip type, tolls, parking and travel duration, where applicable.`,

  track: `📍 Track My Ride

Please enter your Booking ID or Registered Mobile Number to track your taxi in real time.

If you need assistance, our support team is available 24×7.`,

  fleet: `🚗 Our Fleet

Choose the vehicle that best suits your trip:

🚗 SBS Mini
🚙 SBS Sedan
🚐 SBS Van
🚘 SBS SUV
🚖 SBS MUV
🌿 SBS EV
💼 SBS Corporate
⭐ SBS Premium
👑 SBS Luxury
🚌 SBS Traveller

You can select your preferred vehicle during booking, subject to availability.`,

  offers: `🎁 Current Customer Benefits

🎉 ₹50 OFF on your first 3 rides
💸 ₹20 OFF on every ride after that
✅ No hidden charges
✅ No driver bata charges
✅ No waiting charges
✅ No extra fee for online payments

Offers may be subject to applicable terms and conditions.`,

  airport: `🛫 Airport Transfer

Book reliable airport pickup and drop services with SBS Taxi.

Available 24×7 for:

✈️ Domestic Airports
✈️ International Airports
📍 Flight tracking
⏰ On-time pickup
👨‍✈️ Professional drivers

Please share your flight number and pickup details when booking.`,

  corporate: `🏢 Corporate Booking

We provide business travel solutions including:

• Employee transportation
• Airport transfers
• Client pickup
• Monthly billing
• GST invoices
• Dedicated account manager

Please share your company name and travel requirements with our team.`,

  parcel: `📦 Parcel Delivery

Need to send a parcel?

We provide same-day local parcel delivery for:

📄 Documents
📦 Small packages
🎁 Gifts
🏢 Business deliveries

Please provide the pickup and delivery addresses.`,

  faq: `❓ Frequently Asked Questions

Q: Can I cancel my ride?
A: Yes. Cancellations are allowed according to our cancellation policy.

Q: Can I book a taxi in advance?
A: Yes. You can schedule a ride for a future date and time.

Q: Do you provide airport pickup?
A: Yes. Airport pickup and drop services are available 24×7.

Q: Do you provide GST invoices?
A: Yes, GST invoices are available for eligible bookings.

Q: Can I pay online?
A: Yes. UPI, debit/credit cards, net banking and cash are accepted.

Q: Is SBS Taxi available 24×7?
A: Yes. SBS Taxi operates 24 hours a day, 7 days a week.

Q: Are your drivers verified?
A: Yes. Our drivers are background-verified and professionally trained.

Q: Are there hidden charges?
A: No. SBS Taxi follows transparent pricing.`,

  emergency: `🆘 Emergency Support

Your safety is our priority.

If you need urgent assistance:

1. Contact our support team immediately.
2. Share your Booking ID.
3. Share your current location.
4. Explain the issue clearly.

Our team will assist you as quickly as possible.

📞 Customer Care: 98435 44844`,

  contact: `📞 Contact Customer Care

Need help?

📱 Mobile: 98435 44844
📧 Email: hr@sbstechnologies.in

Our support team can assist with:

• Bookings
• Cancellations
• Payments
• Ride issues
• Corporate bookings
• General enquiries

⏰ Support is available 24×7.`,

  executive: `💬 Chat with Executive

A customer support executive will join the chat shortly.

Please tell us how we can help:

• Booking assistance
• Fare enquiry
• Ride issues
• Payment support
• Corporate bookings

Our support team is available 24×7.`,

  rate: `⭐ Rate Your Ride

Thank you for choosing SBS Taxi!

Please rate your experience:

⭐⭐⭐⭐⭐ Excellent
⭐⭐⭐⭐ Good
⭐⭐⭐ Average
⭐⭐ Fair
⭐ Poor

We also welcome your comments and suggestions.`,

  feedback: `📝 Feedback & Complaints

We value your feedback.

Please provide:

• Booking ID, if available
• Your feedback or complaint
• Photos or screenshots, if applicable

Our support team will review your request and respond as soon as possible.`,

  general: `I'm here to help with SBS Taxi! 🚖

You can ask me about:

🚖 Booking
💰 Fare
📍 Ride Tracking
🚗 Fleet
🎁 Offers
🛫 Airport Transfer
🏢 Corporate Booking
📦 Parcel Delivery
❓ FAQs
📞 Customer Support

Please choose an option below or type your question.`,
};

/* =========================================================
   FAQ DATA
========================================================= */

const faqQuestions = [
  {
    question: "How do I book an SBS Taxi?",
    answer:
      "You can book through our website, mobile app, or by calling our customer support.",
  },
  {
    question: "Can I book a taxi in advance?",
    answer:
      "Yes. You can schedule your ride for any future date and time.",
  },
  {
    question: "Do you provide instant bookings?",
    answer: "Yes, subject to vehicle availability.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes. Cancellation policies may apply depending on the booking type.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide Local City Rides, Airport Pickup & Drop, Outstation Trips, One-Way Trips, Round Trips, Corporate Travel and Hourly Rental Packages.",
  },
  {
    question: "Do you provide airport pickup?",
    answer:
      "Yes. We provide 24/7 airport pickup and drop services.",
  },
  {
    question: "Do you offer corporate accounts?",
    answer:
      "Yes. We offer customized corporate travel solutions for businesses.",
  },
  {
    question: "What vehicle types are available?",
    answer:
      "We offer SBS Mini, SBS Sedan, SBS Van, SBS SUV, SBS MUV, SBS EV, SBS Premium, SBS Luxury and SBS Traveller.",
  },
  {
    question: "Can I choose my preferred vehicle?",
    answer:
      "Yes. You can select your preferred vehicle during booking, subject to availability.",
  },
  {
    question: "How is the fare calculated?",
    answer:
      "The fare depends on the trip distance, vehicle type and travel duration.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No. SBS Taxi follows transparent pricing with no hidden charges.",
  },
  {
    question: "Is online payment available?",
    answer:
      "Yes. We accept UPI, credit/debit cards, net banking and cash.",
  },
  {
    question: "Are your drivers verified?",
    answer:
      "Yes. All SBS Taxi drivers are background-verified and professionally trained.",
  },
  {
    question: "Can I contact my driver before pickup?",
    answer:
      "Yes. Driver contact details are shared before your trip.",
  },
  {
    question: "Is SBS Taxi safe for women and families?",
    answer:
      "Yes. Passenger safety is our top priority with verified drivers and trip tracking.",
  },
  {
    question: "Can I share my trip with family?",
    answer:
      "Yes. You can share your live trip details with your family or friends.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "Cash, UPI, debit cards, credit cards and online payments are accepted.",
  },
  {
    question: "Will I receive an invoice?",
    answer:
      "Yes. A digital invoice is sent after every completed trip.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us by phone, email or through the support section.",
  },
  {
    question: "What are your customer support hours?",
    answer: "Our customer support is available 24×7.",
  },
  {
    question: "Do you operate 24×7?",
    answer:
      "Yes. SBS Taxi is available 24 hours a day, 7 days a week.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We primarily serve Erode and nearby locations, with outstation services across Tamil Nadu and neighboring states.",
  },
  {
    question: "Can I book a taxi for an entire day?",
    answer:
      "Yes. We offer flexible hourly and full-day rental packages.",
  },
  {
    question: "Do you provide GST invoices for business travel?",
    answer:
      "Yes. GST invoices are available for eligible bookings.",
  },
  {
    question: "Why should I choose SBS Taxi?",
    answer:
      "We offer transparent pricing, verified drivers, clean and comfortable vehicles, 24/7 availability, multiple vehicle options, secure online payments and reliable customer support.",
  },
];

/* =========================================================
   CHATBOT
========================================================= */

export default function ChatbotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: answers.welcome,
    },
  ]);

  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =======================================================
     ADD MESSAGE
  ======================================================= */

  const addMessage = (
    userText: string,
    botText: string
  ) => {
    const messageId = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "user",
        text: userText,
      },
      {
        id: messageId + 1,
        sender: "bot",
        text: botText,
      },
    ]);
  };

  /* =======================================================
     MENU CLICK
  ======================================================= */

  const handleMenuClick = (
    key: string,
    label: string
  ) => {
    if (key === "faq") {
      setShowFaq(true);
      setShowMenu(false);

      addMessage(label, answers.faq);
      return;
    }

    const response =
      answers[key] || answers.general;

    setShowMenu(false);
    setShowFaq(false);

    addMessage(label, response);
  };

  /* =======================================================
     FIND ANSWER
  ======================================================= */

  const findAnswer = (question: string) => {
    const text = question.toLowerCase().trim();

    const match = faqQuestions.find((faq) => {
      const words = faq.question
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3);

      const matchedWords = words.filter((word) =>
        text.includes(word)
      );

      return matchedWords.length >= 2;
    });

    if (match) {
      return match.answer;
    }

    if (
      text.includes("book") ||
      text.includes("booking") ||
      text.includes("taxi")
    ) {
      return answers.book;
    }

    if (
      text.includes("fare") ||
      text.includes("price") ||
      text.includes("cost") ||
      text.includes("rate")
    ) {
      return answers.fare;
    }

    if (
      text.includes("track") ||
      text.includes("location") ||
      text.includes("where is my")
    ) {
      return answers.track;
    }

    if (
      text.includes("airport") ||
      text.includes("flight")
    ) {
      return answers.airport;
    }

    if (
      text.includes("corporate") ||
      text.includes("company") ||
      text.includes("business")
    ) {
      return answers.corporate;
    }

    if (
      text.includes("parcel") ||
      text.includes("delivery")
    ) {
      return answers.parcel;
    }

    if (
      text.includes("driver") ||
      text.includes("vehicle") ||
      text.includes("car") ||
      text.includes("fleet")
    ) {
      return answers.fleet;
    }

    if (
      text.includes("offer") ||
      text.includes("discount") ||
      text.includes("coupon")
    ) {
      return answers.offers;
    }

    if (
      text.includes("support") ||
      text.includes("contact") ||
      text.includes("phone") ||
      text.includes("email")
    ) {
      return answers.contact;
    }

    if (
      text.includes("cancel") ||
      text.includes("cancellation")
    ) {
      return "Yes. You can cancel your booking according to the applicable cancellation policy.";
    }

    if (
      text.includes("payment") ||
      text.includes("pay") ||
      text.includes("upi") ||
      text.includes("cash")
    ) {
      return "Yes. SBS Taxi accepts cash, UPI, debit cards, credit cards, net banking and online payments.";
    }

    if (
      text.includes("gst") ||
      text.includes("invoice")
    ) {
      return "Yes. GST invoices are available for eligible business bookings.";
    }

    if (
      text.includes("safe") ||
      text.includes("safety") ||
      text.includes("women") ||
      text.includes("family")
    ) {
      return "Yes. Passenger safety is our top priority. SBS Taxi focuses on verified drivers, trip tracking and a safe, comfortable travel experience.";
    }

    if (
      text.includes("24") ||
      text.includes("hours") ||
      text.includes("available")
    ) {
      return "Yes. SBS Taxi customer support and services are available 24×7.";
    }

    return answers.general;
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSend = () => {
    if (!input.trim()) return;

    const userQuestion = input.trim();
    const response = findAnswer(userQuestion);

    const messageId = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "user",
        text: userQuestion,
      },
      {
        id: messageId + 1,
        sender: "bot",
        text: response,
      },
    ]);

    setInput("");
  };

  /* =======================================================
     ENTER KEY
  ======================================================= */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  /* =======================================================
     CUSTOMER CARE
  ======================================================= */

  const callCustomerCare = () => {
    window.location.href = "tel:9843544844";
  };

  /* =========================================================
     FLOATING CHAT BUTTON
     
     MOBILE:
     bottom-[72px] keeps chatbot ABOVE the bottom navbar.
     
     DESKTOP:
     sm:bottom-6 restores normal bottom position.
  ========================================================= */

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open SBS Taxi Chatbot"
        className="
          fixed
          !bottom-[72px]
          right-4
          z-[9999]
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[var(--secondary)]
          text-[var(--primary)]
          shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          transition
          duration-300
          hover:scale-110
          sm:bottom-6
          sm:right-6
        "
      >
        <MessageCircle
          size={30}
          strokeWidth={2.5}
        />

        {/* ONLINE INDICATOR */}

        <span
          className="
            absolute
            right-0
            top-0
            h-4
            w-4
            rounded-full
            border-2
            border-white
            bg-green-500
          "
        />
      </button>
    );
  }

  /* =========================================================
     CHAT WINDOW
     
     MOBILE:
     bottom-[72px] keeps full chatbot above bottom navbar.
     
     DESKTOP:
     sm:bottom-6 restores normal desktop position.
  ========================================================= */

  return (
    <div
      className="
        fixed
        bottom-[72px]
        right-4
        z-[9999]
        w-[calc(100vw-32px)]
        max-w-[390px]
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        sm:bottom-6
        sm:right-6
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          min-h-[64px]
          items-center
          justify-between
          gap-3
          bg-[var(--primary)]
          px-4
          py-2.5
          text-white
        "
      >
        {/* LOGO */}

        <div className="flex min-w-0 flex-1 items-center">
          <Logo variant="footer" />
        </div>

        {/* HEADER BUTTONS */}

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => {
              setIsMinimized((prev) => !prev);
              setShowMenu(false);
              setShowFaq(false);
            }}
            className="
              rounded-lg
              p-2
              text-white
              transition
              hover:bg-white/10
            "
            aria-label={
              isMinimized
                ? "Expand chatbot"
                : "Minimize chatbot"
            }
          >
            <Minimize2 size={17} />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="
              rounded-lg
              p-2
              text-white
              transition
              hover:bg-white/10
            "
            aria-label="Close chatbot"
          >
            <X size={19} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* =================================================
              MESSAGES
          ================================================= */}

          <div
            className="
              h-[390px]
              overflow-y-auto
              bg-slate-50
              px-3
              py-4
              sm:h-[430px]
            "
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* BOT ICON */}

                {message.sender === "bot" && (
                  <div
                    className="
                      mr-2
                      mt-1
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--primary)]
                      text-white
                    "
                  >
                    <Bot size={15} />
                  </div>
                )}

                {/* MESSAGE */}

                <div
                  className={`
                    max-w-[82%]
                    whitespace-pre-line
                    rounded-2xl
                    px-3.5
                    py-2.5
                    text-[13px]
                    leading-5
                    ${
                      message.sender === "user"
                        ? "rounded-br-md bg-[var(--primary)] text-white"
                        : "rounded-bl-md bg-white text-slate-700 shadow-sm"
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* =================================================
              FAQ PANEL
          ================================================= */}

          {showFaq && (
            <div
              className="
                absolute
                bottom-[112px]
                left-2
                right-2
                max-h-[300px]
                overflow-y-auto
                rounded-xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-xl
              "
            >
              <div className="mb-2 px-2 py-1">
                <p className="text-xs font-bold text-[var(--primary)]">
                  Frequently Asked Questions
                </p>
              </div>

              {faqQuestions.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => {
                    addMessage(
                      faq.question,
                      faq.answer
                    );

                    setShowFaq(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-2
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-xs
                    text-slate-700
                    transition
                    hover:bg-blue-50
                  "
                >
                  <span>{faq.question}</span>

                  <ChevronRight
                    size={14}
                    className="shrink-0 text-slate-400"
                  />
                </button>
              ))}
            </div>
          )}

          {/* =================================================
              MENU PANEL
          ================================================= */}

          {showMenu && (
            <div
              className="
                absolute
                bottom-[112px]
                left-2
                right-2
                max-h-[330px]
                overflow-y-auto
                rounded-xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-xl
              "
            >
              <div className="mb-2 px-2 py-1">
                <p className="text-xs font-bold text-[var(--primary)]">
                  How can we help?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.key}
                      onClick={() =>
                        handleMenuClick(
                          item.key,
                          item.label
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        px-2.5
                        py-2.5
                        text-left
                        text-[11px]
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-blue-50
                        hover:text-[var(--primary)]
                      "
                    >
                      <Icon
                        size={15}
                        className="shrink-0"
                      />

                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================
              QUICK REPLIES
          ================================================= */}

          <div
            className="
              flex
              gap-1.5
              overflow-x-auto
              border-t
              border-slate-100
              bg-white
              px-3
              py-2
              scrollbar-none
            "
          >
            {quickReplies.map((item) => (
              <button
                key={item.key}
                onClick={() =>
                  handleMenuClick(
                    item.key,
                    item.label
                  )
                }
                className="
                  shrink-0
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-[var(--primary)]
                  transition
                  hover:bg-[var(--primary)]
                  hover:text-white
                "
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <div
            className="
              border-t
              border-slate-100
              bg-white
              p-3
            "
          >
            <div className="flex items-center gap-2">
              {/* MENU */}

              <button
                onClick={() => {
                  setShowMenu((prev) => !prev);
                  setShowFaq(false);
                }}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[var(--primary)]
                  transition
                  hover:bg-blue-100
                "
                aria-label="Open chatbot menu"
              >
                <MessageCircle size={18} />
              </button>

              {/* INPUT */}

              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask SBS Taxi..."
                className="
                  h-10
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  text-xs
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                  focus:border-blue-300
                  focus:bg-white
                "
              />

              {/* SEND */}

              <button
                onClick={handleSend}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--secondary)]
                  text-[var(--primary)]
                  transition
                  hover:scale-105
                "
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            {/* =================================================
                MADE IN INDIA + POWERED BY
            ================================================= */}

            <div className="mt-2">
              {/* MADE IN INDIA */}

              <div
                className="
                  mt-1
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-[10px]
                  text-slate-400
                "
              >
                <Image
                  src="/flag.jpg"
                  alt="Made in India"
                  width={22}
                  height={15}
                  className="
                    h-[15px]
                    w-[22px]
                    object-contain
                  "
                />

                <span>Made in India</span>
              </div>

              {/* POWERED BY */}

              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                "
              >
                <span
                  className="
                    text-[10px]
                    font-light
                    text-[var(--primary)]
                    sm:text-xs
                  "
                >
                  Powered by
                </span>

                <Link
                  href="https://sbstechnologies.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-xs
                    font-semibold
                    text-blue-100/70
                    transition-colors
                    duration-200
                    hover:text-[var(--secondary)]
                    sm:text-sm
                  "
                >
                  SBS Technologies
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}