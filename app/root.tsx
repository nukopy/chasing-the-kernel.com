import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type unstable_MiddlewareFunction,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { useTranslation } from "react-i18next";
import { Header } from "./components/layout/Header";
import { ThemeScript } from "./components/layout/ThemeScript";
import { rootMiddlewares } from "./middlewares";
import { getLocale, localeCookie } from "./middlewares/i18next";

export const unstable_middleware: unstable_MiddlewareFunction[] = [
  ...rootMiddlewares,
];

export async function loader({ context }: Route.LoaderArgs) {
  const locale = getLocale(context);
  console.info("[loader: Root] detected locale:", locale);

  return data(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
  );
}

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

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
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
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
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
