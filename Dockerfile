#syntax=docker/dockerfile:1.2

FROM node:17.2.0-alpine3.14 as base

WORKDIR /app

# Python is required for node-gyp, which will be built with `yarn install`
RUN apk --no-cache add g++ make python3 git

# Install dependencies first
ENV YARN_CACHE_FOLDER /yarn-cache
RUN yarn set version 3.1.1
RUN yarn plugin import interactive-tools
COPY .yarnrc.yml yarn.lock package*.json ./
COPY patches ./patches/
RUN --mount=type=cache,target=/yarn-cache yarn install

COPY . .

FROM base as bundle

# For Sentry source map upload
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_URL
ARG SENTRY_ORG

RUN yarn build
RUN if [ ! -z "$SENTRY_ORG" -a -d ".git" ] ; then node_modules/.bin/sentry-cli releases set-commits --ignore-missing $(cat .next/BUILD_ID) ; fi

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
