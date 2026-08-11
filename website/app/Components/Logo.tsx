
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Logo */}
      <div className="relative h-12 w-12 sm:h-14 sm:w-14">
        <Image
          src="/logo.png"
          alt="SBS Taxi Logo"
          fill
          priority
          sizes="56px"
          className="object-contain"
        />
      </div>

      {/* SBS Taxi Name */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold text-black sm:text-xl">
          SBS Taxi
        </span>

        <span className="mt-1 text-[9px] font-medium tracking-wider text-gray-500 sm:text-[10px]">
          SAFE • RELIABLE • FAST
        </span>
      </div>
    </div>
  );
}
