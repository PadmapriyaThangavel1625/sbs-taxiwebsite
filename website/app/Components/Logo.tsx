export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 150"
      width="170"
      height="75"
      className="object-contain"
    >
      {/* Car Roof Curve */}
      <path
        d="M20 60 C70 42 110 20 170 20 C230 20 270 42 320 60 C270 46 220 30 170 30 C120 30 70 46 20 60 Z"
        fill="#0F4C81"
      />

      {/* SBS */}
      <text
        x="20"
        y="102"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="48"
        fill="#0F4C81"
        letterSpacing="1"
      >
        SBS
      </text>

      {/* TAXI */}
      <text
        x="142"
        y="102"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="48"
        fill="#F4A211"
        letterSpacing="1"
      >
        TAXI
      </text>

      {/* Tagline */}
      <text
        x="36"
        y="130"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#111111"
        letterSpacing="0.5"
      >
        Safe. Reliable. Anytime.
      </text>
    </svg>
  );
}