# CLAUDE.md

This file provides guidance to LLM agents when working with this codebase.

## Project Overview

**Kausal Watch UI** is a Next.js-based React web application for publishing, tracking, and visualizing municipal climate and sustainability action plans. It serves as the front-end for a multi-tenant SaaS platform that helps cities and organizations monitor environmental and sustainability goals.

**Key Features:**

- Action plan and indicator visualization dashboards
- Interactive charts (Plotly, ECharts), maps (Mapbox), and graph visualizations (Cytoscape)
- Multi-tenant architecture with hostname-based plan resolution
- Internationalization supporting 15+ languages
- GraphQL data layer with Apollo Client
- Embeddable widgets for external portals
- Data export to CSV/Excel

## Tech Stack

- **Framework:** Next.js 15 with App Router, React 19
- **Language:** TypeScript 5.8 (strict mode)
- **Styling:** styled-components 6, Bootstrap 5, reactstrap
- **Data:** Apollo Client 3, GraphQL with code generation
- **i18n:** next-intl
- **Auth:** next-auth 5 (beta)
- **Testing:** Jest, @testing-library/react, Playwright (e2e)
- **Observability:** Sentry, OpenTelemetry, Pino logging

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server (localhost:3000)
pnpm dev:inspect            # Dev with Node inspector

# Build & Production
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm clean                  # Remove .next build directory

# Code Quality
pnpm typecheck              # TypeScript type checking
pnpm lint                   # ESLint
pnpm prettier:fix           # Format code with Prettier

# Testing
pnpm test                   # Run Jest unit tests
cd e2e-tests && pnpm test   # Run Playwright e2e tests

# Code Generation
pnpm graphql-codegen        # Generate TypeScript types from GraphQL schema

# Storybook
pnpm storybook              # Start Storybook dev server
pnpm build-storybook        # Build static Storybook
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (auth, graphql proxy, health)
│   └── root/               # Main pages with [domain]/[lang]/[plan] routing
├── components/             # React components organized by feature
│   ├── actions/            # Action-related components
│   ├── indicators/         # Indicator display components
│   ├── contentblocks/      # Rich content block rendering
│   ├── paths/              # Custom path/narrative components
│   ├── dashboard/          # Dashboard cells and layouts
│   ├── graphs/             # Chart and visualization components
│   └── common/             # Shared/reusable components
├── common/                 # Shared utilities
│   ├── __generated__/      # GraphQL-generated types
│   └── hooks/              # Custom React hooks
├── context/                # React Context providers
├── queries/                # GraphQL query definitions
├── fragments/              # GraphQL fragments
├── utils/                  # Utility functions
└── styles/                 # Global and theme styles

kausal_common/              # Shared monorepo package (git submodule)
├── src/
│   ├── apollo/             # Apollo/GraphQL utilities
│   ├── auth/               # Authentication logic
│   ├── themes/             # Theme system
│   └── env/                # Environment variable management
└── configs/                # Shared ESLint, Prettier, TypeScript configs

e2e-tests/                  # Playwright end-to-end tests
locales/                    # Translation files (15+ languages)
```

## Path Aliases

```typescript
import { ... } from '@/components/...'      // → src/
import { ... } from '@common/...'           // → kausal_common/src/
import { ... } from '@/public/...'          // → public/
```

## Architecture Patterns

### Component Organization

- Feature-based folders under `src/components/`
- Client components use `'use client'` directive
- Server components for data fetching and static content

### GraphQL

- Queries defined in `src/queries/` with fragments in `src/fragments/`
- Types auto-generated via `pnpm graphql-codegen` into `src/common/__generated__/`
- Apollo Client configured in `kausal_common/src/apollo/`

### Routing

- Multi-tenant: Routes are `[domain]/[lang]/[plan]/...`
- Middleware resolves hostname → plan configuration
- Locale detection and redirects handled in middleware

### Styling

- Use styled-components for component styling
- Theme context available via Kausal themes package
- Bootstrap utilities for layout/spacing

### Internationalization

- Translation files in `locales/{language}.json`
- Use `next-intl` hooks and components
- Fallback chain: locale → base language → English

## Environment Variables

Key environment variables (see `.env` for full list):

- `WATCH_BACKEND_URL` - GraphQL API backend URL
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` - Authentication config
- `SENTRY_DSN` - Error tracking
- `LOG_GRAPHQL_QUERIES=true` - Debug GraphQL queries
- `DEPLOYMENT_TYPE` - Environment identifier

## Testing

### Unit Tests

- Location: `**/tests/*.test.ts` or `**/__tests__/*.test.ts`
- Run: `pnpm test`
- Use @testing-library/react for component tests

### E2E Tests

- Location: `e2e-tests/tests/`
- Run: `cd e2e-tests && pnpm test`
- Uses Playwright with Chromium, Firefox, WebKit

## Git Submodule

The `kausal_common/` directory is a git submodule containing shared code. After cloning:

```bash
git submodule update --init --recursive
```

## Code Conventions

- **Components:** PascalCase (`Header.tsx`)
- **Hooks:** `use` prefix (`usePlan`, `useCookie`)
- **Utilities:** camelCase (`middleware.utils.ts`)
- **GraphQL files:** kebab-case (`get-plan.ts`)
- **Generated code:** Never edit files in `__generated__/` directories

## Common Tasks

### Adding a new component

1. Create in appropriate feature folder under `src/components/`
2. Use `'use client'` if component needs interactivity
3. Add Storybook story in `src/stories/` if applicable

### Adding a GraphQL query

1. Define query in `src/queries/`
2. Run `pnpm graphql-codegen` to generate types
3. Use generated hooks/types in components

### Adding translations

1. Add keys to `locales/en.json` first
2. Add translations to other language files
3. Use `useTranslations` hook in components

## Debugging

- **GraphQL:** Set `LOG_GRAPHQL_QUERIES=true`
- **Node debugging:** `pnpm dev:inspect` then attach debugger
- **Apollo DevTools:** Install browser extension for cache inspection
