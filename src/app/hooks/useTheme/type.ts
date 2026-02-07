import { useEffect, useState } from "react";
import type { ThemeMode } from ".";

export const useTheme = () => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("theme") as ThemeMode | null;
        return saved ?? "system";
    });

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

    const applyTheme = (theme: "light" | "dark") => {
        const html = document.documentElement;
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    };

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (mode === "system") {
                applyTheme(getSystemTheme());
            }
        };
        const activeTheme = mode === "system" ? getSystemTheme() : mode;
        applyTheme(activeTheme);
        media.addEventListener("change", handleChange);
        return () => {
            media.removeEventListener("change", handleChange);
        };
    }, [mode]);

    const changeTheme = (newMode: ThemeMode) => {
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    };
    return {
        mode,
        setTheme: changeTheme,
    };
};
