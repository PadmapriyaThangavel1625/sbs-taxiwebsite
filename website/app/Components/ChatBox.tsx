"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  X,
  ChevronRight,
  Car,
  MapPin,
  Phone,
  ArrowLeft,
  Send,
} from "lucide-react";

type ChatScreen = "menu" | "chat";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

/* =====================================================
   SBS TAXI FAQ
   LOCAL ONLY - NO API
===================================================== */

const defaultQuestions = [
  {
    question: "🚕 How can I book a taxi?",
    answer:
      "You can book an SBS Taxi by entering your pickup and drop location, selecting a vehicle, and confirming your booking.",
  },
  {
    question: "💰 What is the taxi fare?",
    answer:
      "Taxi fare depends on the distance, vehicle type, and trip type. Enter your pickup and drop locations to check the estimated fare.",
  },
  {
    question: "📍 Where do you provide service?",
    answer:
      "SBS Taxi provides local city rides, outstation trips, airport rides and trips to popular tourist destinations.",
  },
  {
    question: "✈️ Do you provide airport rides?",
    answer:
      "Yes. SBS Taxi provides airport pickup and drop services.",
  },
  {
    question: "🕐 Can I book for later?",
    answer:
      "Yes. You can schedule a taxi for a future date and time through the booking option.",
  },
  {
    question: "🚗 What vehicles are available?",
    answer:
      "SBS Taxi provides vehicle options such as Mini, Sedan, SUV and other available categories.",
  },
  {
    question: "🗺️ Do you provide outstation trips?",
    answer:
      "Yes. SBS Taxi provides one-way and round-trip outstation taxi services.",
  },
  {
    question: "🏨 Do you provide tourist trips?",
    answer:
      "Yes. SBS Taxi can help you travel to popular tourist destinations and sightseeing places.",
  },
  {
    question: "💳 What payment methods are accepted?",
    answer:
      "Payment options can include Cash, UPI and other available payment methods.",
  },
  {
    question: "❌ How can I cancel my booking?",
    answer:
      "You can cancel your booking from the booking or active trip section. Cancellation charges may apply.",
  },
  {
    question: "📞 How can I contact SBS Taxi?",
    answer:
      "You can contact SBS Taxi by calling +91 98435 44844.",
  },
  {
    question: "🎁 Do you have any offers?",
    answer:
      "SBS Taxi may provide special offers and discounts. Please check the Offers section for current offers.",
  },
];

/* =====================================================
   LOCAL AI-LIKE ANSWER SYSTEM
   NO API / NO OPENAI
===================================================== */

function getAnswer(message: string) {
  const lower = message.toLowerCase().trim();

  if (
    lower.includes("hi") ||
    lower.includes("hello") ||
    lower.includes("hey") ||
    lower.includes("hai")
  ) {
    return "👋 Hi! Welcome to SBS Taxi. How can I help you? You can ask me about booking, fare, airport rides, vehicles, outstation trips, payments or offers.";
  }

  if (
    lower.includes("book") ||
    lower.includes("booking") ||
    lower.includes("taxi") ||
    lower.includes("ride")
  ) {
    return defaultQuestions[0].answer;
  }

  if (
    lower.includes("fare") ||
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("rate")
  ) {
    return defaultQuestions[1].answer;
  }

  if (
    lower.includes("where") ||
    lower.includes("service") ||
    lower.includes("area") ||
    lower.includes("location")
  ) {
    return defaultQuestions[2].answer;
  }

  if (
    lower.includes("airport") ||
    lower.includes("flight")
  ) {
    return defaultQuestions[3].answer;
  }

  if (
    lower.includes("later") ||
    lower.includes("schedule") ||
    lower.includes("future") ||
    lower.includes("tomorrow")
  ) {
    return defaultQuestions[4].answer;
  }

  if (
    lower.includes("vehicle") ||
    lower.includes("car") ||
    lower.includes("sedan") ||
    lower.includes("suv") ||
    lower.includes("mini")
  ) {
    return defaultQuestions[5].answer;
  }

  if (
    lower.includes("outstation") ||
    lower.includes("out station") ||
    lower.includes("one way") ||
    lower.includes("round trip")
  ) {
    return defaultQuestions[6].answer;
  }

  if (
    lower.includes("tourist") ||
    lower.includes("destination") ||
    lower.includes("sightseeing") ||
    lower.includes("place")
  ) {
    return defaultQuestions[7].answer;
  }

  if (
    lower.includes("payment") ||
    lower.includes("upi") ||
    lower.includes("cash")
  ) {
    return defaultQuestions[8].answer;
  }

  if (
    lower.includes("cancel") ||
    lower.includes("cancellation")
  ) {
    return defaultQuestions[9].answer;
  }

  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("support") ||
    lower.includes("call")
  ) {
    return defaultQuestions[10].answer;
  }

  if (
    lower.includes("offer") ||
    lower.includes("discount") ||
    lower.includes("coupon")
  ) {
    return defaultQuestions[11].answer;
  }

  return (
    "Sorry 😔 I can currently help with SBS Taxi questions.\n\n" +
    "You can ask about:\n" +
    "🚕 Taxi booking\n" +
    "💰 Fare\n" +
    "✈️ Airport rides\n" +
    "🚗 Vehicles\n" +
    "🗺️ Outstation trips\n" +
    "💳 Payments\n" +
    "❌ Cancellation\n" +
    "🎁 Offers"
  );
}

