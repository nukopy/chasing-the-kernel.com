import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Chasing the Kernel" },
    { name: "description", content: "I'm chasing the kernel." },
  ];
}

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex gap-4 justify-center">
            <a href="/contents" className="btn btn-primary">
              Contents
            </a>
            <a href="/tags" className="btn btn-secondary">
              Tags
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
