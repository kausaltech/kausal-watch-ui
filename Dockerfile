#syntax=docker/dockerfile:1.2

FROM node:15.5.1-buster as base

WORKDIR /app

# Install dependencies first
ENV YARN_CACHE_FOLDER /yarn-cache
RUN yarn set version berry
COPY .yarnrc.yml yarn.lock package*.json ./
RUN --mount=type=cache,target=/yarn-cache yarn install

COPY . .

FROM base as bundle
RUN yarn build

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
