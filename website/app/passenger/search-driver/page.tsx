import { Suspense } from "react";
import SearchDriverClient from "@/app/Components/Passenger/Booking/SearchDriverClient";

function SearchDriverLoading() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-gray-100">
      <header className="px-6 pt-6 sm:px-8">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <div className="h-8 w-52 animate-pulse rounded-full bg-gray-200" />

        <div className="mt-6 h-10 w-72 animate-pulse rounded-xl bg-gray-200" />

        <div className="mt-4 h-12 w-80 max-w-full animate-pulse rounded-xl bg-gray-200" />

        <div className="relative mt-12 flex h-44 w-44 items-center justify-center">
          <div className="h-44 w-44 animate-pulse rounded-full bg-yellow-100" />
        </div>

        <div className="mt-8 h-5 w-64 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-5 h-16 w-32 animate-pulse rounded-xl bg-gray-200" />
      </div>

      <div className="px-6 pb-8 sm:px-8">
        <div className="mx-auto h-12 w-full max-w-md animate-pulse rounded-xl bg-gray-200" />
      </div>
    </main>
  );
}

export default function SearchDriverPage() {
  return (
    <Suspense fallback={<SearchDriverLoading />}>
      <SearchDriverClient />
    </Suspense>
  );
}