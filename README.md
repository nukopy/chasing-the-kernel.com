# Chasing the Kernel

## Environment

- mise 2026.7.18
- Node.js 24.x
- pnpm 10.x
- (Optional) act 0.2.89
- (Optional) op (1password-cli) 2.38.1

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

## CI

Run workflows locally:

- Run `.github/workflows/deploy.yml`

```bash
make act-deploy
```
