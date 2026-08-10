
"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function MapSection() {
  return (
    <section className="py-10">
      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-[var(--border)]
          shadow-lg
          h-[500px]
          w-full
        "
      >
        <LeafletMap />
      </div>
    </section>
  );
}
