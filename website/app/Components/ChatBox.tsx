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
import Logo from "@/app/Components/Logo";

type ChatScreen = "menu" | "chat";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  action?: "booking" | "contact";
};

/* =====================================================
   SBS TAXI FAQ
===================================================== */

const defaultQuestions = [
  {
    question: "🚕 How can I book a taxi?",
    answer:
      "You can book an SBS Taxi by entering your pickup and drop location, selecting a vehicle, and confirming your booking.",
    action: "booking" as const,
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
    action: "booking" as const,
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
    action: "contact" as const,
  },
  {
    question: "🎁 Do you have any offers?",
    answer:
      "SBS Taxi may provide special offers and discounts. Please check the Offers section for current offers.",
  },
];

/* =====================================================
   LOCAL AI ANSWER SYSTEM
===================================================== */

function getAnswer(message: string): {
  answer: string;
  action?: "booking" | "contact";
} {
  const lower = message.toLowerCase().trim();

  if (
    lower.includes("hi") ||
    lower.includes("hello") ||
    lower.includes("hey") ||
    lower.includes("hai")
  ) {
    return {
      answer:
        "👋 Hi! Welcome to SBS Taxi. How can I help you? You can ask me about booking, fare, airport rides, vehicles, outstation trips, payments or offers.",
    };
  }

  if (
    lower.includes("book") ||
    lower.includes("booking") ||
    lower.includes("taxi") ||
    lower.includes("ride")
  ) {
    return {
      answer: defaultQuestions[0].answer,
      action: "booking",
    };
  }

  if (
    lower.includes("fare") ||
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("rate")
  ) {
    return {
      answer: defaultQuestions[1].answer,
    };
  }

  if (
    lower.includes("where") ||
    lower.includes("service") ||
    lower.includes("area") ||
    lower.includes("location")
  ) {
    return {
      answer: defaultQuestions[2].answer,
    };
  }

  if (lower.includes("airport") || lower.includes("flight")) {
    return {
      answer: defaultQuestions[3].answer,
    };
  }

  if (
    lower.includes("later") ||
    lower.includes("schedule") ||
    lower.includes("future") ||
    lower.includes("tomorrow")
  ) {
    return {
      answer: defaultQuestions[4].answer,
      action: "booking",
    };
  }

  if (
    lower.includes("vehicle") ||
    lower.includes("car") ||
    lower.includes("sedan") ||
    lower.includes("suv") ||
    lower.includes("mini")
  ) {
    return {
      answer: defaultQuestions[5].answer,
    };
  }

  if (
    lower.includes("outstation") ||
    lower.includes("out station") ||
    lower.includes("one way") ||
    lower.includes("round trip")
  ) {
    return {
      answer: defaultQuestions[6].answer,
    };
  }

  if (
    lower.includes("tourist") ||
    lower.includes("destination") ||
    lower.includes("sightseeing") ||
    lower.includes("place")
  ) {
    return {
      answer: defaultQuestions[7].answer,
    };
  }

  if (
    lower.includes("payment") ||
    lower.includes("upi") ||
    lower.includes("cash")
  ) {
    return {
      answer: defaultQuestions[8].answer,
    };
  }

  if (
    lower.includes("cancel") ||
    lower.includes("cancellation")
  ) {
    return {
      answer: defaultQuestions[9].answer,
    };
  }

  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("support") ||
    lower.includes("call")
  ) {
    return {
      answer: defaultQuestions[10].answer,
      action: "contact",
    };
  }

  if (
    lower.includes("offer") ||
    lower.includes("discount") ||
    lower.includes("coupon")
  ) {
    return {
      answer: defaultQuestions[11].answer,
    };
  }

  return {
    answer:
      "Sorry 😔 I can currently help with SBS Taxi questions.\n\n" +
      "You can ask about:\n" +
      "🚕 Taxi booking\n" +
      "💰 Fare\n" +
      "✈️ Airport rides\n" +
      "🚗 Vehicles\n" +
      "🗺️ Outstation trips\n" +
      "💳 Payments\n" +
      "❌ Cancellation\n" +
      "🎁 Offers",
  };
}

/* =====================================================
   ACTION BUTTON
===================================================== */

