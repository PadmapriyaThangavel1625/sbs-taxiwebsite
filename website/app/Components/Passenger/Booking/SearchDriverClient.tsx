"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  CarFront,
  Loader2,
  X,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import toast from "react-hot-toast";

/* ============================================================
   TYPES
============================================================ */

interface DriverInfo {
  id?: number | string;
  name?: string;
  phone?: string;
  vehicle_number?: string;
  rating?: number | string;
}

interface RideHistoryItem {
  status?: string;
  driver?: DriverInfo;
}

interface StatusHistoryResponse {
  success?: boolean;
  message?: string;

  data?: {
    history?: RideHistoryItem[];
    driver?: DriverInfo;
  };
}

interface CancelResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

/* ============================================================
   PAGE
============================================================ */

export default function SearchDriverClient() {
  const router = useRouter();
  const params = useSearchParams();

  /* ==========================================================
     RIDE ID
  ========================================================== */

  const rideId = params.get("ride_id");

  /* ==========================================================
     STATE
  ========================================================== */

  const [isCancelling, setIsCancelling] =
    useState(false);

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  /* ==========================================================
     REFS
  ========================================================== */

  /*
   * Prevent status polling while cancellation
   * is happening.
   */
  const isCancellingRef =
    useRef(false);

  /*
   * Prevent multiple navigation calls.
   */
  const hasNavigatedRef =
    useRef(false);

  /*
   * Prevent state/navigation after unmount.
   */
  const isMountedRef =
    useRef(true);

  /* ============================================================
     CHECK RIDE STATUS
  ============================================================ */

  const checkRideStatus =
    useCallback(async () => {
      /*
       * No ride ID.
       */
      if (!rideId) {
        return;
      }

      /*
       * Stop polling while cancelling.
       */
      if (isCancellingRef.current) {
        return;
      }

      /*
       * Stop polling after navigation.
       */
      if (hasNavigatedRef.current) {
        return;
      }

      try {
        const response =
          await fetch(
            `/api/passenger/status-history?ride_id=${encodeURIComponent(
              rideId
            )}`,
            {
              method: "GET",

              cache: "no-store",

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        let result:
          | StatusHistoryResponse
          | null = null;

        try {
          result =
            (await response.json()) as StatusHistoryResponse;
        } catch {
          console.error(
            "Invalid status-history response."
          );

          return;
        }

        /*
         * Component may have unmounted.
         */
        if (!isMountedRef.current) {
          return;
        }

        /*
         * API failed.
         */
        if (
          !response.ok ||
          !result ||
          result.success !== true
        ) {
          return;
        }

        /*
         * Get history.
         */
        const history =
          result.data?.history ?? [];

        /*
         * No status yet.
         */
        if (
          history.length === 0
        ) {
          return;
        }

        /*
         * Latest history item.
         */
        const latestHistoryItem =
          history[
            history.length - 1
          ];

        /*
         * Latest status.
         */
        const latestStatus =
          String(
            latestHistoryItem?.status ??
              ""
          )
            .trim()
            .toLowerCase();

        /* ======================================================
           DRIVER ACCEPTED
        ====================================================== */

        if (
          latestStatus ===
          "accepted"
        ) {
          /*
           * Prevent duplicate navigation.
           */
          hasNavigatedRef.current =
            true;

          toast.success(
            "Driver found! Connecting you now...",
            {
              id: "driver-accepted",
            }
          );

          /*
           * Driver may be returned from:
           *
           * 1. latest history item
           * 2. result.data.driver
           */
          const driver =
            latestHistoryItem?.driver ||
            result.data?.driver ||
            {};

          /*
           * Preserve existing query params.
           */
          const query =
            new URLSearchParams();

          params.forEach(
            (value, key) => {
              query.set(
                key,
                value
              );
            }
          );

          /*
           * Always keep ride_id.
           */
          query.set(
            "ride_id",
            String(rideId)
          );

          /* ====================================================
             DRIVER ID
          ==================================================== */

          if (
            driver.id !==
              undefined &&
            driver.id !== null &&
            String(
              driver.id
            ).trim() !== ""
          ) {
            query.set(
              "driver_id",
              String(driver.id)
            );
          }

          /* ====================================================
             DRIVER NAME
          ==================================================== */

          if (
            driver.name &&
            String(
              driver.name
            ).trim() !== ""
          ) {
            query.set(
              "driver_name",
              String(
                driver.name
              )
            );
          }

          /* ====================================================
             DRIVER PHONE
          ==================================================== */

          if (
            driver.phone &&
            String(
              driver.phone
            ).trim() !== ""
          ) {
            query.set(
              "driver_phone",
              String(
                driver.phone
              )
            );
          }

          /* ====================================================
             VEHICLE NUMBER
          ==================================================== */

          if (
            driver.vehicle_number &&
            String(
              driver.vehicle_number
            ).trim() !== ""
          ) {
            query.set(
              "vehicle_number",
              String(
                driver.vehicle_number
              )
            );
          }

          /* ====================================================
             DRIVER RATING
          ==================================================== */

          if (
            driver.rating !==
              undefined &&
            driver.rating !== null &&
            String(
              driver.rating
            ).trim() !== ""
          ) {
            query.set(
              "driver_rating",
              String(
                driver.rating
              )
            );
          }

          /*
           * Navigate to driver profile.
           */
          router.push(
            `/passenger/driverprofile?${query.toString()}`
          );

          return;
        }

        /* ======================================================
           RIDE CANCELLED
        ====================================================== */

        if (
          latestStatus ===
          "cancelled"
        ) {
          hasNavigatedRef.current =
            true;

          toast.error(
            "Your ride has been cancelled.",
            {
              id: "ride-cancelled",
            }
          );

          router.replace(
            "/passenger/dashboard"
          );

          return;
        }

        /* ======================================================
           RIDE EXPIRED
        ====================================================== */

        if (
          latestStatus ===
          "expired"
        ) {
          hasNavigatedRef.current =
            true;

          toast.error(
            "Your ride request has expired.",
            {
              id: "ride-expired",
            }
          );

          router.replace(
            "/passenger/booking-ride"
          );

          return;
        }

        /*
         * requested
         * searching
         * pending
         *
         * Continue polling.
         */
      } catch (error) {
        console.error(
          "Status History Error:",
          error
        );
      }
    }, [
      params,
      rideId,
      router,
    ]);

  /* ============================================================
     INITIAL CHECK + POLLING
  ============================================================ */

  useEffect(() => {
    isMountedRef.current =
      true;

    isCancellingRef.current =
      false;

    hasNavigatedRef.current =
      false;

    /*
     * No ride ID.
     */
    if (!rideId) {
      toast.error(
        "Ride ID is missing.",
        {
          id: "missing-ride-id",
        }
      );

      router.replace(
        "/passenger/booking-ride"
      );

      return;
    }

    /*
     * Check immediately.
     */
    checkRideStatus();

    /*
     * Continue checking every 5 seconds.
     */
    const interval =
      window.setInterval(
        () => {
          checkRideStatus();
        },
        5000
      );

    /*
     * Cleanup.
     */
    return () => {
      isMountedRef.current =
        false;

      window.clearInterval(
        interval
      );
    };
  }, [
    checkRideStatus,
    rideId,
    router,
  ]);

  /* ============================================================
     OPEN CANCEL MODAL
  ============================================================ */

  const openCancelModal =
    () => {
      if (isCancelling) {
        return;
      }

      setShowCancelModal(
        true
      );
    };

  /* ============================================================
     CLOSE CANCEL MODAL
  ============================================================ */

  const closeCancelModal =
    () => {
      if (isCancelling) {
        return;
      }

      setShowCancelModal(
        false
      );
    };

  /* ============================================================
     CANCEL RIDE
  ============================================================ */

  const handleCancelRide =
    async () => {
      /*
       * Validate ride ID.
       */
      if (!rideId) {
        toast.error(
          "Ride ID not found."
        );

        return;
      }

      /*
       * Prevent double-click.
       */
      if (
        isCancellingRef.current
      ) {
        return;
      }

      /*
       * Stop polling immediately.
       */
      isCancellingRef.current =
        true;

      setIsCancelling(
        true
      );

      setShowCancelModal(
        false
      );

      const cancelToastId =
        "cancel-ride-request";

      toast.loading(
        "Cancelling your ride...",
        {
          id: cancelToastId,
        }
      );

      try {
        const numericRideId =
          Number(rideId);

        /*
         * Validate numeric ride ID.
         */
        if (
          !Number.isInteger(
            numericRideId
          ) ||
          numericRideId <= 0
        ) {
          throw new Error(
            "Invalid ride ID."
          );
        }

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
                  numericRideId,
              }),

              cache: "no-store",
            }
          );

        /*
         * Read response as text first.
         * This prevents JSON parse errors
         * from hiding the actual server response.
         */
        const rawResponse =
          await response.text();

        let result:
          | CancelResponse
          | null = null;

        try {
          result =
            JSON.parse(
              rawResponse
            ) as CancelResponse;
        } catch {
          console.error(
            "Cancel API raw response:",
            rawResponse
          );

          toast.error(
            "Invalid response from cancellation server.",
            {
              id: cancelToastId,
            }
          );

          isCancellingRef.current =
            false;

          setIsCancelling(
            false
          );

          return;
        }

        console.log(
          "Cancel API response:",
          {
            status:
              response.status,
            ok:
              response.ok,
            result,
          }
        );

        /* ======================================================
           SUCCESS
        ====================================================== */

        if (
          response.ok &&
          result?.success === true
        ) {
          /*
           * Stop polling permanently.
           */
          hasNavigatedRef.current =
            true;

          toast.success(
            result.message ||
              "Ride cancelled successfully.",
            {
              id: cancelToastId,
            }
          );

          /*
           * Navigate after showing
           * success toast.
           */
          window.setTimeout(
            () => {
              if (
                isMountedRef.current
              ) {
                router.replace(
                  "/passenger/booking-ride"
                );
              }
            },
            1200
          );

          return;
        }

        /* ======================================================
           FAILED
        ====================================================== */

        isCancellingRef.current =
          false;

        setIsCancelling(
          false
        );

        toast.error(
          result?.message ||
            "Failed to cancel ride.",
          {
            id: cancelToastId,
          }
        );
      } catch (error) {
        console.error(
          "Cancel Ride Error:",
          error
        );

        isCancellingRef.current =
          false;

        setIsCancelling(
          false
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to cancel the ride. Please try again.",
          {
            id: cancelToastId,
          }
        );
      }
    };

  /* ============================================================
     NO RIDE ID UI
  ============================================================ */

  if (!rideId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <X
              size={30}
              className="text-red-600"
            />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Ride ID Missing
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We could not find your
            ride. Please return to
            the booking page and try
            again.
          </p>

          <button
            type="button"
            onClick={() =>
              router.replace(
                "/passenger/booking-ride"
              )
            }
            className="mt-6 w-full rounded-xl bg-[#123f80] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d3165]"
          >
            Go to Booking
          </button>
        </div>
      </main>
    );
  }

  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gray-100">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="px-6 pt-6 sm:px-8">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={isCancelling}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={22} />
        </button>
      </header>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        {/* Searching Badge */}

        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold text-yellow-800">
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />

          SEARCHING FOR DRIVER
        </div>

        {/* Title */}

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Searching for Driver
        </h1>

        {/* Description */}

        <p className="mt-3 max-w-sm text-base leading-relaxed text-gray-500">
          Please wait while we
          find
          <br />
          the best driver for your
          ride.
        </p>

        {/* ======================================================
            TAXI ANIMATION
        ====================================================== */}

        <div className="relative mt-12 flex h-44 w-44 items-center justify-center">
          {/* Outer pulse */}

          <div className="absolute h-44 w-44 animate-ping rounded-full bg-yellow-200 opacity-30" />

          {/* Middle circle */}

          <div className="absolute h-32 w-32 rounded-full bg-yellow-100" />

          {/* Taxi */}

          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 shadow-lg shadow-yellow-200">
            <CarFront
              size={44}
              strokeWidth={2.3}
              className="text-gray-900"
            />
          </div>
        </div>

        {/* Loading */}

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-500">
          <Loader2
            size={17}
            className="animate-spin"
          />

          Finding an available
          driver...
        </div>

        {/* ======================================================
            RIDE ID
        ====================================================== */}

        <div className="mt-5 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Ride ID
          </p>

          <p className="mt-1 text-sm font-bold text-[#123f80]">
            #{rideId}
          </p>
        </div>
      </div>

      {/* ========================================================
          CANCEL BUTTON
      ======================================================== */}

      <div className="px-6 pb-8 sm:px-8">
        <button
          type="button"
          onClick={
            openCancelModal
          }
          disabled={isCancelling}
          className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3.5 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCancelling ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Cancelling...
            </>
          ) : (
            <>
              <X size={18} />

              Cancel Ride
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          You can cancel while we
          are searching for a
          driver.
        </p>
      </div>

      {/* ========================================================
          CANCEL MODAL
      ======================================================== */}

      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={
            closeCancelModal
          }
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Icon */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <X
                size={28}
                className="text-red-600"
              />
            </div>

            {/* Title */}

            <h3 className="mt-5 text-center text-xl font-bold text-gray-900">
              Cancel Ride?
            </h3>

            {/* Description */}

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Are you sure you want to
              cancel this ride
              request?
            </p>

            {/* Ride ID */}

            <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Ride ID
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800">
                #{rideId}
              </p>
            </div>

            {/* Buttons */}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={
                  closeCancelModal
                }
                disabled={
                  isCancelling
                }
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                No, Keep Ride
              </button>

              <button
                type="button"
                onClick={
                  handleCancelRide
                }
                disabled={
                  isCancelling
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCancelling ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Cancelling
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}