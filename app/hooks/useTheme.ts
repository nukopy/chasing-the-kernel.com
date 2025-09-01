import { useLayoutEffect, useState } from "react";

export type ThemeName = "nord-custom" | "dim-custom" | "black-custom" | "night";

export const THEME_LIST = [
  { name: "nord-custom" as const, label: "Light" },
  { name: "dim-custom" as const, label: "Dim" },
  { name: "black-custom" as const, label: "Black" },
  { name: "night" as const, label: "Night" },
];

export const DEFAULT_THEME = "nord-custom";

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(DEFAULT_THEME);

  // ページ読み込み時に localStorage から ThemeName を取得して setCurrentTheme する
  // CAUTION: 以下の useLayoutEffect では DOM を操作しないため、テーマの変更はされない
  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      console.info(
        `No saved theme found, setting default theme...: ${DEFAULT_THEME}`,
      );
      setCurrentTheme(DEFAULT_THEME);
      return;
    }

    // if the saved theme is not in the theme list, set the default theme
    const isSavedThemeValid = THEME_LIST.some((t) => t.name === savedTheme);
    if (!isSavedThemeValid) {
      console.info(
        `Saved theme '${savedTheme}' is not valid, setting default theme...: ${DEFAULT_THEME}`,
      );
      setCurrentTheme(DEFAULT_THEME);
      return;
    }

    // if the saved theme is valid, set the theme
    console.info(`Saved theme '${savedTheme}' is valid, setting theme...`);
    const theme = savedTheme as ThemeName;
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme: ThemeName) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return { currentTheme, handleThemeChange };
}
