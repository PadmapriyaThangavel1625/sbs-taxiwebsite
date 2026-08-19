"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Home,
  BriefcaseBusiness,
  MapPin,
  Plus,
  X,
  Loader2,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Trash2,
  LocateFixed,
} from "lucide-react";

import toast from "react-hot-toast";

/* ============================================================
   TYPES
============================================================ */

interface PassengerUser {
  id?: number | string;
  name?: string;
  mobile?: string;
  email?: string;
  status?: string;
}

interface SavedPlace {
  id?: number | string;
  address_id?: number | string;
  user_id?: number | string;

  address_type?:
    | "home"
    | "work"
    | "other"
    | string;

  address?: string;

  latitude?:
    | number
    | string
    | null;

  longitude?:
    | number
    | string
    | null;

  created_at?: string;
  updated_at?: string;
}

type AddressType =
  | "home"
  | "work"
  | "other";

/* ============================================================
   HELPERS
============================================================ */

function getAddressId(
  place: SavedPlace
) {
  return (
    place.address_id ??
    place.id ??
    ""
  );
}

function getAddressType(
  place: SavedPlace
): AddressType {
  const type =
    String(
      place.address_type || "other"
    ).toLowerCase();

  if (
    type === "home" ||
    type === "work"
  ) {
    return type;
  }

  return "other";
}

/* ============================================================
   PAGE
============================================================ */

