"use client";

import {
  ArrowLeft,
  CarFront,
  CheckCircle2,
  Edit3,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
  XCircle,
} from "lucide-react";

import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

/* ============================================================
   TYPES
============================================================ */

interface DriverProfile {
  id: number;
  name: string;
  mobile: string;
  email: string;

  profile_image?: string | null;
  rating?: number | null;
  availability_status?: string | null;

  vehicle_id?: number | null;
  vehicle_number?: string | null;
  manufacturer?: string | null;
  vehicle_model?: string | null;
  vehicle_color?: string | null;

  vehicle_type_id?: number | null;
  vehicle_type_name?: string | null;
  vehicle_capacity?: number | null;

  address?: string | null;
  city?: string | null;
  state?: string | null;
}

interface DriverApiResponse {
  success: boolean;
  message?: string;
  data?: DriverProfile;
}

interface CancelApiResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

/* ============================================================
   PAGE
============================================================ */

export default function DriverProfilePage() {
  return (
    <Suspense
      fallback={<DriverProfileLoading />}
    >
      <DriverProfileContent />
    </Suspense>
  );
}

/* ============================================================
   MAIN CLIENT CONTENT
============================================================ */

function DriverProfileContent() {
  const searchParams = useSearchParams();

  const [profile, setProfile] =
    useState<DriverProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [rideId, setRideId] =
    useState<string | null>(null);

  const [cancelling, setCancelling] =
    useState(false);

  /* ============================================================
     GET RIDE ID
  ============================================================ */

  const getRideId = useCallback(() => {
    const urlRideId =
      searchParams.get("ride_id");

    const storedRideId =
      localStorage.getItem("ride_id");

    const finalRideId =
      urlRideId || storedRideId;

    console.log(
      "================================="
    );

    console.log(
      "DRIVER PROFILE"
    );

    console.log(
      "URL ride_id:",
      urlRideId
    );

    console.log(
      "Stored ride_id:",
      storedRideId
    );

    console.log(
      "Final ride_id:",
      finalRideId
    );

    console.log(
      "================================="
    );

    if (urlRideId) {
      localStorage.setItem(
        "ride_id",
        urlRideId
      );
    }

    if (finalRideId) {
      setRideId(finalRideId);
    }

    return finalRideId;
  }, [searchParams]);

  /* ============================================================
     LOAD DRIVER PROFILE
  ============================================================ */

  const loadProfile = useCallback(
    async (
      currentRideId?: string | null
    ) => {
      try {
        setLoading(true);
        setError("");

        const finalRideId =
          currentRideId || getRideId();

        console.log(
          "Loading driver profile for ride:",
          finalRideId
        );

        if (!finalRideId) {
          throw new Error(
            "ride_id is required"
          );
        }

        setRideId(finalRideId);

        localStorage.setItem(
          "ride_id",
          finalRideId
        );

        /* ========================================================
           NEXT.JS API ROUTE
        ======================================================== */

        const apiUrl =
          `/api/passenger/driver-details?ride_id=${encodeURIComponent(
            finalRideId
          )}`;

        console.log(
          "Calling driver details API:",
          apiUrl
        );

        const response =
          await fetch(apiUrl, {
            method: "GET",

            headers: {
              Accept:
                "application/json",
            },

            cache: "no-store",
          });

        console.log(
          "Driver details HTTP status:",
          response.status
        );

        const rawResponse =
          await response.text();

        console.log(
          "Driver details raw response:",
          rawResponse
        );

        let data: DriverApiResponse;

        try {
          data =
            JSON.parse(
              rawResponse
            ) as DriverApiResponse;
        } catch (jsonError) {
          console.error(
            "Driver details JSON parse error:",
            jsonError
          );

          throw new Error(
            "Driver details API returned invalid JSON"
          );
        }

        console.log(
          "Driver details parsed response:",
          data
        );

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to load driver profile"
          );
        }

        setProfile(
          data.data ?? null
        );

        if (!data.data) {
          throw new Error(
            "Driver profile data was not found"
          );
        }
      } catch (err) {
        console.error(
          "Driver profile error:",
          err
        );

        setProfile(null);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load driver profile"
        );
      } finally {
        setLoading(false);
      }
    },
    [getRideId]
  );

  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {
    const currentRideId =
      getRideId();

    loadProfile(
      currentRideId
    );
  }, [
    getRideId,
    loadProfile,
  ]);

  /* ============================================================
     CANCEL RIDE
  ============================================================ */

  async function handleCancelRide() {
    if (!rideId) {
      toast.error(
        "Ride ID is missing"
      );

      return;
    }

    if (cancelling) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to cancel ride #${rideId}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      const loadingToast =
        toast.loading(
          "Cancelling ride..."
        );

      console.log(
        "Cancelling ride:",
        rideId
      );

      /* ========================================================
         NEXT.JS CANCEL API
      ======================================================== */

      const response =
        await fetch(
          "/api/passenger/cancel",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify({
              ride_id:
                Number(rideId),
            }),

            cache: "no-store",
          }
        );

      console.log(
        "Cancel HTTP status:",
        response.status
      );

      const text =
        await response.text();

      console.log(
        "Cancel raw response:",
        text
      );

      let data: CancelApiResponse;

      try {
        data =
          JSON.parse(
            text
          ) as CancelApiResponse;
      } catch {
        toast.dismiss(
          loadingToast
        );

        toast.error(
          "Invalid response from cancellation server"
        );

        return;
      }

      console.log(
        "Cancel parsed response:",
        data
      );

      toast.dismiss(
        loadingToast
      );

      if (
        !response.ok ||
        !data.success
      ) {
        toast.error(
          data.message ||
            "Unable to cancel ride"
        );

        return;
      }

      toast.success(
        data.message ||
          "Ride cancelled successfully"
      );

      /*
       * Clear stored ride ID after successful cancellation.
       */

      localStorage.removeItem(
        "ride_id"
      );

      /*
       * Keep the current ride ID visible,
       * but remove the cancel action.
       */

      setRideId(null);

      /*
       * Update profile status locally.
       */

      setProfile(
        (previous) =>
          previous
            ? {
                ...previous,
                availability_status:
                  "offline",
              }
            : previous
      );
    } catch (error) {
      console.error(
        "Cancel ride error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to cancel ride"
      );
    } finally {
      setCancelling(false);
    }
  }

  /* ============================================================
     INITIALS
  ============================================================ */

  function getInitials(
    name?: string
  ) {
    if (!name) {
      return "D";
    }

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word
            .charAt(0)
            .toUpperCase()
      )
      .join("");
  }

  /* ============================================================
     STATUS
  ============================================================ */

  function getStatus(
    status?: string | null
  ) {
    switch (
      status?.toLowerCase()
    ) {
      case "available":
      case "online":
        return {
          label: "Available",
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      case "busy":
        return {
          label: "Busy",
          className:
            "bg-amber-50 text-amber-700 border-amber-200",
        };

      case "offline":
        return {
          label: "Offline",
          className:
            "bg-gray-100 text-gray-600 border-gray-200",
        };

      case "cancelled":
      case "canceled":
        return {
          label: "Cancelled",
          className:
            "bg-red-50 text-red-700 border-red-200",
        };

      default:
        return {
          label:
            status ||
            "Unknown",
          className:
            "bg-gray-100 text-gray-600 border-gray-200",
        };
    }
  }

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <DriverProfileLoading />
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (
    error ||
    !profile
  ) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--background)]
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-600
            "
          >
            <UserRound
              size={30}
            />
          </div>

          <h1
            className="
              mt-5
              text-xl
              font-bold
              text-gray-900
            "
          >
            Unable to load profile
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >
            {error ||
              "Driver profile was not found."}
          </p>

          <button
            type="button"
            onClick={() =>
              loadProfile(rideId)
            }
            className="
              mt-6
              rounded-xl
              bg-[var(--primary)]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const status =
    getStatus(
      profile.availability_status
    );

  /* ============================================================
     PROFILE
  ============================================================ */

  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        px-4
        py-5
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
        "
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <Link
            href="/driverdashboard"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:border-[var(--primary)]
              hover:text-[var(--primary)]
            "
          >
            <ArrowLeft
              size={18}
            />

            <span>
              Back
            </span>
          </Link>

          <Link
            href="/driverprofile/edit"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--primary)]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:opacity-90
            "
          >
            <Edit3
              size={17}
            />

            <span>
              Edit Profile
            </span>
          </Link>
        </div>

        {/* ======================================================
            PROFILE CARD
        ====================================================== */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              relative
              h-36
              overflow-hidden
              bg-[var(--primary)]
              sm:h-44
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[var(--primary)]
                via-[var(--primary)]
                to-black/20
              "
            />

            <div
              className="
                absolute
                right-5
                top-5
              "
            >
              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  ${status.className}
                `}
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-current
                  "
                />

                {status.label}
              </span>
            </div>
          </div>

          <div
            className="
              px-5
              pb-7
              sm:px-8
            "
          >
            {/* AVATAR */}

            <div
              className="
                relative
                -mt-14
              "
            >
              {profile.profile_image ? (
                <img
                  src={
                    profile.profile_image
                  }
                  alt={
                    profile.name
                  }
                  className="
                    h-28
                    w-28
                    rounded-full
                    border-4
                    border-white
                    object-cover
                    shadow-md
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-white
                    bg-[var(--secondary)]
                    text-3xl
                    font-bold
                    text-[var(--primary)]
                    shadow-md
                  "
                >
                  {getInitials(
                    profile.name
                  )}
                </div>
              )}
            </div>

            {/* NAME */}

            <div
              className="
                mt-5
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <h1
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-gray-900
                      sm:text-3xl
                    "
                  >
                    {profile.name}
                  </h1>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-emerald-50
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      text-emerald-700
                    "
                  >
                    <CheckCircle2
                      size={14}
                    />

                    Verified
                  </span>
                </div>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Driver ID: #
                  {profile.id}
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Star
                  size={19}
                  className="
                    fill-[var(--secondary)]
                    text-[var(--secondary)]
                  "
                />

                <span
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  {Number(
                    profile.rating ?? 0
                  ).toFixed(1)}
                </span>

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Rating
                </span>
              </div>
            </div>

            {/* CONTACT */}

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <ContactItem
                icon={
                  <Phone size={20} />
                }
                label="Mobile Number"
                value={
                  profile.mobile
                }
              />

              <ContactItem
                icon={
                  <Mail size={20} />
                }
                label="Email Address"
                value={
                  profile.email
                }
              />
            </div>
          </div>
        </section>

        {/* ======================================================
            VEHICLE
        ====================================================== */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[var(--primary)]
                "
              >
                Assigned Vehicle
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-gray-900
                "
              >
                {profile.vehicle_type_name ||
                  "Vehicle"}
              </h2>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gray-50
                text-[var(--primary)]
              "
            >
              <CarFront
                size={24}
              />
            </div>
          </div>

          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <InfoItem
              label="Vehicle Number"
              value={
                profile.vehicle_number
              }
            />

            <InfoItem
              label="Manufacturer"
              value={
                profile.manufacturer
              }
            />

            <InfoItem
              label="Model"
              value={
                profile.vehicle_model
              }
            />

            <InfoItem
              label="Color"
              value={
                profile.vehicle_color
              }
            />

            <InfoItem
              label="Capacity"
              value={
                profile.vehicle_capacity
                  ? `${profile.vehicle_capacity} Seats`
                  : undefined
              }
            />
          </div>
        </section>

        {/* ======================================================
            LOCATION
        ====================================================== */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gray-50
                text-[var(--primary)]
              "
            >
              <MapPin
                size={21}
              />
            </div>

            <div>
              <h2
                className="
                  font-bold
                  text-gray-900
                "
              >
                Location
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Registered driver location
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              rounded-2xl
              bg-gray-50
              p-4
            "
          >
            <p
              className="
                text-sm
                leading-6
                text-gray-700
              "
            >
              {[
                profile.address,
                profile.city,
                profile.state,
              ]
                .filter(Boolean)
                .join(", ") ||
                "Location not available"}
            </p>
          </div>
        </section>

        {/* ======================================================
            ACCOUNT STATUS
        ====================================================== */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-emerald-50
                text-emerald-600
              "
            >
              <ShieldCheck
                size={24}
              />
            </div>

            <div>
              <h2
                className="
                  font-bold
                  text-gray-900
                "
              >
                Driver Account
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                Your driver account is
                connected to SBS Taxi.
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-3
            "
          >
            <span
              className="
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              Profile Active
            </span>

            <span
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-blue-700
              "
            >
              Driver Verified
            </span>

            {profile.vehicle_id && (
              <span
                className="
                  rounded-full
                  bg-gray-100
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-gray-700
                "
              >
                Vehicle Assigned
              </span>
            )}
          </div>
        </section>

        {/* ======================================================
            CANCEL RIDE
        ====================================================== */}

        {rideId && (
          <section
            className="
              mt-6
              rounded-3xl
              border
              border-red-200
              bg-white
              p-5
              shadow-sm
              sm:p-7
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-red-50
                    text-red-600
                  "
                >
                  <XCircle
                    size={24}
                  />
                </div>

                <div>
                  <h2
                    className="
                      font-bold
                      text-gray-900
                    "
                  >
                    Cancel Ride
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    Cancel this ride if
                    you no longer need
                    the assigned driver.
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-400
                    "
                  >
                    Ride ID: #{rideId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleCancelRide
                }
                disabled={
                  cancelling
                }
                className="
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {cancelling ? (
                  <>
                    <Loader2
                      size={18}
                      className="
                        animate-spin
                      "
                    />

                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle
                      size={18}
                    />

                    Cancel Ride
                  </>
                )}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

/* ============================================================
   LOADING COMPONENT
============================================================ */

function DriverProfileLoading() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--background)]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
        "
      >
        <div
          className="
            mb-6
            h-10
            w-40
            animate-pulse
            rounded-xl
            bg-gray-200
          "
        />

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              h-44
              animate-pulse
              bg-gray-200
            "
          />

          <div
            className="
              px-5
              pb-8
              sm:px-8
            "
          >
            <div
              className="
                -mt-14
                h-28
                w-28
                animate-pulse
                rounded-full
                border-4
                border-white
                bg-gray-300
              "
            />

            <div
              className="
                mt-5
                h-7
                w-52
                animate-pulse
                rounded-lg
                bg-gray-200
              "
            />

            <div
              className="
                mt-3
                h-5
                w-36
                animate-pulse
                rounded-lg
                bg-gray-200
              "
            />

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <div
                className="
                  h-24
                  animate-pulse
                  rounded-2xl
                  bg-gray-100
                "
              />

              <div
                className="
                  h-24
                  animate-pulse
                  rounded-2xl
                  bg-gray-100
                "
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   CONTACT ITEM
============================================================ */

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        p-4
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
          bg-white
          text-[var(--primary)]
          shadow-sm
        "
      >
        {icon}
      </div>

      <div
        className="
          min-w-0
        "
      >
        <p
          className="
            text-xs
            font-medium
            text-gray-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-gray-900
          "
        >
          {value ||
            "Not available"}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-100
        bg-gray-50
        p-4
      "
    >
      <p
        className="
          text-xs
          font-medium
          text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-sm
          font-bold
          text-gray-900
        "
      >
        {value ||
          "Not available"}
      </p>
    </div>
  );
}