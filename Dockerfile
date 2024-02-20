#syntax=docker/dockerfile:1.2

FROM node:20-alpine as base

RUN mkdir -p /app
WORKDIR /app

# Python is required for node-gyp, which will be built with `yarn install`
RUN apk --no-cache add g++ make python3 git

RUN corepack enable

ARG YARN_NPM_REGISTRY_SERVER
ARG YARN_NPM_AUTH_IDENT

ENV YARN_NPM_ALWAYS_AUTH=${YARN_NPM_AUTH_IDENT:+true}
ENV YARN_NPM_ALWAYS_AUTH=${YARN_NPM_ALWAYS_AUTH:-false}

# Install dependencies first
ENV YARN_CACHE_FOLDER /yarn-cache
COPY yarn.lock package*.json ./

RUN yarn config set nodeLinker 'node-modules'
RUN yarn config set logFilters --json '[{"code": "YN0013", "level": "discard"}]'

RUN --mount=type=cache,target=/yarn-cache yarn install --immutable

COPY . .

FROM base as bundle

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AUTH_ISSUER
ENV NEXT_PUBLIC_AUTH_ISSUER=$NEXT_PUBLIC_AUTH_ISSUER
ARG NEXT_PUBLIC_DEPLOYMENT_TYPE
ENV NEXT_PUBLIC_DEPLOYMENT_TYPE=$NEXT_PUBLIC_DEPLOYMENT_TYPE

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
