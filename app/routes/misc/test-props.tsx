import type { Route } from "../../routes/misc/+types/test-props";

export function loader() {
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
  return (
    <div>
      <h1>Props 付きのマイルートへようこそ！</h1>
      <p>ローダーデータ: {JSON.stringify(loaderData)}</p>
      <p>アクションデータ: {JSON.stringify(actionData)}</p>
      <p>ルートパラメータ: {JSON.stringify(params)}</p>
      <p>一致したルート: {JSON.stringify(matches, null, 2)}</p>
    </div>
  );
}
