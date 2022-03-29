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
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_AUTH_TOKEN
ARG GIT_REPO
ARG GIT_REV

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    yarn build

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    docker/sentry-set-release-commits.sh

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