function ActionButton({
  action,
  onClose,
}: {
  action: "booking" | "contact";
  onClose: () => void;
}) {
  if (action === "booking") {
    return (
      <Link
        href="/booking"
        onClick={onClose}
        className="
          mt-3
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[var(--secondary)]
          px-4
          py-2.5
          text-xs
          font-bold
          text-[var(--primary)]
          transition
          hover:bg-[var(--secondary-dark)]
          sm:text-sm
        "
      >
        <Car className="h-4 w-4" />
        Book a Ride
        <ChevronRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href="/contacts"
      onClick={onClose}
      className="
        mt-3
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[var(--primary)]
        px-4
        py-2.5
        text-xs
        font-bold
        !text-white
        transition
        hover:bg-[var(--primary-dark)]
        sm:text-sm
      "
    >
      <Phone className="h-4 w-4" />
      Contact SBS Taxi
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

/* =====================================================
   FOOTER
===================================================== */

function ChatFooter() {
  return (
    <div
      className="
        shrink-0
        border-t
        border-gray-100
        bg-white
        px-3
        py-2.5
        text-center
      "
    >
      <p className="text-[10px] font-semibold text-gray-500">
        Powered by{" "}
        <a
          href="https://sbstechnologies.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            font-bold
            text-[var(--primary)]
            transition
            hover:underline
          "
        >
          SBS Technologies
        </a>
      </p>

      <div className="mt-1 flex items-center justify-center gap-1.5">
        <Image
          src="/flag.jpg"
          alt="India"
          width={18}
          height={12}
          className="h-3 w-[18px] rounded-sm object-cover"
        />

        <p className="text-[9px] text-gray-400">
          Made in India
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   CHAT BOX
===================================================== */

export default function ChatBox() {
  const [open, setOpen] = useState(false);

  /*
   * Directly open CHAT screen.
   * No menu is shown when clicking the floating button.
   */
  const [screen, setScreen] = useState<ChatScreen>("chat");

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
    answer: string,
    action?: "booking" | "contact"
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
        action,
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

    const result = getAnswer(text);
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
        content: result.answer,
        action: result.action,
      },
    ]);

    setMessage("");
  };

  /* =====================================================
     OPEN CHAT
  ===================================================== */

  const openChat = () => {
    setOpen(true);

    /*
     * Always open directly to chat.
     */
    setScreen("chat");
  };

  /* =====================================================
     CLOSE CHAT
  ===================================================== */

  const closeChat = () => {
    setOpen(false);
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
            flex
            h-[min(650px,calc(100dvh-100px))]
            w-auto
            max-w-[390px]
            flex-col
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
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative
              shrink-0
              bg-[var(--primary)]
              px-4
              py-3
              text-white
              sm:px-5
              sm:py-4
            "
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={closeChat}
              aria-label="Close SBS Taxi chat"
              className="
                absolute
                right-3
                top-3
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
              <Logo variant="footer" />
            </div>
          </div>

          {/* =================================================
              CHAT SCREEN
          ================================================= */}

          {screen === "chat" && (
            <div className="flex min-h-0 flex-1 flex-col bg-white">
              {/* CHAT TOP */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  border-b
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  sm:gap-3
                  sm:px-4
                  sm:py-3
                "
              >
                {/* BACK TO MENU */}

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
                    text-gray-700
                    transition
                    hover:bg-gray-100
                  "
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    SBS Taxi Support
                  </p>

                  <p className="text-[11px] font-medium text-green-600">
                    ● Assistant Online
                  </p>
                </div>

                <div
                  className="
                    hidden
                    rounded-full
                    bg-blue-50
                    px-2.5
                    py-1
                    text-[9px]
                    font-semibold
                    text-[var(--primary)]
                    sm:block
                  "
                >
                  LOCAL ASSISTANT
                </div>
              </div>

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <div
                className="
                  min-h-0
                  flex-1
                  space-y-3
                  overflow-y-auto
                  bg-gray-50
                  px-3
                  py-4
                  sm:space-y-4
                  sm:px-4
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
                            bg-[var(--primary)]
                            px-3.5
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
                            border
                            border-gray-100
                            bg-white
                            px-3.5
                            py-2.5
                            text-gray-700
                            shadow-sm
                            sm:px-4
                            sm:py-3
                          `
                      }
                    >
                      <p
                        className="
                          whitespace-pre-wrap
                          break-words
                          text-xs
                          leading-5
                          sm:text-sm
                          sm:leading-6
                        "
                      >
                        {msg.content}
                      </p>

                      {/* =================================================
                          ACTION LINK INSIDE ASSISTANT MESSAGE
                      ================================================= */}

                      {msg.role === "assistant" &&
                        msg.action && (
                          <ActionButton
                            action={msg.action}
                            onClose={closeChat}
                          />
                        )}
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

            {/* =================================================
    QUICK QUESTIONS
================================================= */}

<div
  className="
    shrink-0
    border-t
    border-gray-200
    bg-white
    px-3
    py-2
  "
>
  <p
    className="
      mb-1.5
      text-[10px]
      font-bold
      uppercase
      tracking-wide
      text-gray-400
    "
  >
    Quick Questions
  </p>

  <div
    className="
      flex
      gap-2
      overflow-x-auto
      overflow-y-hidden
      pb-2

      /* Firefox */
      [scrollbar-width:thin]
      [scrollbar-color:var(--primary)_#e5e7eb]

      /* Chrome / Edge / Safari */
      [&::-webkit-scrollbar]:h-1.5
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-200
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[var(--primary)]
      [&::-webkit-scrollbar-thumb:hover]:bg-[var(--primary-dark)]
    "
  >
    {defaultQuestions.slice(0, 4).map(
      (item, index) => (
        <button
          key={index}
          type="button"
          onClick={() =>
            askQuestion(
              item.question,
              item.answer,
              item.action
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
            text-[10px]
            font-medium
            text-gray-700
            transition
            hover:border-[var(--secondary)]
            hover:bg-[var(--secondary-light)]
          "
        >
          {item.question}
        </button>
      )
    )}
  </div>
</div>

              {/* =================================================
                  BOOK RIDE
              ================================================= */}

              <div
                className="
                  shrink-0
                  border-t
                  border-gray-200
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
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--secondary)]
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-[var(--primary)]
                    transition
                    hover:bg-[var(--secondary-dark)]
                  "
                >
                  <Car className="h-4 w-4" />
                  Book a Ride
                </Link>
              </div>

              {/* =================================================
                  MESSAGE INPUT
              ================================================= */}

              <div
                className="
                  shrink-0
                  border-t
                  border-gray-200
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
                      bg-gray-50
                      px-3
                      py-2.5
                      text-xs
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[var(--primary)]
                      focus:bg-white
                      focus:ring-1
                      focus:ring-[var(--primary)]
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
                      bg-[var(--primary)]
                      text-white
                      transition
                      hover:bg-[var(--primary-dark)]
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

              {/* =================================================
                  CHAT FOOTER
              ================================================= */}

              <ChatFooter />
            </div>
          )}

          {/* =================================================
              MENU SCREEN
          ================================================= */}

          {screen === "menu" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {/* WELCOME */}

              <div
                className="
                  shrink-0
                  bg-[var(--primary)]
                  px-4
                  pb-4
                  sm:px-5
                  sm:pb-5
                "
              >
                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    p-3
                    text-sm
                    leading-5
                    text-white/90
                    sm:p-4
                    sm:leading-6
                  "
                >
                  Hi 👋{" "}
                  <strong className="text-white">
                    Welcome to SBS Taxi!
                  </strong>

                  <br />

                  I can help you with booking, fares,
                  airport rides, vehicles and other SBS
                  Taxi services.
                </div>
              </div>

              {/* OPTIONS */}

              <div className="min-h-0 flex-1 overflow-y-auto bg-white">
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
                      text-[var(--primary)]
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
                      text-[var(--primary)]
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
                      text-[var(--primary)]
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
                  href="/contacts"
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
                    <h3 className="text-sm font-semibold !text-white-900 sm:text-base">
                      Call SBS Taxi
                    </h3>

                    <p className="text-xs text-white-500 sm:text-sm">
                      98435 44844
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </Link>
              </div>

              {/* FOOTER */}

              <ChatFooter />
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          FLOATING MESSAGE BUTTON
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
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[var(--secondary)]
            text-[var(--primary)]
            shadow-[0_8px_25px_rgba(0,0,0,0.25)]
            transition-all
            duration-300
            hover:scale-110
            hover:bg-[var(--secondary-dark)]
            active:scale-95

            sm:bottom-24
            sm:right-4
            sm:h-16
            sm:w-16

            md:bottom-6
            md:right-6
            md:h-16
            md:w-16
          "
        >
          <MessageCircle
            className="
              h-7
              w-7
              sm:h-8
              sm:w-8
            "
            strokeWidth={2.2}
          />

          {/* ONLINE DOT */}

          <span
            className="
              absolute
              right-0.5
              top-0.5
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-white
              bg-green-500
            "
          />
        </button>
      )}
    </>
  );
}