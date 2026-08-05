# Contributing

Glad you're interested in contributing to this repository!

## Setup Workflow

Copy [`.env.example`](.env.example) to `.env`.

| Variable                   | Purpose                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `NUXT_PUBLIC_ORG_USERNAME` | GitHub organization to fetch (org only, not a personal account) |
| `NUXT_PUBLIC_SITE_URL`     | Canonical deployed URL                                          |
| `NUXT_GITHUB_TOKEN`        | Token for the build-time GitHub fetch                           |

In production these are set by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

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

## Schema Workflow

`app/` holds the Nuxt application: `components/` (grouped into `icons/`, `layout/`, `sections/`, `ui/`), `composables/` for shared reactive logic, `config/` for site copy and theme constants, `layouts/` and `pages/` for routing, and `utils/` for pure formatting helpers. `server/api/` exposes the single build-time endpoint that fetches org/repo data from GitHub. `shared/types/` holds the types that endpoint and the app both depend on.

## Contribution Workflow

Branch off `main`, commit using [Conventional Commits](https://www.conventionalcommits.org/), and open a PR.
