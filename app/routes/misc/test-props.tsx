import type { Route } from "../../routes/misc/+types/test-props";

export function loader() {
  console.info("[loader: TestProps] try");
  return {
    message: "Hello, world!",
  };
}

export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  console.info("[TestProps] Getting loader data...");
  const { message } = loaderData;
  console.info("[TestProps] Got loader data: ", { message });

  return (
    <div>
      <h1>Props 付きのマイルートへようこそ！</h1>
      <p>ローダーデータ: {JSON.stringify({ message })}</p>
      <p>アクションデータ: {JSON.stringify(actionData)}</p>
      <p>ルートパラメータ: {JSON.stringify(params)}</p>
      <p>一致したルート:</p>
      <pre>{JSON.stringify(matches, null, 2)}</pre>
    </div>
  );
}
