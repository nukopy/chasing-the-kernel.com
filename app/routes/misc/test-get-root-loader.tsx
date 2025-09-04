import { useMatches } from "react-router";
import type { Route } from "../../routes/misc/+types/test-get-root-loader";

export async function loader() {
  console.info("[loader: TestGetRootLoader] try");

  return {
    message: "Hello, world!",
  };
}

export default function TestGetRootLoader({
  loaderData,
}: Route.ComponentProps) {
  // get data from loader
  console.info("[TestGetRootLoader] Getting loader data...");
  const { message } = loaderData;
  console.info("[TestGetRootLoader] Got loader data: ", { message });

  // get data from root loader
  const matches = useMatches();
  console.info("[TestGetRootLoader] Got matches: ", { matches });

  return (
    <div>
      <h1>TestGetRootLoader: useMatches</h1>
      <pre>{JSON.stringify(matches, null, 2)}</pre>
    </div>
  );
}
