import { useState } from "react";
import {
  X,
  UserRound,
  GraduationCap,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  IdCard,
} from "lucide-react";

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanIdentifier || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === "student") {
      if (!/^\d{8}$/.test(cleanIdentifier)) {
        setError("Student roll number must contain exactly 8 digits.");
        return;
      }
    } else {
      if (!/^[a-z]+@nitj\.ac\.in$/.test(cleanIdentifier)) {
        setError("Enter a valid faculty email, e.g. vermaop@nitj.ac.in.");
        return;
      }
    }

    if (isSignup) {
      if (role === "student") {
        if (!/^[a-z]+\.ic\.\d{2}@nitj\.ac\.in$/.test(cleanEmail)) {
          setError(
            "Use the student email format, e.g. tanishqa.ic.24@nitj.ac.in."
          );
          return;
        }
      }

      if (password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    onSuccess?.({
      role,
      identifier: cleanIdentifier,
      email: role === "faculty" ? cleanIdentifier : cleanEmail,
      displayName:
        role === "student" ? cleanIdentifier : cleanIdentifier.split("@")[0],
    });
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative my-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="relative bg-[#123d70] px-6 pb-7 pt-6 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute right-4 top-4 rounded-lg p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap size={27} />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            ICE Department Portal
          </p>

          <h2 id="auth-title" className="mt-2 text-2xl font-bold">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            {isSignup
              ? "Register to access your department profile."
              : "Log in to access your department profile."}
          </p>
        </div>

        <div className="p-6 sm:p-7">
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                !isSignup
                  ? "bg-white text-[#123d70] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => changeMode("signup")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                isSignup
                  ? "bg-white text-[#123d70] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Account type
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "student", label: "Student", Icon: GraduationCap },
                  { value: "faculty", label: "Faculty", Icon: UserRound },
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setRole(value);
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                      role === value
                        ? "border-blue-700 bg-blue-50 text-blue-800 ring-1 ring-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Icon size={17} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="auth-identifier"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {role === "student"
                  ? "Student Roll Number"
                  : "Faculty Institute Email"}
              </label>

              <div className="relative">
                <IdCard
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="auth-identifier"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value.trim())
                  }
                  placeholder={
                    role === "student"
                      ? "e.g. 24106092"
                      : "e.g. vermaop@nitj.ac.in"
                  }
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {isSignup && role === "student" &&(
              <div>
                <label
                  htmlFor="auth-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Institute email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@institute.ac.in"
                    autoComplete="email"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="auth-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={
                    isSignup ? "At least 8 characters" : "Enter your password"
                  }
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div>
                <label
                  htmlFor="auth-confirm-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>

                <input
                  id="auth-confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#123d70] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c2d55] focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            {isSignup
              ? "Your account will need to be connected to the institute database before it can be used."
              : "For authorized students and faculty of the department."}
          </p>
        </div>
      </div>
    </div>
  );
}