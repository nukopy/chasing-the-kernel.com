# Chasing the Kernel

[![GitHub Actions workflow badge - CI][github-actions-badge-ci]][github-actions-url-ci]
[![GitHub Actions workflow badge - Deploy][github-actions-badge-deploy]][github-actions-url-deploy]

[github-actions-badge-ci]: https://github.com/nukopy/chasing-the-kernel.com/actions/workflows/ci.yml/badge.svg?branch=main
[github-actions-url-ci]: https://github.com/nukopy/chasing-the-kernel.com/actions/workflows/ci.yml?query=branch:main
[github-actions-badge-deploy]: https://github.com/nukopy/chasing-the-kernel.com/actions/workflows/deploy.yml/badge.svg?branch=main
[github-actions-url-deploy]: https://github.com/nukopy/chasing-the-kernel.com/actions/workflows/deploy.yml?query=branch:main

I'm chasing the kernel.

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm i
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Previewing the Production Build

Preview the production build locally:

```bash
pnpm run preview
```

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To build and deploy directly to production:

```sh
pnpm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```
