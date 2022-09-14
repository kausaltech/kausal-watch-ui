# Kausal Watch Action Plan Monitoring UI

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

React UI for browsing and visualizing action plans. Built using [Next.js](https://nextjs.org).

* Displays data from [Kausal Watch API](https://github.com/kausaltech/kausal-watch)

## Development

#### Prerequisites

* [Node.js](https://nodejs.org/) 14.x
* [Yarn](https://yarnpkg.com/) berry
  
#### Getting Started

Clone the repository, install dependencies and run the development server locally:

    yarn set version berry
    yarn config set nodeLinker 'node-modules'
    yarn install
    yarn dev

Preview the application locally on http://localhost:3000/

#### Building the custom version of plotly.js

Clone the plotly.js GitHub repository and run the following commands:

    npm install
    npx change-package-name @kausal/plotly-custom
    npm run custom-bundle --unminified --traces scatter,icicle,pie
    npm publish --access public

## Building and deploying in production

To run the app in production:

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
