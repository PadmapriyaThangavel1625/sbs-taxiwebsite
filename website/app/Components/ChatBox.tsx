
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

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<ChatScreen>("menu");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi 👋 Welcome to SBS Taxi! How can I help you today?",
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
  }, [messages, loading]);

  /* =====================================================
     SEND MESSAGE TO AI
  ===================================================== */
  const sendMessage = async () => {
    const text = message.trim();

    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to get AI response"
        );
      }

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data?.reply ||
          "Sorry, I couldn't understand that. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Sorry 😔 I'm unable to respond right now. Please try again or contact SBS Taxi support.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
            bottom-24
            right-3
            z-[9999]
            w-[calc(100vw-24px)]
            max-w-[390px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            sm:right-5
            sm:w-[390px]
            md:bottom-24
            md:right-6
          "
        >
          {/* CLOSE / CANCEL BUTTON */} 
    
          {/* =================================================
              HEADER
          ================================================= */}
          <div className="relative bg-[#1A365D] px-5 py-5 text-white">
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closeChat}
              aria-label="Close SBS Taxi chat"
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-white/80
                transition
                hover:bg-white/10
                hover:text-white
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
                  border-white/30
                  bg-white
                "
              >
                <img
                  src="/sbsai.png"
                  alt="SBS Taxi"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              {/* TITLE */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-green-300">
                  ● Online
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  SBS Taxi
                </h2>

                <p className="text-sm text-white/75">
                  How can we help you?
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MENU SCREEN
          ================================================= */}
          {screen === "menu" && (
            <>
              {/* WELCOME */}
              <div className="bg-[#1A365D] px-5 pb-5">
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    p-4
                    text-sm
                    leading-6
                    text-white/90
                  "
                >
                  Hi 👋{" "}
                  <strong className="text-white">
                    Welcome to SBS Taxi!
                  </strong>

                  <br />

                  I can help you book a ride, track your taxi,
                  or contact our team.
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
                    gap-4
                    border-b
                    border-gray-200
                    px-5
                    py-4
                    transition
                    hover:bg-gray-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
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

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Book a Ride
                    </h3>

                    <p className="text-sm text-gray-500">
                      Book your taxi now
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>

                {/* TRACK RIDE */}
                <Link
                  href="/booking"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-gray-200
                    px-5
                    py-4
                    transition
                    hover:bg-gray-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
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

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Track My Ride
                    </h3>

                    <p className="text-sm text-gray-500">
                      Check your taxi location
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>

                {/* AI CHAT */}
                <button
                  type="button"
                  onClick={() => setScreen("chat")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-4
                    border-b
                    border-gray-200
                    px-5
                    py-4
                    text-left
                    transition
                    hover:bg-gray-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
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

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Chat with Us
                    </h3>

                    <p className="text-sm text-gray-500">
                      Talk to SBS Taxi AI Support
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>

                {/* CALL */}
                <a
                  href="tel:+918144065688"
                  onClick={closeChat}
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-gray-200
                    px-5
                    py-4
                    transition
                    hover:bg-gray-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
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

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Call SBS Taxi
                    </h3>

                    <p className="text-sm text-gray-500">
                      +91 81440 65688
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/918144065688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    transition
                    hover:bg-gray-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-green-100
                      text-green-600
                    "
                  >
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      WhatsApp Us
                    </h3>

                    <p className="text-sm text-gray-500">
                      Quick support on WhatsApp
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </a>
              </div>

              {/* FOOTER */}
             

              <Link
                href="https://sbstechnologies.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs font-medium text-gray-500 transition hover:text-[#1A365D] hover:underline"
              >
                Powered by SBS Technologies
              </Link>

            </>
          )}

          {/* =================================================
              AI CHAT SCREEN
          ================================================= */}
          {screen === "chat" && (
            <div className="flex h-[420px] flex-col">
              {/* CHAT TOP */}
              <div className="flex shrink-0 items-center gap-3 border-b bg-white px-4 py-3">
                <button
                  type="button"
                  onClick={() => setScreen("menu")}
                  aria-label="Back"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    transition
                    hover:bg-gray-100
                  "
                >
                  <ArrowLeft className="h-5 w-5 text-gray-700" />
                </button>

                <div>
                  <p className="font-semibold text-gray-900">
                    SBS Taxi Support
                  </p>

                  <p className="text-xs text-green-600">
                    ● AI Assistant Online
                  </p>
                </div>
              </div>

              {/* MESSAGES */}
              <div
                className="
                  flex-1
                  space-y-4
                  overflow-y-auto
                  bg-gray-50
                  p-4
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
                            px-4
                            py-3
                            text-white
                            shadow-sm
                          `
                          : `
                            max-w-[85%]
                            rounded-2xl
                            rounded-tl-sm
                            bg-white
                            px-4
                            py-3
                            text-gray-700
                            shadow-sm
                          `
                      }
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {/* AI TYPING */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay: "150ms",
                          }}
                        />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay: "300ms",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* BOOK RIDE */}
              <div className="border-t bg-gray-50 px-3 pt-2">
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
              <div className="border-t bg-white p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={message}
                    disabled={loading}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={
                      loading
                        ? "SBS AI is typing..."
                        : "Type your message..."
                    }
                    className="
                      min-w-0
                      flex-1
                      rounded-xl
                      border
                      border-gray-200
                      px-4
                      py-3
                      text-sm
                      text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#1A365D]
                      focus:ring-1
                      focus:ring-[#1A365D]
                      disabled:bg-gray-100
                    "
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={
                      loading || !message.trim()
                    }
                    aria-label="Send message"
                    className="
                      flex
                      h-11
                      w-11
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
                    "
                  >
                    <Send className="h-5 w-5" />
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
            h-28
            w-28
            overflow-visible
            rounded-full
            transition
            hover:scale-105
            sm:bottom-24
            sm:right-4
            sm:h-32
            sm:w-32
            md:bottom-6
            md:right-6
            md:h-36
            md:w-36
          "
        >
          <Image
            src="/sbsai.png"
            alt="Open SBS Taxi chat"
            width={160}
            height={160}
            priority
            className="
              h-24
              w-24
              object-contain
              drop-shadow-[0_8px_18px_rgba(0,0,0,0.3)]
              sm:h-28
              sm:w-28
              md:h-32
              md:w-32
            "
          />
        </button>
      )}
    </>
  );
}