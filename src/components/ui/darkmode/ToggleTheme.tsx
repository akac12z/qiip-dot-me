import { useRef, useState, useEffect } from "react";
import styles from "./toggleTheme.module.css";

const SunIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v3m0 14v3M4.22 4.22l2.12 2.12m11.32 11.32 2.12 2.12M2 12h3m14 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" fill="currentColor" stroke="none" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79"/>
  </svg>
);


function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ToggleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    // Calcular origen del clip desde el centro del botón
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.style.setProperty(
        "--vt-clip-start", `circle(0px at ${x}px ${y}px)`
      );
      document.documentElement.style.setProperty(
        "--vt-clip-end", `circle(${maxRadius}px at ${x}px ${y}px)`
      );
    }

    if (!document.startViewTransition) {
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      setTheme(nextTheme);
      return;
    }

    await document.startViewTransition(() => {
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      setTheme(nextTheme);
    }).finished;
  };

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      <span className={styles.icon}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}