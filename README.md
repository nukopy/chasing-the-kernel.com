# Chasing the Kernel

## Environment

- mise 2026.7.18
- Node.js 24.x
- pnpm 10.x

## Setup

```bash
mise install
```

## Development

Install the dependencies.

```bash
pnpm install
```

Start the development server.

```bash
pnpm run dev
```

Build the site for production.

```bash
pnpm run build
```

Deploy the site to Cloudflare Workers.

```bash
pnpm run deploy
```

## Project structure

```txt
src/
├── components/    Shared UI components
├── content/blog/  Blog posts written in Markdown
├── layouts/       Shared layouts
├── pages/         Astro routes
└── styles/        Global styles
```