/* =====================================================
   CHAT BOX
===================================================== */

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<ChatScreen>("menu");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi 👋 Welcome to SBS Taxi!\n\nHow can I help you today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* =====================================================
     AUTO SCROLL
  ===================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =====================================================
     ASK QUESTION
  ===================================================== */

  const askQuestion = (
    question: string,
    answer: string
  ) => {
    const id = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id,
        role: "user",
        content: question,
      },
      {
        id: id + 1,
        role: "assistant",
        content: answer,
      },
    ]);

    setScreen("chat");
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    const answer = getAnswer(text);
    const id = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id,
        role: "user",
        content: text,
      },
      {
        id: id + 1,
        role: "assistant",
        content: answer,
      },
    ]);

    setMessage("");
  };

  /* =====================================================
     OPEN CHAT
  ===================================================== */

  const openChat = () => {
    setOpen(true);
    setScreen("menu");
  };

  /* =====================================================
     CLOSE CHAT
  ===================================================== */

  const closeChat = () => {
    setOpen(false);
    setScreen("menu");
  };

  return (
    <>
      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-x-3
            bottom-20
            z-[9999]
            mx-auto
            w-auto
            max-w-[390px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]

            sm:inset-x-auto
            sm:right-5
            sm:bottom-24
            sm:w-[390px]

            md:right-6
            md:bottom-24

            max-h-[calc(100dvh-90px)]
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative
              shrink-0
              bg-[#1A365D]
              px-4
              py-3
              text-white
              sm:px-5
              sm:py-4
            "
          >
            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closeChat}
              aria-label="Close SBS Taxi chat"
              className="
                absolute
                right-3
                top-2
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
              "
            >
              <X className="h-5 w-5" />
            </button>

            {/* HEADER CONTENT */}

            <div className="flex items-center gap-3 pr-10">

              {/* LOGO */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-2
                  border-white/40
                  bg-white
                  sm:h-14
                  sm:w-14
                "
              >
                <Image
                  src="/sbsai.png"
                  alt="SBS Taxi"
                  width={100}
                  height={100}
                  priority
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* TITLE */}

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide !text-green-300">
                  ● Online
                </p>

                <h2 className="truncate text-base font-bold !text-white sm:text-lg">
                  SBS Taxi
                </h2>

                <p className="truncate text-xs !text-white/75 sm:text-sm">
                  How can we help you?
                </p>
              </div>

            </div>
          </div>

          {/* =================================================
              MENU SCREEN
          ================================================= */}

          {screen === "menu" && (
            <div className="max-h-[calc(100dvh-170px)] overflow-y-auto">

              {/* WELCOME */}

              <div className="bg-[#1A365D] px-4 pb-4 sm:px-5 sm:pb-5">
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    p-3
                    text-sm
                    leading-5
                    !text-white/90
                    sm:p-4
                    sm:leading-6
                  "
                >
                  Hi 👋{" "}
                  <strong className="!text-white">
                    Welcome to SBS Taxi!
                  </strong>

                  <br />

                  I can help you with booking, fares,
                  airport rides, vehicles and other
                  SBS Taxi services.
                </div>
              </div>

              {/* OPTIONS */}

              <div className="bg-white">

                {/* BOOK RIDE */}

                <Link
                  href="/booking"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-gray-200
                    px-4
                    py-3
                    transition
                    hover:bg-gray-50
                    sm:gap-4
                    sm:px-5
                    sm:py-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-[#1A365D]
                    "
                  >
                    <Car className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Book a Ride
                    </h3>

                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      Book your taxi now
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </Link>

                {/* TRACK RIDE */}

                <Link
                  href="/booking"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-gray-200
                    px-4
                    py-3
                    transition
                    hover:bg-gray-50
                    sm:gap-4
                    sm:px-5
                    sm:py-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-[#1A365D]
                    "
                  >
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Track My Ride
                    </h3>

                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      Check your taxi location
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </Link>

                {/* CHAT */}

                <button
                  type="button"
                  onClick={() => setScreen("chat")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-b
                    border-gray-200
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-gray-50
                    sm:gap-4
                    sm:px-5
                    sm:py-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-[#1A365D]
                    "
                  >
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Chat with Us
                    </h3>

                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      SBS Taxi Assistant
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </button>

                {/* CALL */}

                <Link
                  href="/contact"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    transition
                    hover:bg-gray-50
                    sm:gap-4
                    sm:px-5
                    sm:py-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-green-50
                      text-green-600
                    "
                  >
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      Call SBS Taxi
                    </h3>

                    <p className="text-xs text-gray-500 sm:text-sm">
                      98435 44844
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </Link>

              </div>
            </div>
          )}

          {/* =================================================
              CHAT SCREEN
          ================================================= */}

          {screen === "chat" && (
            <div
              className="
                flex
                h-[min(520px,calc(100dvh-150px))]
                flex-col
              "
            >

              {/* CHAT TOP */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  border-b
                  bg-white
                  px-3
                  py-2.5
                  sm:gap-3
                  sm:px-4
                  sm:py-3
                "
              >
                <button
                  type="button"
                  onClick={() => setScreen("menu")}
                  aria-label="Back"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    transition
                    hover:bg-gray-100
                  "
                >
                  <ArrowLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    SBS Taxi Support
                  </p>

                  <p className="text-[11px] text-green-600">
                    ● Assistant Online
                  </p>
                </div>
              </div>

              {/* MESSAGES */}

              <div
                className="
                  min-h-0
                  flex-1
                  space-y-3
                  overflow-y-auto
                  bg-gray-50
                  p-3
                  sm:space-y-4
                  sm:p-4
                "
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        msg.role === "user"
                          ? `
                            max-w-[82%]
                            rounded-2xl
                            rounded-tr-sm
                            bg-[#1A365D]
                            px-3
                            py-2.5
                            text-white
                            shadow-sm
                            sm:px-4
                            sm:py-3
                          `
                          : `
                            max-w-[85%]
                            rounded-2xl
                            rounded-tl-sm
                            bg-white
                            px-3
                            py-2.5
                            text-gray-700
                            shadow-sm
                            sm:px-4
                            sm:py-3
                          `
                      }
                    >
                      <p className="whitespace-pre-wrap text-xs leading-5 sm:text-sm sm:leading-6">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* QUICK QUESTIONS */}

              <div
                className="
                  shrink-0
                  border-t
                  bg-white
                  px-3
                  py-2
                "
              >
                <p className="mb-1.5 text-[10px] font-semibold text-gray-500">
                  Quick Questions
                </p>

                <div className="flex gap-2 overflow-x-auto pb-0.5">
                  {defaultQuestions
                    .slice(0, 4)
                    .map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          askQuestion(
                            item.question,
                            item.answer
                          )
                        }
                        className="
                          shrink-0
                          rounded-full
                          border
                          border-gray-200
                          bg-gray-50
                          px-3
                          py-1.5
                          text-[11px]
                          text-gray-700
                          transition
                          hover:border-[#FFC107]
                          hover:bg-yellow-50
                        "
                      >
                        {item.question}
                      </button>
                    ))}
                </div>
              </div>

              {/* BOOK RIDE */}

              <div
                className="
                  shrink-0
                  border-t
                  bg-white
                  px-3
                  py-2
                "
              >
                <Link
                  href="/booking"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FFC107]
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-[#1A365D]
                    transition
                    hover:bg-[#eab308]
                  "
                >
                  🚕 Book a Ride
                </Link>
              </div>

              {/* MESSAGE INPUT */}

              <div
                className="
                  shrink-0
                  border-t
                  bg-white
                  p-2.5
                "
              >
                <div className="flex items-center gap-2">

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask about SBS Taxi..."
                    className="
                      min-w-0
                      flex-1
                      rounded-xl
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-xs
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#1A365D]
                      focus:ring-1
                      focus:ring-[#1A365D]
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    aria-label="Send message"
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#1A365D]
                      text-white
                      transition
                      hover:bg-[#0f2747]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* =====================================================
          FLOATING CHAT BUTTON
      ===================================================== */}

      {!open && (
        <button
          type="button"
          onClick={openChat}
          aria-label="Open SBS Taxi chat"
          className="
            fixed
            bottom-20
            right-3
            z-[9998]
            flex
            h-20
            w-20
            items-center
            justify-center
            overflow-visible
            rounded-full
            transition
            hover:scale-105

            sm:bottom-24
            sm:right-4
            sm:h-24
            sm:w-24

            md:bottom-6
            md:right-6
            md:h-28
            md:w-28
          "
        >
          <Image
            src="/sbsai.png"
            alt="Open SBS Taxi chat"
            width={160}
            height={160}
            priority
            className="
              h-20
              w-20
              object-contain
              drop-shadow-[0_8px_18px_rgba(0,0,0,0.30)]

              sm:h-24
              sm:w-24

              md:h-28
              md:w-28
            "
          />
        </button>
      )}
    </>
  );
}