export default function SavedPlacePage() {
  /* ==========================================================
     STATE
  ========================================================== */

  const [user, setUser] =
    useState<PassengerUser | null>(
      null
    );

  const [places, setPlaces] =
    useState<SavedPlace[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [locating, setLocating] =
    useState(false);

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [error, setError] =
    useState("");

  const [addressType, setAddressType] =
    useState<AddressType>("home");

  const [address, setAddress] =
    useState("");

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  /* ==========================================================
     READ LOGGED-IN USER
     
     IMPORTANT:
     localStorage is accessed only inside useEffect.
     This prevents hydration mismatch.
  ========================================================== */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "sbs_user"
        );

      if (!storedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const parsedUser =
        JSON.parse(storedUser);

      if (
        !parsedUser ||
        !parsedUser.id
      ) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "SBS USER READ ERROR:",
        error
      );

      setUser(null);
    }
  }, []);

  /* ==========================================================
     LOAD SAVED PLACES
  ========================================================== */

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    loadPlaces(
      String(user.id)
    );
  }, [user?.id]);

  /* ==========================================================
     FETCH PLACES
  ========================================================== */

  async function loadPlaces(
    userId: string
  ) {
    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          `/api/passenger/saved-places?user_id=${encodeURIComponent(
            userId
          )}`,
          {
            method: "GET",
            headers: {
              Accept:
                "application/json",
            },
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      console.log(
        "SBS SAVED PLACES:",
        result
      );

      if (
        !response.ok ||
        result?.success !== true
      ) {
        throw new Error(
          result?.message ||
            "Unable to load saved places."
        );
      }

      /*
       * API may return:
       * data: [...]
       *
       * Keep this flexible in case backend
       * wraps the array.
       */

      let data =
        result?.data;

      if (!Array.isArray(data)) {
        if (
          Array.isArray(
            result?.data?.addresses
          )
        ) {
          data =
            result.data.addresses;
        } else if (
          Array.isArray(
            result?.data?.places
          )
        ) {
          data =
            result.data.places;
        } else {
          data = [];
        }
      }

      setPlaces(data);
    } catch (error) {
      console.error(
        "LOAD SAVED PLACES ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to load saved places.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     GET CURRENT LOCATION
  ========================================================== */

  function getCurrentLocation() {
    if (
      typeof navigator ===
      "undefined"
    ) {
      return;
    }

    if (
      !navigator.geolocation
    ) {
      toast.error(
        "Location is not supported by your browser."
      );

      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        toast.success(
          "Current location detected."
        );

        setLocating(false);
      },
      (error) => {
        console.error(
          "LOCATION ERROR:",
          error
        );

        let message =
          "Unable to get your location.";

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          message =
            "Location permission was denied.";
        }

        if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          message =
            "Your location is currently unavailable.";
        }

        if (
          error.code ===
          error.TIMEOUT
        ) {
          message =
            "Location request timed out.";
        }

        toast.error(message);

        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  /* ==========================================================
     ADD PLACE
  ========================================================== */

  async function handleAddPlace(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user?.id) {
      toast.error(
        "Please sign in to save a place."
      );

      return;
    }

    const cleanAddress =
      address.trim();

    if (!cleanAddress) {
      toast.error(
        "Please enter an address."
      );

      return;
    }

    if (
      latitude === null ||
      longitude === null
    ) {
      toast.error(
        "Please detect your location before saving."
      );

      return;
    }

    setSaving(true);

    try {
      const response =
        await fetch(
          "/api/passenger/saved-places",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },

            body: JSON.stringify({
              user_id: Number(
                user.id
              ),

              address_type:
                addressType,

              address:
                cleanAddress,

              latitude,

              longitude,
            }),
          }
        );

      const result =
        await response.json();

      console.log(
        "SBS ADD ADDRESS RESPONSE:",
        result
      );

      if (
        !response.ok ||
        result?.success !== true
      ) {
        throw new Error(
          result?.message ||
            "Unable to save address."
        );
      }

      toast.success(
        "Place saved successfully."
      );

      /* ------------------------------------------------------
         RESET FORM
      ------------------------------------------------------ */

      setAddress("");
      setLatitude(null);
      setLongitude(null);

      setShowAddForm(false);

      /* ------------------------------------------------------
         RELOAD
      ------------------------------------------------------ */

      await loadPlaces(
        String(user.id)
      );
    } catch (error) {
      console.error(
        "ADD SAVED PLACE ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to save place.";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  /* ==========================================================
     CLOSE FORM
  ========================================================== */

  function closeForm() {
    if (saving) {
      return;
    }

    setShowAddForm(false);
    setAddress("");
    setLatitude(null);
    setLongitude(null);
    setAddressType("home");
  }

  /* ==========================================================
     PLACE ICON
  ========================================================== */

  function PlaceIcon({
    type,
  }: {
    type: AddressType;
  }) {
    if (type === "home") {
      return (
        <Home className="h-5 w-5" />
      );
    }

    if (type === "work") {
      return (
        <BriefcaseBusiness className="h-5 w-5" />
      );
    }

    return (
      <MapPin className="h-5 w-5" />
    );
  }

  /* ==========================================================
     PLACE LABEL
  ========================================================== */

  function placeLabel(
    type: AddressType
  ) {
    if (type === "home") {
      return "Home";
    }

    if (type === "work") {
      return "Work";
    }

    return "Other";
  }

  /* ==========================================================
     SORT PLACES
  ========================================================== */

  const sortedPlaces =
    useMemo(() => {
      const order: Record<
        AddressType,
        number
      > = {
        home: 1,
        work: 2,
        other: 3,
      };

      return [...places].sort(
        (a, b) =>
          order[
            getAddressType(a)
          ] -
          order[
            getAddressType(b)
          ]
      );
    }, [places]);

  /* ==========================================================
     LOADING USER
  ========================================================== */

  if (
    loading &&
    !user
  ) {
    return (
      <main
        className="
          min-h-[calc(100vh-80px)]
          bg-[var(--background)]
          py-8
          sm:py-10
          lg:py-12
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              min-h-[400px]
              items-center
              justify-center
            "
          >
            <Loader2
              className="
                h-8
                w-8
                animate-spin
                text-[var(--primary)]
              "
            />
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     NOT LOGGED IN
  ========================================================== */

  if (!user) {
    return (
      <main
        className="
          min-h-[calc(100vh-80px)]
          bg-[var(--background)]
          py-8
          sm:py-10
          lg:py-12
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              max-w-md
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-6
              text-center
              shadow-sm
              sm:p-8
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[var(--surface-secondary)]
              "
            >
              <MapPin
                className="
                  h-6
                  w-6
                  text-[var(--primary)]
                "
              />
            </div>

            <h1
              className="
                mt-5
                text-xl
                font-bold
                text-[var(--foreground)]
              "
            >
              Sign in to view saved places
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[var(--gray-500)]
              "
            >
              Save your Home, Work and
              favourite locations for faster
              booking.
            </p>

            <a
              href="/signin"
              className="
                mt-6
                inline-flex
                h-11
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                px-6
                text-sm
                font-bold
                text-white
                transition
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              Sign In
            </a>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main
      className="
        min-h-[calc(100vh-80px)]
        bg-[var(--background)]
        py-7
        pb-24
        sm:py-10
        sm:pb-24
        lg:py-12
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
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
                mb-2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[var(--surface-secondary)]
                px-3
                py-1.5
                text-xs
                font-semibold
                text-[var(--primary)]
              "
            >
              <MapPin className="h-3.5 w-3.5" />
              Saved Locations
            </div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-[var(--foreground)]
                sm:text-4xl
              "
              style={{
                fontFamily:
                  "var(--font-instrument)",
              }}
            >
              My Saved Places
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-[var(--gray-500)]
                sm:text-base
              "
            >
              Save your frequently used
              locations and make your next
              SBS Taxi booking faster.
            </p>
          </div>

          {/* ADD BUTTON */}

          <button
            type="button"
            onClick={() =>
              setShowAddForm(true)
            }
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[var(--primary)]
              px-5
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-lg
              sm:shrink-0
            "
          >
            <Plus className="h-4 w-4" />
            Add Place
          </button>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            <AlertCircle
              className="
                mt-0.5
                h-5
                w-5
                shrink-0
              "
            />

            <div className="flex-1">
              {error}
            </div>

            <button
              type="button"
              onClick={() =>
                loadPlaces(
                  String(user.id)
                )
              }
              className="
                shrink-0
                font-semibold
                underline
              "
            >
              Retry
            </button>
          </div>
        )}

        {/* ====================================================
            ADD FORM
        ==================================================== */}

        {showAddForm && (
          <div
            className="
              mt-6
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              shadow-lg
            "
          >
            {/* FORM HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-4
                py-4
                sm:px-6
              "
            >
              <div>
                <h2
                  className="
                    text-base
                    font-bold
                    text-[var(--foreground)]
                    sm:text-lg
                  "
                >
                  Add Saved Place
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[var(--gray-500)]
                    sm:text-sm
                  "
                >
                  Save a frequently used
                  location.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-[var(--gray-500)]
                  transition
                  hover:bg-[var(--surface-secondary)]
                  hover:text-[var(--foreground)]
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleAddPlace}
              className="p-4 sm:p-6"
            >
              {/* ADDRESS TYPE */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-[var(--gray-700)]
                    sm:text-sm
                  "
                >
                  Place Type
                </label>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-2
                    sm:max-w-md
                    sm:gap-3
                  "
                >
                  {(
                    [
                      "home",
                      "work",
                      "other",
                    ] as AddressType[]
                  ).map((type) => {
                    const selected =
                      addressType === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setAddressType(
                            type
                          )
                        }
                        className={`
                          flex
                          min-h-[76px]
                          flex-col
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          px-2
                          py-3
                          transition-all
                          duration-200
                          ${
                            selected
                              ? "border-[var(--primary)] bg-[var(--surface-secondary)] text-[var(--primary)] shadow-sm"
                              : "border-[var(--border)] text-[var(--gray-500)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                          }
                        `}
                      >
                        <PlaceIcon
                          type={type}
                        />

                        <span
                          className="
                            text-xs
                            font-bold
                          "
                        >
                          {placeLabel(
                            type
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ADDRESS */}

              <div className="mt-5">
                <label
                  htmlFor="saved-address"
                  className="
                    mb-2
                    block
                    text-xs
                    font-bold
                    text-[var(--gray-700)]
                    sm:text-sm
                  "
                >
                  Address
                </label>

                <textarea
                  id="saved-address"
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target.value
                    )
                  }
                  placeholder="Enter your complete address"
                  rows={4}
                  disabled={saving}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface-secondary)]
                    px-4
                    py-3
                    text-sm
                    text-[var(--foreground)]
                    outline-none
                    transition
                    placeholder:text-[var(--gray-400)]
                    focus:border-[var(--primary)]
                    focus:ring-4
                    focus:ring-[var(--primary)]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {/* LOCATION */}

              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
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
                        rounded-full
                        bg-[var(--primary)]/10
                        text-[var(--primary)]
                      "
                    >
                      <Navigation className="h-5 w-5" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-bold
                          text-[var(--foreground)]
                        "
                      >
                        Location
                      </p>

                      {latitude !==
                        null &&
                      longitude !==
                        null ? (
                        <p
                          className="
                            mt-1
                            text-xs
                            text-[var(--success)]
                          "
                        >
                          Location detected
                          successfully
                        </p>
                      ) : (
                        <p
                          className="
                            mt-1
                            text-xs
                            leading-5
                            text-[var(--gray-500)]
                          "
                        >
                          Your location is
                          required to save
                          this place.
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={
                      getCurrentLocation
                    }
                    disabled={
                      locating ||
                      saving
                    }
                    className="
                      inline-flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-[var(--primary)]
                      px-4
                      text-xs
                      font-bold
                      text-[var(--primary)]
                      transition
                      hover:bg-[var(--primary)]
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {locating ? (
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />
                    ) : (
                      <LocateFixed className="h-4 w-4" />
                    )}

                    {locating
                      ? "Detecting..."
                      : "Use Current Location"}
                  </button>
                </div>

                {latitude !==
                  null &&
                  longitude !==
                    null && (
                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        text-[var(--gray-500)]
                        sm:text-xs
                      "
                    >
                      <CheckCircle2
                        className="
                          h-3.5
                          w-3.5
                          text-[var(--success)]
                        "
                      />

                      <span>
                        {latitude.toFixed(
                          6
                        )}
                        ,{" "}
                        {longitude.toFixed(
                          6
                        )}
                      </span>
                    </div>
                  )}
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-5
                  flex
                  flex-col-reverse
                  gap-2
                  sm:flex-row
                  sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="
                    h-11
                    rounded-xl
                    border
                    border-[var(--border)]
                    px-5
                    text-sm
                    font-semibold
                    text-[var(--gray-600)]
                    transition
                    hover:bg-[var(--surface-secondary)]
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    !address.trim() ||
                    latitude ===
                      null ||
                    longitude ===
                      null
                  }
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--primary)]
                    px-6
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {saving && (
                    <Loader2
                      className="
                        h-4
                        w-4
                        animate-spin
                      "
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Place"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ====================================================
            SAVED PLACES
        ==================================================== */}

        <section className="mt-8 sm:mt-10">
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-[var(--foreground)]
                  sm:text-xl
                "
              >
                Your Places
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[var(--gray-500)]
                  sm:text-sm
                "
              >
                {places.length} saved{" "}
                {places.length === 1
                  ? "place"
                  : "places"}
              </p>
            </div>

            {loading &&
              user && (
                <Loader2
                  className="
                    h-5
                    w-5
                    animate-spin
                    text-[var(--primary)]
                  "
                />
              )}
          </div>

          {/* LOADING */}

          {loading && (
            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      h-40
                      animate-pulse
                      rounded-2xl
                      bg-[var(--surface-secondary)]
                    "
                  />
                )
              )}
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            places.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-6
                  py-12
                  text-center
                  sm:py-16
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--surface-secondary)]
                    text-[var(--primary)]
                  "
                >
                  <MapPin className="h-6 w-6" />
                </div>

                <h3
                  className="
                    mt-5
                    text-base
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  No saved places yet
                </h3>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-[var(--gray-500)]
                  "
                >
                  Add your Home, Work or
                  favourite location to make
                  your future SBS Taxi bookings
                  faster.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddForm(
                      true
                    )
                  }
                  className="
                    mt-5
                    inline-flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    bg-[var(--primary)]
                    px-5
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Place
                </button>
              </div>
            )}

          {/* PLACES */}

          {!loading &&
            sortedPlaces.length >
              0 && (
              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {sortedPlaces.map(
                  (place) => {
                    const type =
                      getAddressType(
                        place
                      );

                    const id =
                      getAddressId(
                        place
                      );

                    return (
                      <article
                        key={String(
                          id ||
                            `${type}-${place.address}`
                        )}
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-2xl
                          border
                          border-[var(--border)]
                          bg-[var(--surface)]
                          p-5
                          shadow-sm
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:shadow-lg
                        "
                      >
                        {/* TOP */}

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-3
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
                                bg-[var(--surface-secondary)]
                                text-[var(--primary)]
                              "
                            >
                              <PlaceIcon
                                type={
                                  type
                                }
                              />
                            </div>

                            <div className="min-w-0">
                              <h3
                                className="
                                  truncate
                                  text-sm
                                  font-bold
                                  text-[var(--foreground)]
                                "
                              >
                                {placeLabel(
                                  type
                                )}
                              </h3>

                              <p
                                className="
                                  mt-0.5
                                  text-[10px]
                                  font-medium
                                  uppercase
                                  tracking-wide
                                  text-[var(--gray-400)]
                                "
                              >
                                Saved place
                              </p>
                            </div>
                          </div>

                          <span
                            className="
                              shrink-0
                              rounded-full
                              bg-[var(--surface-secondary)]
                              px-2.5
                              py-1
                              text-[10px]
                              font-bold
                              text-[var(--primary)]
                            "
                          >
                            {placeLabel(
                              type
                            )}
                          </span>
                        </div>

                        {/* ADDRESS */}

                        <div
                          className="
                            mt-5
                            flex
                            items-start
                            gap-2
                          "
                        >
                          <MapPin
                            className="
                              mt-0.5
                              h-4
                              w-4
                              shrink-0
                              text-[var(--gray-400)]
                            "
                          />

                          <p
                            className="
                              line-clamp-3
                              text-sm
                              leading-6
                              text-[var(--gray-600)]
                            "
                          >
                            {place.address ||
                              "Address not available"}
                          </p>
                        </div>

                        {/* COORDINATES */}

                        {place.latitude !==
                          null &&
                          place.latitude !==
                            undefined &&
                          place.longitude !==
                            null &&
                          place.longitude !==
                            undefined && (
                            <div
                              className="
                                mt-4
                                flex
                                items-center
                                gap-2
                                border-t
                                border-[var(--border-light)]
                                pt-3
                                text-[10px]
                                text-[var(--gray-400)]
                              "
                            >
                              <Navigation className="h-3 w-3" />

                              <span>
                                {Number(
                                  place.latitude
                                ).toFixed(
                                  5
                                )}
                                ,{" "}
                                {Number(
                                  place.longitude
                                ).toFixed(
                                  5
                                )}
                              </span>
                            </div>
                          )}

                        {/* NOTE
                            Delete is intentionally not connected
                            because you only provided:
                            addresses.php
                            add-address.php

                            There is no delete-address.php API.
                        */}
                      </article>
                    );
                  }
                )}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}