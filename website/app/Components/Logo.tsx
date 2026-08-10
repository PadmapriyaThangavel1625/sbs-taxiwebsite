
import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative h-12 w-32 sm:h-14 sm:w-36">
      <Image
        src="/logo.png"
        alt="SBS Taxi"
        fill
        priority
        sizes="(max-width: 640px) 128px, 144px"
        className="object-contain"
      />
    </div>
  );
}
