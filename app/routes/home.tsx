import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Chasing the Kernel" },
    { name: "description", content: "I'm chasing the kernel." },
  ];
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href="/contents"
            className="bg-blue-100 hover:bg-blue-200 text-black font-bold py-3 px-6 rounded-lg transition-colors border border-blue-300"
          >
            Contents
          </a>
          <a
            href="/tags"
            className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-lg transition-colors border border-gray-300"
          >
            Tags
          </a>
        </div>
      </div>
    </div>
  );
}
