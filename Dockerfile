#syntax=docker/dockerfile:1.2

FROM node:16.13.1-alpine3.14 as base

WORKDIR /app

# Python is required for node-gyp, which will be built with `yarn install`
RUN apk --no-cache add g++ make python3

# Install dependencies first
ENV YARN_CACHE_FOLDER /yarn-cache
RUN yarn set version 3.1.1
RUN yarn plugin import interactive-tools
COPY .yarnrc.yml yarn.lock package*.json ./
RUN --mount=type=cache,target=/yarn-cache yarn install

COPY . .

FROM base as bundle
# https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
