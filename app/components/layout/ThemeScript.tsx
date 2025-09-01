import { DEFAULT_THEME, THEME_LIST } from "app/hooks/useTheme";

export function ThemeScript() {
  return (
    <script>
      {`
      (function() {
        try {
          // get saved theme from local storage
          var DEFAULT_THEME = "${DEFAULT_THEME}";
          var saved = localStorage.getItem("theme");
          if (!saved) {
            console.info(
              "No saved theme found, setting default theme...: " + DEFAULT_THEME,
            );
            document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
            localStorage.setItem("theme", DEFAULT_THEME);
            return;
          }

          // if the saved theme is not in the allowed themes, set the default theme
          var allowedThemes = "${THEME_LIST.map((t) => t.name).join(",")}";
          if (!allowedThemes.includes(saved)) {
            console.info(
              "Saved theme '" + saved + "' is not valid, setting default theme...: " + DEFAULT_THEME,
            );
            document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
            localStorage.setItem("theme", DEFAULT_THEME);
            return;
          }

          // if the saved theme is valid, set the theme
          console.info("Saved theme '" + saved + "' is valid, setting theme...");
          document.documentElement.setAttribute("data-theme", saved);
          localStorage.setItem("theme", saved);
        } catch (e) {
          console.error("Error setting theme:", e);
          document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
        }
      })();
    `}
    </script>
  );
}
