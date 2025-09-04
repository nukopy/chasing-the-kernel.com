import { Link, Outlet } from "react-router";
import type { Route } from "./+types/index";

export function loader() {
  console.info("[loader: Misc] try");

  return {
    links: [
      {
        id: "test-get-root-loader",
        href: "/misc/test-get-root-loader",
        label: "Test Get Root Loader",
      },
      {
        id: "test-props",
        href: "/misc/test-props",
        label: "Test Props",
      },
    ],
  };
}

export default function Misc({ loaderData }: Route.ComponentProps) {
  console.info("[Misc] Getting loader data...");
  const { links } = loaderData;
  console.info("[Misc] Got loader data: ", { links });

  return (
    <div className="flex flex-col gap-y-4">
      <h2>Testing React Router Functions</h2>
      {links.map((link) => (
        <Link key={link.id} to={link.href} className="btn btn-soft btn-primary">
          {link.label}
        </Link>
      ))}

      <Outlet />
    </div>
  );
}
