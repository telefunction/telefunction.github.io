# Development

## Configuration

Copy [`.env.example`](.env.example) to `.env`.

| Variable                   | Purpose                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `NUXT_PUBLIC_ORG_USERNAME` | GitHub organization to fetch (org only, not a personal account) |
| `NUXT_PUBLIC_SITE_URL`     | Canonical deployed URL                                          |
| `NUXT_GITHUB_TOKEN`        | Token for the build-time GitHub fetch                           |

In production these are set by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Scripts

| Command                | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `npm install`          | Install dependencies (runs `nuxt prepare`)              |
| `npm run dev`          | Start the dev server                                    |
| `npm run build`        | SSR-capable build (debugging only, not used for deploy) |
| `npm run generate`     | Static build → `.output/public` (used for deploy)       |
| `npm run preview`      | Preview the generated build                             |
| `npm run typecheck`    | Type-check only                                         |
| `npm run lint`         | Lint with ESLint                                        |
| `npm run lint:fix`     | Lint and auto-fix                                       |
| `npm run format`       | Format with Prettier                                    |
| `npm run format:check` | Check formatting without writing                        |
