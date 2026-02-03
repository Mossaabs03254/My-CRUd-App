import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthState } from "./types";
import { authService } from "./services/authService";

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("admin_auth");
    return saved ? JSON.parse(saved) : { isLoggedIn: false, user: null };
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("admin_auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogin = (user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  }) => {
    setAuth({
      isLoggedIn: true,
      user,
    });
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore logout errors, still clear local auth
      console.warn("Logout error", err);
    }
    setAuth({ isLoggedIn: false, user: null });
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300 dark:bg-slate-900 bg-slate-50 text-slate-900 dark:text-slate-100">
        {!auth.isLoggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <DashboardPage
            user={auth.user!}
            onLogout={handleLogout}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        )}
      </div>
    </div>
  );
};

export default App;
