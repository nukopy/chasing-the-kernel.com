import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  future: {
    unstable_viteEnvironmentApi: true,
    // enable middleware
    // ref: https://reactrouter.com/how-to/middleware
    unstable_middleware: true,
  },
} satisfies Config;
