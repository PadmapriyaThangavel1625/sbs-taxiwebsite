"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import toast from "react-hot-toast";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserPlus,
  Loader2,
  Sparkles,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    user_id?: number;
    name?: string;
    mobile?: string;
    email?: string;
  } | null;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
}

interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
  disabled?: boolean;
  autoComplete?: string;
}

interface PasswordStrengthProps {
  password: string;
}

/* =========================================================
   ANIMATIONS
========================================================= */

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const leftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.18,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function SignupPage() {
  const router = useRouter();

  /* -------------------------------------------------------
     FORM STATE
  ------------------------------------------------------- */

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* -------------------------------------------------------
     INPUT HANDLER
  ------------------------------------------------------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setForm((previous) => ({
        ...previous,
        mobile: onlyNumbers,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* -------------------------------------------------------
     TOAST
  ------------------------------------------------------- */

  const showError = (message: string) => {
    toast.error(message, {
      duration: 3500,
      style: {
        borderRadius: "14px",
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #fee2e2",
        boxShadow: "0 15px 40px rgba(15, 30, 72, 0.15)",
        padding: "14px 18px",
        fontFamily: "var(--font-primary), Arial, sans-serif",
        fontSize: "13px",
        fontWeight: 600,
      },
    });
  };

  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3500,
      style: {
        borderRadius: "14px",
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #dcfce7",
        boxShadow: "0 15px 40px rgba(15, 30, 72, 0.15)",
        padding: "14px 18px",
        fontFamily: "var(--font-primary), Arial, sans-serif",
        fontSize: "13px",
        fontWeight: 600,
      },
    });
  };

  /* -------------------------------------------------------
     VALIDATION
  ------------------------------------------------------- */

  const validateForm = () => {
    const name = form.name.trim();
    const mobile = form.mobile.trim();
    const email = form.email.trim();

    if (!name) {
      showError("Please enter your full name.");
      return false;
    }

    if (name.length < 2) {
      showError("Please enter a valid name.");
      return false;
    }

    if (!mobile) {
      showError("Please enter your mobile number.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      showError("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!email) {
      showError("Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return false;
    }

    if (!form.password) {
      showError("Please create a password.");
      return false;
    }

    if (form.password.length < 6) {
      showError("Password must contain at least 6 characters.");
      return false;
    }

    if (!form.confirmPassword) {
      showError("Please confirm your password.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match.");
      return false;
    }

    if (!acceptedTerms) {
      showError("Please accept the Terms & Conditions to continue.");
      return false;
    }

    return true;
  };

  /* -------------------------------------------------------
     SUBMIT
  ------------------------------------------------------- */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const result = (await response.json()) as SignupResponse;

      if (result.success === true) {
        setSuccess(true);

        showSuccess(result.message || "Account created successfully!");

        setForm({
          name: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setAcceptedTerms(false);

        setTimeout(() => {
          router.push("/signin");
        }, 1800);

        return;
      }

      const message =
        result.message || "Unable to create your account.";

      if (
        message.toLowerCase().includes("already exists") ||
        message.toLowerCase().includes("already registered")
      ) {
        toast.error(
          "An account with these details already exists.",
          {
            duration: 4000,
            style: {
              borderRadius: "14px",
              background: "#ffffff",
              color: "#111827",
              border: "1px solid #fee2e2",
              boxShadow:
                "0 15px 40px rgba(15, 30, 72, 0.15)",
              padding: "14px 18px",
              fontFamily:
                "var(--font-primary), Arial, sans-serif",
              fontSize: "13px",
              fontWeight: 600,
            },
          }
        );

        return;
      }

      showError(message);
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      showError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (success) {
    return (
      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-[var(--surface-secondary)] px-4 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[var(--primary)] blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.16, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="absolute bottom-[-140px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[var(--secondary)] blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 text-center shadow-[var(--shadow-xl)] sm:rounded-[28px] sm:p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 180,
              }}
              className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-green-50 sm:h-20 sm:w-20"
            >
              <CheckCircle2
                size={40}
                strokeWidth={1.8}
                className="text-green-600 sm:h-[42px] sm:w-[42px]"
              />
            </motion.div>

            <h1 className="mt-6 text-3xl text-[var(--foreground)] sm:mt-7 sm:text-4xl">
              Welcome to SBS Taxi
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[var(--gray-500)]">
              Your account has been created successfully.
              We are getting your SBS Taxi experience ready.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--primary)] sm:mt-7">
              <Loader2 size={16} className="animate-spin" />
              Redirecting to sign in...
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[var(--surface-secondary)]">
      {/* =====================================================
          BACKGROUND ANIMATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-150px] top-[-150px] h-[380px] w-[380px] rounded-full bg-[var(--primary)] opacity-[0.07] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[var(--secondary)] opacity-[0.12] blur-3xl"
        />

        <div className="absolute left-[12%] top-[20%] h-2 w-2 rounded-full bg-[var(--secondary)] opacity-70" />

        <div className="absolute right-[15%] top-[30%] h-3 w-3 rounded-full bg-[var(--primary)] opacity-20" />

        <div className="absolute bottom-[25%] left-[20%] h-2 w-2 rounded-full bg-[var(--primary)] opacity-20" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-80px)]
          w-full
          max-w-7xl
          items-center
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:px-8
          lg:py-12
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-8
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-10
            xl:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.section
            variants={leftVariants}
            className="block w-full"
          >
            <motion.div
              variants={itemVariants}
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-white
                px-3
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--primary)]
                shadow-sm
                sm:px-4
                sm:text-xs
              "
            >
              <Sparkles
                size={13}
                className="text-[var(--secondary-dark)]"
              />

              Join SBS Taxi
            </motion.div>

            <h1
              className="
                max-w-xl
                text-4xl
                leading-[1.08]
                text-[var(--foreground)]
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Your journey
              <span className="block text-[var(--primary)]">
                starts here.
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-lg
                text-sm
                leading-6
                text-[var(--gray-600)]
                sm:mt-6
                sm:text-base
                sm:leading-7
              "
            >
              Create your SBS Taxi account and enjoy a
              simple, reliable and trusted way to book your
              rides.
            </p>

            {/* FEATURES */}

            <div className="mt-7 space-y-4 sm:mt-9">
              <Feature
                icon={<ShieldCheck size={19} />}
                title="Safe & Trusted"
                description="Your account and booking information are handled securely."
              />

              <Feature
                icon={<MapPin size={19} />}
                title="Easy Ride Booking"
                description="Book your next SBS Taxi ride in just a few simple steps."
              />

              <Feature
                icon={<CheckCircle2 size={19} />}
                title="Transparent Service"
                description="One Brand. One Fare. One Trusted Service."
              />
            </div>

            {/* TAGLINE */}

            <div className="mt-7 border-l-2 border-[var(--secondary)] pl-4 sm:mt-10 sm:pl-5">
              <p className="font-[var(--font-secondary)] text-xl leading-tight text-[var(--foreground)] sm:text-2xl">
                “One Brand. One Fare.
                <br />
                One Trusted Service.”
              </p>
            </div>
          </motion.section>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <motion.section
            variants={rightVariants}
            className="mx-auto w-full max-w-xl"
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[var(--border)]
                bg-white
                shadow-[var(--shadow-xl)]
                sm:rounded-[28px]
              "
            >
              {/* TOP LINE */}

              <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--secondary)]" />

              <div className="p-5 sm:p-8 lg:p-10">
                {/* FORM HEADER */}

                <div className="mb-6 sm:mb-8">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-md sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <UserPlus size={21} />
                  </div>

                  <h2
                    className="
                      text-3xl
                      leading-tight
                      text-[var(--foreground)]
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--gray-500)]">
                    Sign up to book and manage your SBS Taxi
                    rides.
                  </p>
                </div>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    icon={<User size={18} />}
                    disabled={loading}
                    autoComplete="name"
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={handleChange}
                    icon={<Phone size={18} />}
                    disabled={loading}
                    autoComplete="tel"
                    maxLength={10}
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    icon={<Mail size={18} />}
                    disabled={loading}
                    autoComplete="email"
                  />

                  <PasswordField
                    label="Password"
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    show={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    autoComplete="new-password"
                  />

                  <PasswordStrength
                    password={form.password}
                  />

                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirmPassword}
                    onToggle={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    autoComplete="new-password"
                  />

                  {/* TERMS */}

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-transparent
                      p-1
                      transition
                      hover:bg-[var(--surface-secondary)]
                    "
                  >
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) =>
                        setAcceptedTerms(e.target.checked)
                      }
                      disabled={loading}
                      className="
                        mt-0.5
                        h-4
                        w-4
                        shrink-0
                        cursor-pointer
                        accent-[var(--primary)]
                      "
                    />

                    <span className="text-xs leading-5 text-[var(--gray-500)]">
                      I agree to{" "}
                      <Link
                        href="/terms"
                        className="font-bold text-[var(--primary)] hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="font-bold text-[var(--primary)] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* SUBMIT */}

                  <motion.button
                    whileHover={
                      !loading
                        ? {
                            y: -2,
                            scale: 1.005,
                          }
                        : {}
                    }
                    whileTap={
                      !loading
                        ? {
                            scale: 0.985,
                          }
                        : {}
                    }
                    type="submit"
                    disabled={loading}
                    className="
                      group
                      relative
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-xl
                      bg-[var(--primary)]
                      px-5
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      shadow-[var(--shadow-md)]
                      transition-all
                      duration-300
                      hover:bg-[var(--primary-dark)]
                      hover:shadow-[var(--shadow-lg)]
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                      sm:px-6
                      sm:py-4
                    "
                  >
                    {!loading && (
                      <span className="absolute inset-y-0 -left-24 w-16 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[110%]" />
                    )}

                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account

                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* DIVIDER */}

                <div className="my-6 flex items-center gap-3 sm:my-7 sm:gap-4">
                  <div className="h-px flex-1 bg-[var(--border)]" />

                  <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--gray-400)] sm:text-[11px] sm:tracking-[0.16em]">
                    Already registered?
                  </span>

                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>

                {/* SIGN IN */}

                <Link
                  href="/signin"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-white
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-[var(--primary)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[var(--primary)]
                    hover:bg-[var(--surface-secondary)]
                    sm:px-6
                  "
                >
                  Sign In to Your Account

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* SECURITY */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    text-[10px]
                    font-medium
                    text-[var(--gray-400)]
                    sm:mt-6
                    sm:text-[11px]
                  "
                >
                  <ShieldCheck size={14} />

                  Secure registration powered by SBS Taxi
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </main>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon,
  title,
  description,
}: FeatureProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex gap-3 sm:gap-4"
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[var(--primary)]
          text-white
          shadow-sm
          sm:h-10
          sm:w-10
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="font-[var(--font-primary)] text-sm font-bold text-[var(--foreground)]">
          {title}
        </h3>

        <p className="mt-1 max-w-md text-xs leading-5 text-[var(--gray-500)]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
  disabled,
  autoComplete,
  maxLength,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold text-[var(--gray-700)]"
      >
        {label}
      </label>

      <div className="group relative">
        <div
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            z-10
            flex
            -translate-y-1/2
            items-center
            text-[var(--gray-400)]
            transition-colors
            duration-200
            group-focus-within:text-[var(--primary)]
            sm:left-4
          "
        >
          {icon}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            pl-11
            pr-4
            text-sm
            font-medium
            text-[var(--foreground)]
            outline-none
            transition-all
            duration-200
            placeholder:text-[var(--gray-400)]
            hover:border-[var(--border-dark)]
            focus:border-[var(--primary)]
            focus:bg-white
            focus:ring-4
            focus:ring-[var(--primary)]/10
            sm:h-13
            sm:pl-12
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  disabled,
  autoComplete,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold text-[var(--gray-700)]"
      >
        {label}
      </label>

      <div className="group relative">
        <div
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            z-10
            flex
            -translate-y-1/2
            items-center
            text-[var(--gray-400)]
            transition-colors
            duration-200
            group-focus-within:text-[var(--primary)]
            sm:left-4
          "
        >
          <LockKeyhole size={18} />
        </div>

        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            pl-11
            pr-12
            text-sm
            font-medium
            text-[var(--foreground)]
            outline-none
            transition-all
            duration-200
            placeholder:text-[var(--gray-400)]
            hover:border-[var(--border-dark)]
            focus:border-[var(--primary)]
            focus:bg-white
            focus:ring-4
            focus:ring-[var(--primary)]/10
            sm:h-13
            sm:pl-12
          "
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-label={
            show ? "Hide password" : "Show password"
          }
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
            text-[var(--gray-400)]
            transition
            hover:bg-[var(--gray-100)]
            hover:text-[var(--primary)]
            sm:right-3
          "
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD STRENGTH
========================================================= */

function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  if (!password) {
    return null;
  }

  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const label =
    strength <= 1
      ? "Weak password"
      : strength <= 3
        ? "Good password"
        : "Strong password";

  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      className="mt-[-8px]"
    >
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              item <= strength
                ? "bg-[var(--primary)]"
                : "bg-[var(--gray-200)]"
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[var(--gray-500)]">
        {strength >= 4 && (
          <Check
            size={12}
            className="text-green-600"
          />
        )}

        {label}
      </div>
    </motion.div>
  );
}