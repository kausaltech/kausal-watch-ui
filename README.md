# Kausal Watch Action Plan Monitoring UI

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

React UI for browsing and visualizing action plans. Built using [Next.js](https://nextjs.org).

- Displays data from [Kausal Watch API](https://github.com/kausaltech/kausal-watch)

## Development

#### Prerequisites

- [Node.js](https://nodejs.org/) 18.x
- [Yarn](https://yarnpkg.com/) 3.2.1

#### Getting Started

Clone the repository, install dependencies and run the development server locally:

    yarn set version 3.2.1
    yarn config set nodeLinker 'node-modules'
    yarn install
    yarn dev

Preview the application locally on http://localhost:3000/

#### Environment variables

Define the following variables in `.env` if you need to override them for local development.
Variables prefixed with `NEXT_PUBLIC_` are build-time variables, which are available in client components. When using environment variables in client-side code, import them from `@/common/environment` to support fallbacks.

- `NEXT_PUBLIC_API_URL` (previously APLANS_API_BASE_URL): Configure a custom API URL, e.g. staging or a local backend.
- `NEXT_PUBLIC_DEPLOYMENT_TYPE`: Change the deployment type, e.g. `staging` or `production`.

#### End-to-end testing

Before the first run, ensure the browsers Playwright needs are installed:

    node_modules/.bin/playwright install

Then add the plan identifiers you want to test to your `.env` file:

    TEST_PLAN_IDENTIFIERS=abcd,efgh,ijlk

To point tests to the specific environment use the following environment variable in `.env` file:

TEST_PAGE_BASE_URL=http://{planId}.localhost:3000

or

TEST_PAGE_BASE_URL=http://{planId}.watch.staging.kausal.tech

Now you should be able to run the test suite. You might want to start the
either the development or production server first. If you don't, the
test suite will start one for you (the dev server will be started if the
`TEST_DEVSERVER` env variable is set). You should be able to run the test
suite like this:

    node_modules/.bin/playwright test

#### Building the custom version of plotly.js

If you need to add new plot types, or update to the upstream version of plotly.js,
clone the [plotly.js GitHub repository](https://github.com/plotly/plotly.js) and
run the following commands:

    npm install
    npx change-package-name @kausal/plotly-custom
    npm run empty-dist && npm run locales && npm run bundle && npm run schema dist
    TRACES=scatter,icicle,pie,bar
    npm run custom-bundle -- --unminified --traces ${TRACES}
    npm run custom-bundle -- --traces ${TRACES}
    npm publish --access public

## Building and deploying in production

To run the app in production mode:

    yarn install
    yarn build
    yarn start

## Maintainers

Kausal Watch is developed and maintained by [Kausal Oy](https://kausal.tech/).

## Acknowledgements

Kausal Watch is an open-source service based on [Helsinki Climate Watch](https://github.com/City-of-Helsinki/cnh-ui), a service developed by the City of Helsinki. Helsinki Climate Watch has received funding from the European Union EIT Climate-KIC programme.

## Forking

City of Helsinki would like to request that when this source code is forked and deployed to production use for another organization, the following phrases mwould be added to the FAQ or similar section of the user-visible UI, as well as to the public presentations or other materials presenting the new service:

> [Name of the service] is an open-source service based on [Helsinki Climate Watch](https://github.com/City-of-Helsinki/cnh-ui), a service developed by the City of Helsinki. Helsinki Climate Watch has received funding from the European Union EIT Climate-KIC programme.

Or in Finnish:

> Palvelu on avointa lähdekoodia ja perustuu alun perin Helsingin kaupungin kehittämään [Helsingin ilmastovahti -palveluun](https://github.com/City-of-Helsinki/cnh-ui). Helsingin ilmastovahti on saanut tukea EU:n Climate-KIC-ohjelmasta.

## Good to know

- If you're using VSCode, install the Apollo GraphQL extension for GQL query autocompletion and deprecation warnings
