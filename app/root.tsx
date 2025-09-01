import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "./components/layout/Header";
import { DEFAULT_THEME, THEME_LIST } from "./hooks/useTheme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function ThemeScript() {
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScript />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-base-200">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">{message}</h1>
          <p className="py-6 text-base-content">{details}</p>
          {stack && (
            <div className="mockup-code">
              <pre>
                <code>{stack}</code>
              </pre>
            </div>
          )}
          <a href="/" className="btn btn-primary">
            ホームに戻る
          </a>
        </div>
      </div>
    </main>
  );
}
