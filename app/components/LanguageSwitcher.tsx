import { useTranslation } from "react-i18next";
import { supportedLngs } from "../lib/i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);

    // Update URL to include/remove language prefix
    const currentPath = window.location.pathname;
    let newPath: string;

    if (lng === "ja") {
      // Remove language prefix for Japanese (default)
      if (currentPath.startsWith("/en")) {
        newPath = currentPath.replace("/en", "") || "/";
      } else {
        newPath = currentPath;
      }
    } else {
      // Add language prefix for other languages
      if (currentPath.startsWith("/en")) {
        newPath = currentPath;
      } else if (currentPath === "/") {
        newPath = `/${lng}`;
      } else {
        newPath = `/${lng}${currentPath}`;
      }
    }

    window.history.pushState({}, "", newPath);
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="btn btn-ghost btn-circle"
        title={t("language.title")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          role="img"
          aria-label={t("language.title")}
        >
          <path
            fill="currentColor"
            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
          />
        </svg>
      </button>
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-2xl">
        <li className="menu-title">
          <span>{t("language.select")}</span>
        </li>
        {supportedLngs.map((lng) => (
          <li key={lng}>
            <button
              type="button"
              className={`flex items-center gap-2 ${
                i18n.language === lng ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lng)}
            >
              <span>{t(`language.${lng}`)}</span>
              {i18n.language === lng && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  role="img"
                  aria-label={t("language.selected")}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
