"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  /* ==========================================================
     STATE
  ========================================================== */

  const [mobile, setMobile] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ==========================================================
     SIGN IN
  ========================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    /* ========================================================
       CLEAN MOBILE
    ======================================================== */

    const cleanMobile =
      mobile.replace(/\D/g, "");

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (!cleanMobile) {
      const message =
        "Please enter your mobile number.";

      setError(message);
      toast.error(message);

      return;
    }

    if (cleanMobile.length !== 10) {
      const message =
        "Please enter a valid 10-digit mobile number.";

      setError(message);
      toast.error(message);

      return;
    }

    if (!password.trim()) {
      const message =
        "Please enter your password.";

      setError(message);
      toast.error(message);

      return;
    }

    setLoading(true);

    try {
      /* ======================================================
         API
      ====================================================== */

      const response = await fetch(
        "/api/signin",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
          },
          body: JSON.stringify({
            mobile: cleanMobile,
            password,
          }),
        }
      );

      /* ======================================================
         RESPONSE
      ====================================================== */

      const result =
        await response.json();

      console.log(
        "SBS TAXI LOGIN RESPONSE:",
        result
      );

      /* ======================================================
         LOGIN FAILED
      ====================================================== */

      if (
        !response.ok ||
        result?.success !== true
      ) {
        const errorMessage =
          result?.message ||
          "Invalid mobile number or password.";

        setError(errorMessage);
        toast.error(errorMessage);

        return;
      }

      /* ======================================================
         GET USER
      ====================================================== */

      const user = result?.data;

      if (!user) {
        const errorMessage =
          "Login successful, but user information was not received.";

        setError(errorMessage);
        toast.error(errorMessage);

        return;
      }

      /* ======================================================
         ACCOUNT STATUS
      ====================================================== */

      if (
        user.status &&
        user.status.toLowerCase() !==
          "active"
      ) {
        const errorMessage =
          "Your account is not active. Please contact SBS Taxi support.";

        setError(errorMessage);
        toast.error(errorMessage);

        return;
      }

      /* ======================================================
         SAVE MAIN USER OBJECT
      ====================================================== */

      localStorage.setItem(
        "sbs_user",
        JSON.stringify(user)
      );

      /* ======================================================
         LOGIN STATUS
      ====================================================== */

      localStorage.setItem(
        "sbs_logged_in",
        "true"
      );

      /* ======================================================
         INDIVIDUAL USER VALUES
      ====================================================== */

      localStorage.setItem(
        "sbs_user_id",
        String(user.id ?? "")
      );

      localStorage.setItem(
        "sbs_user_name",
        user.name || ""
      );

      localStorage.setItem(
        "sbs_user_mobile",
        user.mobile ||
          user.phone ||
          cleanMobile
      );

      localStorage.setItem(
        "sbs_user_email",
        user.email || ""
      );

      localStorage.setItem(
        "sbs_user_status",
        user.status || ""
      );

      /* ======================================================
         IMPORTANT
         
         Navbar and BottomBar listen to this event.
         
         This makes the UI change immediately in the
         same browser tab without refreshing.
      ====================================================== */

      window.dispatchEvent(
        new Event("sbs-auth-change")
      );

      /* ======================================================
         SUCCESS
      ====================================================== */

      toast.success(
        "Login successful! Redirecting..."
      );

      /* ======================================================
         OPEN USER DASHBOARD
      ====================================================== */

      router.replace(
        "/passenger/dashboard"
      );
    } catch (error) {
      console.error(
        "SBS TAXI SIGN IN ERROR:",
        error
      );

      const errorMessage =
        "Unable to connect to the server. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     SIGN UP
  ========================================================== */

  function goToSignup() {
    router.push("/signup");
  }

  /* ==========================================================
     FORGOT PASSWORD
  ========================================================== */

  function forgotPassword() {
    router.push(
      "/forgot-password"
    );
  }

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main
      className="
        relative
        flex
        min-h-[calc(100vh-80px)]
        w-full
        items-center
        justify-center
        overflow-hidden
        px-4
        py-8
        sm:px-6
        sm:py-10
        lg:px-8
        lg:py-12
      "
      style={{
        background:
          "var(--background)",
      }}
    >
      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-15
          sm:-left-32
          sm:-top-32
          sm:h-96
          sm:w-96
        "
        style={{
          background:
            "var(--primary)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-64
          w-64
          rounded-full
          blur-3xl
          opacity-15
          sm:-bottom-32
          sm:-right-32
          sm:h-96
          sm:w-96
        "
        style={{
          background:
            "var(--secondary)",
        }}
      />

      {/* ======================================================
          CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* ====================================================
            LOGIN CONTENT
        ==================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-md
          "
        >
          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              mb-6
              text-center
              sm:mb-8
            "
          >
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
              Welcome Back
            </h1>

            <p
              className="
                mt-2
                px-2
                text-xs
                leading-5
                sm:text-sm
                sm:leading-6
              "
              style={{
                fontFamily:
                  "var(--font-jakarta)",
                color:
                  "var(--gray-600)",
              }}
            >
              Sign in to your{" "}
              <span
                className="font-bold"
                style={{
                  color:
                    "var(--primary)",
                }}
              >
                SBS Taxi
              </span>{" "}
              account
            </p>
          </div>

          {/* ==================================================
              LOGIN CARD
          ================================================== */}

          <div
            className="
              w-full
              overflow-hidden
              rounded-[22px]
              p-5
              shadow-xl
              backdrop-blur-xl
              transition-all
              duration-300
              sm:rounded-3xl
              sm:p-8
            "
            style={{
              background:
                "var(--surface)",
              border:
                "1px solid var(--border)",
            }}
          >
            {/* TOP ACCENT */}

            <div
              className="
                -mx-5
                -mt-5
                mb-5
                h-1.5
                sm:-mx-8
                sm:-mt-8
                sm:mb-7
              "
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--secondary))",
              }}
            />

            {/* =================================================
                ERROR
            ================================================== */}

            {error && (
              <div
                className="
                  mb-5
                  flex
                  items-start
                  gap-2.5
                  rounded-xl
                  px-3.5
                  py-3
                  text-xs
                  leading-5
                  sm:gap-3
                  sm:px-4
                  sm:text-sm
                "
                style={{
                  background:
                    "#FEF2F2",
                  border:
                    "1px solid #FECACA",
                  color:
                    "var(--danger)",
                }}
              >
                <AlertCircle
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    sm:h-[19px]
                    sm:w-[19px]
                  "
                />

                <p className="min-w-0 break-words">
                  {error}
                </p>
              </div>
            )}

            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* MOBILE */}

              <div>
                <label
                  htmlFor="mobile"
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

                <div className="group relative">
                  <Phone
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition-colors
                      group-focus-within:text-[var(--primary)]
                      sm:left-4
                      sm:h-[19px]
                      sm:w-[19px]
                    "
                  />

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(event) => {
                      setMobile(
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      );
                    }}
                    placeholder="Enter mobile number"
                    disabled={loading}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      px-4
                      pl-11
                      text-sm
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[var(--gray-400)]
                      focus:ring-4
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:h-13
                      sm:pl-12
                    "
                    style={{
                      background:
                        "var(--surface-secondary)",
                      border:
                        "1px solid var(--border)",
                      color:
                        "var(--foreground)",
                    }}
                  />
                </div>

                <p
                  className="
                    mt-1.5
                    text-[10px]
                    leading-4
                    sm:text-xs
                  "
                  style={{
                    color:
                      "var(--gray-400)",
                  }}
                >
                  Enter your registered
                  10-digit mobile number
                </p>
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
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
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition-colors
                      group-focus-within:text-[var(--primary)]
                      sm:left-4
                      sm:h-[19px]
                      sm:w-[19px]
                    "
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    disabled={loading}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      py-3
                      pl-11
                      pr-12
                      text-sm
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[var(--gray-400)]
                      focus:ring-4
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:h-13
                      sm:pl-12
                    "
                    style={{
                      background:
                        "var(--surface-secondary)",
                      border:
                        "1px solid var(--border)",
                      color:
                        "var(--foreground)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) =>
                          !value
                      )
                    }
                    disabled={loading}
                    className="
                      absolute
                      right-2
                      top-1/2
                      flex
                      h-9
                      w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-gray-400
                      transition
                      hover:bg-gray-100
                      hover:text-gray-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:right-3
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD */}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={
                    forgotPassword
                  }
                  disabled={loading}
                  className="
                    text-xs
                    font-semibold
                    transition
                    hover:underline
                    disabled:opacity-50
                    sm:text-sm
                  "
                  style={{
                    color:
                      "var(--primary)",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* SIGN IN */}

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:h-13
                "
                style={{
                  background:
                    "var(--primary)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    <span>
                      Signing In...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Sign In
                    </span>

                    <ArrowRight
                      size={18}
                    />
                  </>
                )}
              </button>
            </form>

            {/* ==================================================
                DIVIDER
            ================================================== */}

            <div className="my-6 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "var(--border)",
                }}
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  sm:text-xs
                "
                style={{
                  color:
                    "var(--gray-400)",
                }}
              >
                OR
              </span>

              <div
                className="h-px flex-1"
                style={{
                  background:
                    "var(--border)",
                }}
              />
            </div>

            {/* SIGN UP */}

            <p
              className="
                text-center
                text-xs
                leading-5
                sm:text-sm
              "
              style={{
                color:
                  "var(--gray-500)",
              }}
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={
                  goToSignup
                }
                disabled={loading}
                className="
                  font-bold
                  transition
                  hover:underline
                  disabled:opacity-50
                "
                style={{
                  color:
                    "var(--primary)",
                }}
              >
                Sign Up
              </button>
            </p>

            {/* SECURITY */}

            <div
              className="
                mt-5
                flex
                items-start
                justify-center
                gap-2
                rounded-xl
                px-3
                py-2.5
                text-center
                text-[10px]
                leading-4
                sm:mt-6
                sm:items-center
                sm:px-4
                sm:text-xs
              "
              style={{
                background:
                  "var(--surface-secondary)",
                border:
                  "1px solid var(--border-light)",
                color:
                  "var(--gray-500)",
              }}
            >
              <ShieldCheck
                size={15}
                className="
                  mt-0.5
                  shrink-0
                  sm:mt-0
                "
                style={{
                  color:
                    "var(--success)",
                }}
              />

              <span className="min-w-0">
                Your account information
                is securely protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}