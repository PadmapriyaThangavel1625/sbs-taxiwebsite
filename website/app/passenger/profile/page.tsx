"use client";

import {
  ChangeEvent,
  PointerEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  Camera,
  Pencil,
  Check,
  X,
  Loader2,
  ShieldCheck,
  ArrowLeft,
  ZoomIn,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { project_url } from "@/config/project_path";

/* ============================================================
   TYPES
============================================================ */

interface PassengerUser {
  id?: string | number;
  name?: string;
  mobile?: string;
  phone?: string;
  email?: string;
  profile_image?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProfileApiResponse {
  success?: boolean;
  message?: string;
  data?: PassengerUser | null;
}

interface CropPosition {
  x: number;
  y: number;
}

interface ImageNaturalSize {
  width: number;
  height: number;
}

/* ============================================================
   CONSTANTS
============================================================ */

const CROP_OUTPUT_SIZE = 512;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/* ============================================================
   PROFILE IMAGE URL
============================================================ */

function getProfileImageUrl(
  profileImage?: string | null
): string {
  if (!profileImage) {
    return "";
  }

  if (
    profileImage.startsWith("http://") ||
    profileImage.startsWith("https://")
  ) {
    return profileImage;
  }

  const cleanPath = profileImage.replace(/^\/+/, "");

  return `${project_url}/${cleanPath}`;
}

/* ============================================================
   INITIALS
============================================================ */

function getInitials(name?: string): string {
  if (!name?.trim()) {
    return "P";
  }

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return (
    parts[0].slice(0, 1) +
    parts[parts.length - 1].slice(0, 1)
  ).toUpperCase();
}

/* ============================================================
   PAGE
============================================================ */

export default function PassengerProfilePage() {
  const router = useRouter();

  /* ==========================================================
     PROFILE STATE
  ========================================================== */

  const [user, setUser] =
    useState<PassengerUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ==========================================================
     FORM STATE
  ========================================================== */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [editing, setEditing] =
    useState(false);

  /* ==========================================================
     IMAGE STATE
  ========================================================== */

  const [profileImage, setProfileImage] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState("");

  const [cropOpen, setCropOpen] =
    useState(false);

  const [zoom, setZoom] =
    useState(1);

  const [cropPosition, setCropPosition] =
    useState<CropPosition>({
      x: 0,
      y: 0,
    });

  const [baseScale, setBaseScale] =
    useState(1);

  const [imageNaturalSize, setImageNaturalSize] =
    useState<ImageNaturalSize>({
      width: 0,
      height: 0,
    });

  const [cropBoxSize, setCropBoxSize] =
    useState(320);

  const [dragging, setDragging] =
    useState(false);

  /* ==========================================================
     REFS
  ========================================================== */

  const dragStart = useRef({
    x: 0,
    y: 0,
    imageX: 0,
    imageY: 0,
  });

  const cropBoxRef =
    useRef<HTMLDivElement | null>(null);

  const imageRef =
    useRef<HTMLImageElement | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  /* ==========================================================
     FETCH PROFILE
  ========================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        /* -----------------------------------------------
           GET USER ID
        ------------------------------------------------ */

        const storedUser =
          localStorage.getItem("sbs_user");

        let userId = "";

        if (storedUser) {
          try {
            const parsed =
              JSON.parse(storedUser);

            userId = String(
              parsed?.id || ""
            );
          } catch {
            userId = "";
          }
        }

        if (!userId) {
          userId =
            localStorage.getItem(
              "sbs_user_id"
            ) || "";
        }

        if (!userId) {
          router.replace("/signin");
          return;
        }

        /* -----------------------------------------------
           NEXT.JS PROFILE API
        ------------------------------------------------ */

        const response = await fetch(
          `/api/passenger/profile?user_id=${encodeURIComponent(
            userId
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        const result: ProfileApiResponse =
          await response.json();

        if (
          !response.ok ||
          result.success !== true ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Unable to load profile."
          );
        }

        if (!mounted) {
          return;
        }

        const profile = result.data;

        setUser(profile);
        setName(profile.name || "");
        setEmail(profile.email || "");

        setProfileImage(
          getProfileImageUrl(
            profile.profile_image
          )
        );

        /* -----------------------------------------------
           SYNC LOCAL STORAGE
        ------------------------------------------------ */

        localStorage.setItem(
          "sbs_user",
          JSON.stringify(profile)
        );

        localStorage.setItem(
          "sbs_user_id",
          String(
            profile.id || userId
          )
        );

        localStorage.setItem(
          "sbs_user_name",
          profile.name || ""
        );

        localStorage.setItem(
          "sbs_user_mobile",
          profile.mobile ||
            profile.phone ||
            ""
        );

        localStorage.setItem(
          "sbs_user_email",
          profile.email || ""
        );

        localStorage.setItem(
          "sbs_user_status",
          profile.status || ""
        );
      } catch (error) {
        console.error(
          "SBS PROFILE LOAD ERROR:",
          error
        );

        if (!mounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load profile.";

        setError(message);
        toast.error(message);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  /* ==========================================================
     CROP BOX SIZE
  ========================================================== */

  useEffect(() => {
    if (!cropOpen) {
      return;
    }

    const updateSize = () => {
      if (!cropBoxRef.current) {
        return;
      }

      setCropBoxSize(
        cropBoxRef.current.clientWidth
      );
    };

    updateSize();

    window.addEventListener(
      "resize",
      updateSize
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateSize
      );
    };
  }, [cropOpen]);

  /* ==========================================================
     IMAGE SELECT
  ========================================================== */

  function handleImageSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please select JPG, PNG or WEBP image."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(
        "Profile image must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result =
        typeof reader.result === "string"
          ? reader.result
          : "";

      if (!result) {
        toast.error(
          "Unable to read selected image."
        );
        return;
      }

      setSelectedImage(result);

      setZoom(1);

      setCropPosition({
        x: 0,
        y: 0,
      });

      setImageNaturalSize({
        width: 0,
        height: 0,
      });

      setCropOpen(true);
    };

    reader.onerror = () => {
      toast.error(
        "Unable to read selected image."
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  }

  /* ==========================================================
     IMAGE LOAD
  ========================================================== */

  function handleCropImageLoad(
    event: SyntheticEvent<HTMLImageElement>
  ) {
    const image =
      event.currentTarget;

    const naturalWidth =
      image.naturalWidth;

    const naturalHeight =
      image.naturalHeight;

    if (
      !naturalWidth ||
      !naturalHeight
    ) {
      return;
    }

    const boxSize =
      cropBoxRef.current
        ?.clientWidth ||
      cropBoxSize ||
      320;

    const scale = Math.max(
      boxSize / naturalWidth,
      boxSize / naturalHeight
    );

    const displayWidth =
      naturalWidth * scale;

    const displayHeight =
      naturalHeight * scale;

    const initialX =
      (boxSize - displayWidth) / 2;

    const initialY =
      (boxSize - displayHeight) / 2;

    setImageNaturalSize({
      width: naturalWidth,
      height: naturalHeight,
    });

    setBaseScale(scale);

    setZoom(1);

    setCropPosition({
      x: initialX,
      y: initialY,
    });
  }

  /* ==========================================================
     CURRENT SCALE
  ========================================================== */

  const currentScale =
    baseScale * zoom;

  const displayWidth =
    imageNaturalSize.width *
    currentScale;

  const displayHeight =
    imageNaturalSize.height *
    currentScale;

  /* ==========================================================
     CLAMP POSITION
  ========================================================== */

  function clampPosition(
    x: number,
    y: number,
    scale = currentScale
  ): CropPosition {
    const width =
      imageNaturalSize.width *
      scale;

    const height =
      imageNaturalSize.height *
      scale;

    const minX =
      cropBoxSize - width;

    const minY =
      cropBoxSize - height;

    return {
      x: Math.min(
        0,
        Math.max(minX, x)
      ),
      y: Math.min(
        0,
        Math.max(minY, y)
      ),
    };
  }

  /* ==========================================================
     POINTER DOWN
  ========================================================== */

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      !imageNaturalSize.width ||
      !imageNaturalSize.height
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    setDragging(true);

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      imageX: cropPosition.x,
      imageY: cropPosition.y,
    };
  }

  /* ==========================================================
     POINTER MOVE
  ========================================================== */

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!dragging) {
      return;
    }

    const deltaX =
      event.clientX -
      dragStart.current.x;

    const deltaY =
      event.clientY -
      dragStart.current.y;

    const next =
      clampPosition(
        dragStart.current.imageX +
          deltaX,
        dragStart.current.imageY +
          deltaY
      );

    setCropPosition(next);
  }

  /* ==========================================================
     POINTER UP
  ========================================================== */

  function handlePointerUp() {
    setDragging(false);
  }

  /* ==========================================================
     RESET CROP
  ========================================================== */

  function resetCrop() {
    if (
      !imageNaturalSize.width ||
      !imageNaturalSize.height
    ) {
      return;
    }

    const scale = Math.max(
      cropBoxSize /
        imageNaturalSize.width,
      cropBoxSize /
        imageNaturalSize.height
    );

    const width =
      imageNaturalSize.width *
      scale;

    const height =
      imageNaturalSize.height *
      scale;

    setBaseScale(scale);
    setZoom(1);

    setCropPosition({
      x: (cropBoxSize - width) / 2,
      y: (cropBoxSize - height) / 2,
    });
  }

  /* ==========================================================
     CREATE CROPPED IMAGE
  ========================================================== */

  function createCroppedImage(): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        if (!selectedImage) {
          reject(
            new Error(
              "No image selected."
            )
          );
          return;
        }

        const image =
          imageRef.current;

        if (!image) {
          reject(
            new Error(
              "Image is not ready."
            )
          );
          return;
        }

        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width =
          CROP_OUTPUT_SIZE;

        canvas.height =
          CROP_OUTPUT_SIZE;

        const context =
          canvas.getContext("2d");

        if (!context) {
          reject(
            new Error(
              "Unable to create image canvas."
            )
          );
          return;
        }

        /*
         * Crop the entire square preview.
         */

        const sourceX =
          Math.max(
            0,
            -cropPosition.x /
              currentScale
          );

        const sourceY =
          Math.max(
            0,
            -cropPosition.y /
              currentScale
          );

        const sourceSize =
          cropBoxSize /
          currentScale;

        const maxSourceSize =
          Math.min(
            image.naturalWidth -
              sourceX,
            image.naturalHeight -
              sourceY
          );

        const finalSourceSize =
          Math.min(
            sourceSize,
            maxSourceSize
          );

        context.clearRect(
          0,
          0,
          CROP_OUTPUT_SIZE,
          CROP_OUTPUT_SIZE
        );

        context.imageSmoothingEnabled =
          true;

        context.imageSmoothingQuality =
          "high";

        context.drawImage(
          image,
          sourceX,
          sourceY,
          finalSourceSize,
          finalSourceSize,
          0,
          0,
          CROP_OUTPUT_SIZE,
          CROP_OUTPUT_SIZE
        );

        const output =
          canvas.toDataURL(
            "image/jpeg",
            0.88
          );

        if (!output) {
          reject(
            new Error(
              "Unable to create cropped image."
            )
          );
          return;
        }

        resolve(output);
      }
    );
  }

  /* ==========================================================
     APPLY CROP
  ========================================================== */

  async function applyCrop() {
    try {
      const cropped =
        await createCroppedImage();

      setProfileImage(cropped);

      setCropOpen(false);

      setSelectedImage("");

      toast.success(
        "Profile photo cropped successfully."
      );
    } catch (error) {
      console.error(
        "SBS IMAGE CROP ERROR:",
        error
      );

      toast.error(
        "Unable to crop image."
      );
    }
  }

  /* ==========================================================
     CANCEL CROP
  ========================================================== */

  function cancelCrop() {
    setCropOpen(false);
    setSelectedImage("");
  }

  /* ==========================================================
     SAVE PROFILE
  ========================================================== */

  async function handleSave() {
    if (!user?.id) {
      toast.error(
        "User information not available."
      );
      return;
    }

    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim();

    if (!cleanName) {
      toast.error(
        "Please enter your name."
      );
      return;
    }

    if (
      cleanEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      toast.error(
        "Please enter a valid email address."
      );
      return;
    }

    setSaving(true);

    try {
      const body: Record<
        string,
        string | number
      > = {
        user_id: Number(user.id),
        name: cleanName,
        email: cleanEmail,
      };

      /*
       * Only send Base64 when a new image
       * has been selected and cropped.
       */

      if (
        profileImage &&
        profileImage.startsWith(
          "data:image/"
        )
      ) {
        body.profile_image =
          profileImage;
      }

      const response =
        await fetch(
          "/api/passenger/profile",
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify(body),
          }
        );

      const result: ProfileApiResponse =
        await response.json();

      console.log(
        "SBS PROFILE UPDATE RESPONSE:",
        result
      );

      if (
        !response.ok ||
        result.success !== true ||
        !result.data
      ) {
        throw new Error(
          result.message ||
            "Unable to update profile."
        );
      }

      const updatedUser =
        result.data;

      /* -----------------------------------------------
         UPDATE STATE
      ------------------------------------------------ */

      setUser(updatedUser);

      setName(
        updatedUser.name || ""
      );

      setEmail(
        updatedUser.email || ""
      );

      setProfileImage(
        getProfileImageUrl(
          updatedUser.profile_image
        )
      );

      setEditing(false);

      /* -----------------------------------------------
         UPDATE LOCAL STORAGE
      ------------------------------------------------ */

      localStorage.setItem(
        "sbs_user",
        JSON.stringify(
          updatedUser
        )
      );

      localStorage.setItem(
        "sbs_user_id",
        String(
          updatedUser.id ||
            user.id
        )
      );

      localStorage.setItem(
        "sbs_user_name",
        updatedUser.name || ""
      );

      localStorage.setItem(
        "sbs_user_mobile",
        updatedUser.mobile ||
          updatedUser.phone ||
          ""
      );

      localStorage.setItem(
        "sbs_user_email",
        updatedUser.email || ""
      );

      localStorage.setItem(
        "sbs_user_status",
        updatedUser.status || ""
      );

      /* -----------------------------------------------
         NOTIFY NAVBAR
      ------------------------------------------------ */

      window.dispatchEvent(
        new Event(
          "sbs-auth-change"
        )
      );

      toast.success(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "SBS PROFILE UPDATE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ==========================================================
     CANCEL EDIT
  ========================================================== */

  function cancelEdit() {
    setName(
      user?.name || ""
    );

    setEmail(
      user?.email || ""
    );

    setProfileImage(
      getProfileImageUrl(
        user?.profile_image
      )
    );

    setEditing(false);
  }

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-[calc(100vh-80px)]
          items-center
          justify-center
          px-4
          py-10
        "
        style={{
          background:
            "var(--background)",
        }}
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
            "
            style={{
              background:
                "var(--surface-secondary)",
              border:
                "1px solid var(--border)",
            }}
          >
            <Loader2
              className="
                h-6
                w-6
                animate-spin
              "
              style={{
                color:
                  "var(--primary)",
              }}
            />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-medium
            "
            style={{
              color:
                "var(--gray-500)",
            }}
          >
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  /* ==========================================================
     PROFILE ERROR
  ========================================================== */

  if (!user) {
    return (
      <main
        className="
          flex
          min-h-[calc(100vh-80px)]
          items-center
          justify-center
          px-4
        "
        style={{
          background:
            "var(--background)",
        }}
      >
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            p-6
            text-center
          "
          style={{
            background:
              "var(--surface)",
            border:
              "1px solid var(--border)",
          }}
        >
          <AlertCircle
            className="
              mx-auto
              h-10
              w-10
            "
            style={{
              color:
                "var(--danger)",
            }}
          />

          <h2
            className="
              mt-4
              text-xl
              font-bold
            "
            style={{
              color:
                "var(--foreground)",
            }}
          >
            Profile unavailable
          </h2>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color:
                "var(--gray-500)",
            }}
          >
            {error ||
              "Please sign in again."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/signin"
              )
            }
            className="
              mt-6
              rounded-xl
              px-5
              py-3
              text-sm
              font-bold
              text-white
              transition
              hover:-translate-y-0.5
            "
            style={{
              background:
                "var(--primary)",
            }}
          >
            Go to Sign In
          </button>
        </div>
      </main>
    );
  }

  /* ==========================================================
     DISPLAY DATA
  ========================================================== */

  const mobile =
    user.mobile ||
    user.phone ||
    "";

  const displayImage =
    profileImage || "";

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <>
      <main
        className="
          min-h-[calc(100vh-80px)]
          py-8
          sm:py-10
          lg:py-12
        "
        style={{
          background:
            "var(--background)",
        }}
      >
        {/* =====================================================
            EXACT SITE-WIDE CONTAINER
        ====================================================== */}

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
          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:mb-8
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <button
                type="button"
                onClick={() =>
                  router.back()
                }
                className="
                  mb-3
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  transition
                  hover:underline
                  sm:text-sm
                "
                style={{
                  color:
                    "var(--primary)",
                }}
              >
                <ArrowLeft
                  className="h-4 w-4"
                />
                Back
              </button>

              <h1
                className="
                  text-3xl
                  leading-tight
                  tracking-tight
                  sm:text-4xl
                "
                style={{
                  fontFamily:
                    "var(--font-instrument)",
                  color:
                    "var(--foreground)",
                }}
              >
                My Profile
              </h1>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  sm:text-sm
                "
                style={{
                  fontFamily:
                    "var(--font-jakarta)",
                  color:
                    "var(--gray-500)",
                }}
              >
                Manage your SBS Taxi account
                information.
              </p>
            </div>

            {/* ==================================================
                ACTIONS
            ================================================== */}

            {!editing ? (
              <button
                type="button"
                onClick={() =>
                  setEditing(true)
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
                style={{
                  background:
                    "var(--primary)",
                }}
              >
                <Pencil
                  className="h-4 w-4"
                />
                Edit Profile
              </button>
            ) : (
              <div
                className="
                  flex
                  gap-2
                "
              >
                <button
                  type="button"
                  onClick={
                    cancelEdit
                  }
                  disabled={saving}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    px-4
                    text-sm
                    font-semibold
                    transition
                    disabled:opacity-50
                  "
                  style={{
                    background:
                      "var(--surface)",
                    borderColor:
                      "var(--border)",
                    color:
                      "var(--gray-700)",
                  }}
                >
                  <X
                    className="h-4 w-4"
                  />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleSave
                  }
                  disabled={saving}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                  style={{
                    background:
                      "var(--primary)",
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check
                        className="h-4 w-4"
                      />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              PROFILE CARD
          ================================================== */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              shadow-lg
            "
            style={{
              background:
                "var(--surface)",
              border:
                "1px solid var(--border)",
            }}
          >
            {/* =================================================
                ACCENT
            ================================================= */}

            <div
              className="
                h-1.5
                w-full
              "
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--secondary))",
              }}
            />

            {/* =================================================
                PROFILE HERO
            ================================================= */}

            <div
              className="
                p-5
                sm:p-8
                lg:p-10
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-6
                  sm:flex-row
                  sm:items-center
                "
              >
                {/* ============================================
                    PROFILE PHOTO
                ============================================= */}

                <div className="relative shrink-0">
                  <div
                    className="
                      flex
                      h-28
                      w-28
                      overflow-hidden
                      rounded-full
                      sm:h-32
                      sm:w-32
                    "
                    style={{
                      background:
                        "var(--surface-secondary)",
                      border:
                        "4px solid var(--surface)",
                      boxShadow:
                        "0 0 0 1px var(--border)",
                    }}
                  >
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={
                          user.name ||
                          "Profile"
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          text-3xl
                          font-bold
                        "
                        style={{
                          background:
                            "var(--primary)",
                          color:
                            "var(--secondary)",
                        }}
                      >
                        {getInitials(
                          user.name
                        )}
                      </div>
                    )}
                  </div>

                  {editing && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        disabled={saving}
                        className="
                          absolute
                          bottom-0
                          right-0
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          shadow-md
                          transition
                          hover:scale-105
                          disabled:opacity-50
                        "
                        style={{
                          background:
                            "var(--secondary)",
                          color:
                            "#000",
                          borderColor:
                            "var(--surface)",
                        }}
                        aria-label="Change profile photo"
                      >
                        <Camera
                          className="h-4 w-4"
                        />
                      </button>

                      <input
                        ref={
                          fileInputRef
                        }
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageSelect
                        }
                        className="hidden"
                      />
                    </>
                  )}
                </div>

                {/* ============================================
                    USER SUMMARY
                ============================================= */}

                <div
                  className="
                    min-w-0
                    flex-1
                    text-center
                    sm:text-left
                  "
                >
                  <h2
                    className="
                      truncate
                      text-xl
                      font-bold
                      sm:text-2xl
                    "
                    style={{
                      color:
                        "var(--foreground)",
                    }}
                  >
                    {user.name ||
                      "Passenger"}
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                    "
                    style={{
                      color:
                        "var(--gray-500)",
                    }}
                  >
                    SBS Taxi Passenger
                  </p>

                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      justify-center
                      gap-2
                      sm:justify-start
                    "
                  >
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        px-3
                        py-1
                        text-[11px]
                        font-bold
                      "
                      style={{
                        background:
                          "var(--surface-secondary)",
                        color:
                          "var(--gray-600)",
                      }}
                    >
                      <ShieldCheck
                        className="h-3.5 w-3.5"
                        style={{
                          color:
                            "var(--success)",
                        }}
                      />

                      {user.status ||
                        "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div
              className="
                border-t
                p-5
                sm:p-8
                lg:p-10
              "
              style={{
                borderColor:
                  "var(--border)",
              }}
            >
              <div className="mb-6">
                <h3
                  className="
                    text-lg
                    font-bold
                  "
                  style={{
                    color:
                      "var(--foreground)",
                  }}
                >
                  Personal Information
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                  "
                  style={{
                    color:
                      "var(--gray-500)",
                  }}
                >
                  Your account details and
                  contact information.
                </p>
              </div>

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >
                {/* ==========================================
                    NAME
                =========================================== */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      sm:text-sm
                    "
                    style={{
                      color:
                        "var(--gray-700)",
                    }}
                  >
                    Full Name
                  </label>

                  {editing ? (
                    <div className="relative">
                      <User
                        className="
                          absolute
                          left-4
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                        "
                        style={{
                          color:
                            "var(--gray-400)",
                        }}
                      />

                      <input
                        value={name}
                        onChange={(event) =>
                          setName(
                            event.target.value
                          )
                        }
                        disabled={saving}
                        className="
                          h-12
                          w-full
                          rounded-xl
                          pl-11
                          pr-4
                          text-sm
                          outline-none
                          transition
                          focus:ring-4
                        "
                        style={{
                          background:
                            "var(--surface-secondary)",
                          border:
                            "1px solid var(--border)",
                          color:
                            "var(--foreground)",
                        }}
                        placeholder="Enter your name"
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        min-h-12
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                      "
                      style={{
                        background:
                          "var(--surface-secondary)",
                        border:
                          "1px solid var(--border)",
                      }}
                    >
                      <User
                        className="h-4 w-4 shrink-0"
                        style={{
                          color:
                            "var(--gray-400)",
                        }}
                      />

                      <span
                        className="
                          truncate
                          text-sm
                        "
                        style={{
                          color:
                            "var(--foreground)",
                        }}
                      >
                        {user.name ||
                          "Not provided"}
                      </span>
                    </div>
                  )}
                </div>

                {/* ==========================================
                    MOBILE
                =========================================== */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      sm:text-sm
                    "
                    style={{
                      color:
                        "var(--gray-700)",
                    }}
                  >
                    Mobile Number
                  </label>

                  <div
                    className="
                      flex
                      min-h-12
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                    "
                    style={{
                      background:
                        "var(--surface-secondary)",
                      border:
                        "1px solid var(--border)",
                    }}
                  >
                    <Phone
                      className="h-4 w-4 shrink-0"
                      style={{
                        color:
                          "var(--gray-400)",
                      }}
                    />

                    <span
                      className="text-sm"
                      style={{
                        color:
                          "var(--foreground)",
                      }}
                    >
                      {mobile ||
                        "Not provided"}
                    </span>
                  </div>

                  <p
                    className="
                      mt-1.5
                      text-[10px]
                    "
                    style={{
                      color:
                        "var(--gray-400)",
                    }}
                  >
                    Mobile number cannot be
                    changed here.
                  </p>
                </div>

                {/* ==========================================
                    EMAIL
                =========================================== */}

                <div className="md:col-span-2">
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      sm:text-sm
                    "
                    style={{
                      color:
                        "var(--gray-700)",
                    }}
                  >
                    Email Address
                  </label>

                  {editing ? (
                    <div className="relative">
                      <Mail
                        className="
                          absolute
                          left-4
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                        "
                        style={{
                          color:
                            "var(--gray-400)",
                        }}
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(
                            event.target.value
                          )
                        }
                        disabled={saving}
                        className="
                          h-12
                          w-full
                          rounded-xl
                          pl-11
                          pr-4
                          text-sm
                          outline-none
                          transition
                          focus:ring-4
                        "
                        style={{
                          background:
                            "var(--surface-secondary)",
                          border:
                            "1px solid var(--border)",
                          color:
                            "var(--foreground)",
                        }}
                        placeholder="Enter your email address"
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        min-h-12
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                      "
                      style={{
                        background:
                          "var(--surface-secondary)",
                        border:
                          "1px solid var(--border)",
                      }}
                    >
                      <Mail
                        className="h-4 w-4 shrink-0"
                        style={{
                          color:
                            "var(--gray-400)",
                        }}
                      />

                      <span
                        className="
                          truncate
                          text-sm
                        "
                        style={{
                          color:
                            "var(--foreground)",
                        }}
                      >
                        {user.email ||
                          "Not provided"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                ACCOUNT SECURITY
            ================================================= */}

            <div
              className="
                border-t
                p-5
                sm:p-8
                lg:p-10
              "
              style={{
                borderColor:
                  "var(--border)",
              }}
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  p-4
                "
                style={{
                  background:
                    "var(--surface-secondary)",
                  border:
                    "1px solid var(--border-light)",
                }}
              >
                <ShieldCheck
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                  "
                  style={{
                    color:
                      "var(--success)",
                  }}
                />

                <div>
                  <p
                    className="
                      text-sm
                      font-bold
                    "
                    style={{
                      color:
                        "var(--foreground)",
                    }}
                  >
                    Your account is protected
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                    "
                    style={{
                      color:
                        "var(--gray-500)",
                    }}
                  >
                    Your personal information
                    is securely managed by SBS
                    Taxi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================
          IMAGE CROPPER MODAL
      ======================================================== */}

      {cropOpen && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-lg
              overflow-hidden
              rounded-3xl
              shadow-2xl
            "
            style={{
              background:
                "var(--surface)",
            }}
          >
            {/* =================================================
                CROP HEADER
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                px-5
                py-4
              "
              style={{
                borderColor:
                  "var(--border)",
              }}
            >
              <div>
                <h2
                  className="
                    text-lg
                    font-bold
                  "
                  style={{
                    color:
                      "var(--foreground)",
                  }}
                >
                  Crop Profile Photo
                </h2>

                <p
                  className="
                    mt-0.5
                    text-xs
                  "
                  style={{
                    color:
                      "var(--gray-500)",
                  }}
                >
                  Drag the image and adjust
                  the zoom.
                </p>
              </div>

              <button
                type="button"
                onClick={cancelCrop}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  transition
                  hover:bg-black/5
                "
                aria-label="Close cropper"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* =================================================
                CROP AREA
            ================================================= */}

            <div className="p-5 sm:p-6">
              <div
                ref={cropBoxRef}
                onPointerDown={
                  handlePointerDown
                }
                onPointerMove={
                  handlePointerMove
                }
                onPointerUp={
                  handlePointerUp
                }
                onPointerCancel={
                  handlePointerUp
                }
                className="
                  relative
                  mx-auto
                  aspect-square
                  w-full
                  max-w-[360px]
                  cursor-grab
                  touch-none
                  select-none
                  overflow-hidden
                  rounded-2xl
                  bg-black
                  shadow-inner
                  active:cursor-grabbing
                "
              >
                {selectedImage && (
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="Crop preview"
                    draggable={false}
                    onLoad={
                      handleCropImageLoad
                    }
                    className="
                      pointer-events-none
                      absolute
                      max-w-none
                      select-none
                    "
                    style={{
                      width:
                        displayWidth,
                      height:
                        displayHeight,
                      left:
                        cropPosition.x,
                      top:
                        cropPosition.y,
                    }}
                  />
                )}

                {/* DARK OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/30
                  "
                />

                {/* CENTER CIRCLE */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    aspect-square
                    w-[72%]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border-[3px]
                    border-white
                    shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]
                  "
                />

                {/* CROP GUIDE */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[72%]
                    w-[72%]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/40
                  "
                />
              </div>

              {/* =================================================
                  ZOOM
              ================================================= */}

              <div
                className="
                  mx-auto
                  mt-6
                  max-w-[360px]
                "
              >
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                    "
                    style={{
                      color:
                        "var(--gray-600)",
                    }}
                  >
                    <ZoomIn className="h-4 w-4" />
                    Zoom
                  </div>

                  <span
                    className="
                      text-xs
                      font-bold
                    "
                    style={{
                      color:
                        "var(--primary)",
                    }}
                  >
                    {zoom.toFixed(1)}x
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(event) => {
                    const nextZoom =
                      Number(
                        event.target.value
                      );

                    const nextScale =
                      baseScale *
                      nextZoom;

                    setZoom(nextZoom);

                    setCropPosition(
                      (previous) =>
                        clampPosition(
                          previous.x,
                          previous.y,
                          nextScale
                        )
                    );
                  }}
                  className="
                    h-2
                    w-full
                    cursor-pointer
                    accent-[var(--primary)]
                  "
                />
              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={resetCrop}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    px-4
                    text-sm
                    font-semibold
                    transition
                    hover:bg-black/5
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    color:
                      "var(--gray-700)",
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>

                <button
                  type="button"
                  onClick={cancelCrop}
                  className="
                    h-11
                    flex-1
                    rounded-xl
                    border
                    text-sm
                    font-semibold
                  "
                  style={{
                    borderColor:
                      "var(--border)",
                    color:
                      "var(--gray-700)",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={applyCrop}
                  className="
                    h-11
                    flex-1
                    rounded-xl
                    text-sm
                    font-bold
                    text-black
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                  "
                  style={{
                    background:
                      "var(--secondary)",
                  }}
                >
                  Use Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}