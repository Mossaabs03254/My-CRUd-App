import React, { useState } from "react";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { authService } from "../services/authService";

interface LoginPageProps {
  onLogin: (user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@elite.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login({ email, password });

      // If API returned user info, use it. Otherwise try fetching profile.
      let profile = (data && (data as any).user) || null;
      if (!profile) {
        try {
          profile = await authService.getProfile();
        } catch (_) {
          profile = null;
        }
      }

      const user = profile
        ? {
            name: profile.name || profile.username || "Admin User",
            email: profile.email || email,
            role: profile.role || "Super Administrator",
            avatar:
              profile.avatar ||
              `https://picsum.photos/seed/${encodeURIComponent(email)}/200`,
          }
        : {
            name: "Admin User",
            email,
            role: "Super Administrator",
            avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/200`,
          };

      onLogin(user);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-xl shadow-indigo-600/30">
            <span className="text-white text-3xl font-bold">E</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Sign in to manage your elite workspace
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all dark:text-white"
                  placeholder="admin@elite.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md transition-all"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Forgot?
            </a>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-indigo-600/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Not part of the elite?{" "}
          <a
            href="#"
            className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Request access
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
