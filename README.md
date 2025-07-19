# Kausal Watch Action Plan Monitoring UI

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

React UI for browsing and visualizing action plans. Built using [Next.js](https://nextjs.org).

- Displays data from [Kausal Watch API](https://github.com/kausaltech/kausal-watch)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 24.x

### Initial setup and subsequent updates

0. When cloning the repo, you should pass `--recurse-submodules` to the `git clone` invocation to ensure you also
   get the `kausal_common` submodule checked out. If you have a pre-existing clone, you can update the submodule with:

```bash
git submodule update --init
```

1. Install nvm if you don't have it yet.
2. Activate the right node version (you can do all steps from 2 to 5 to make sure that the update does not fail).

```bash
nvm use
```

3. Make sure the package manager version is controlled with corepack:

```bash
corepack enable
```

4. If you need access to the Kausal private themes:

```
npx verdaccio-openid@latest --registry https://npm.kausal.tech
npm config set @kausal-private:registry https://npm.kausal.tech
```

5. Install dependencies:

```bash
pnpm install
```

Make sure that your installation does not give errors about missing files. If it does, there is probably something wrong in step 4.

6. To run local development against a Kausal Watch backend, create an `.env` file with the following env variable set to the GraphQL API URL. Ask a teammate for this value.

```
WATCH_BACKEND_URL=
```

### End-to-end Testing

Before the first run, ensure the browsers Playwright needs are installed:

    node_modules/.bin/playwright install

Then add the plan identifiers you want to test to your `.env` file:

    TEST_PLAN_IDENTIFIERS=abcd,efgh,ijlk

To point tests to the specific environment use the following environment variable in `.env` file:

TEST_PAGE_BASE_URL=http://{planId}.localhost:3000

or

TEST_PAGE_BASE_URL=http://{planId}.watch.staging.kausal.tech

Now you should be able to run the test suite. You might want to start
either the development or the production server first. If you don't, the
test suite will start one for you (the dev server will be started if the
`TEST_DEVSERVER` env variable is set). You should be able to run the test
suite like this:

    node_modules/.bin/playwright test

### Building the custom version of plotly.js

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

### Debugging

Debug server side GraphQL queries by setting the `LOG_GRAPHQL_QUERIES=true` environment variable. This will log all outgoing queries and variables in your dev server console.

## Building and deploying in production

To run the app in production mode:

    npm ci
    npm run build
    npm start

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
