#syntax=docker/dockerfile:1.2

#
# Install dependencies
#
FROM node:20-alpine as deps

WORKDIR /app

#RUN apk --no-cache add git
RUN corepack enable npm

ARG NPM_REGISTRY_SERVER

ENV NPM_CONFIG_CACHE /npm-cache
COPY package*.json ./

RUN \
  if [ ! -z "${NPM_REGISTRY_SERVER}" ] ; then \
    echo "@kausal:registry=${NPM_REGISTRY_SERVER}" >> $HOME/.npmrc ; \
    echo "$(echo ${NPM_REGISTRY_SERVER} | sed -e 's/https://')/"':_authToken=${NPM_TOKEN}' >> $HOME/.npmrc ; \
    echo "Using custom registry at: ${NPM_REGISTRY_SERVER}" ; \
  fi


ARG NPM_TOKEN

RUN --mount=type=secret,id=NPM_TOKEN --mount=type=cache,target=/npm-cache \
  NPM_TOKEN=$( ([ -f /run/secrets/NPM_TOKEN ] && cat /run/secrets/NPM_TOKEN) || echo -n "${NPM_TOKEN}") \
    npm ci

#
# Build NextJS bundles
#
FROM node:20-alpine as builder

ENV NODE_ENV production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the files
COPY . .

# For Sentry source map upload
ARG SENTRY_PROJECT
ARG SENTRY_URL
ARG SENTRY_ORG
ARG SENTRY_AUTH_TOKEN
ARG GIT_REPO
ARG GIT_REV
ARG NEXTJS_ASSET_PREFIX
ENV NEXTJS_ASSET_PREFIX=${NEXTJS_ASSET_PREFIX}}
ENV NEXTJS_STANDALONE_BUILD=0

# Remove the NextJS build cache if packages change
RUN --mount=type=cache,target=/app/.next/cache \
  docker/manage-nextjs-cache.sh check

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN --mount=type=cache,target=/app/.next/cache \
  npm run build && docker/manage-nextjs-cache.sh save

FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV production

# Add nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# FIXME: disable this when we start using standalone builds
COPY --from=builder --chown=nextjs:nodejs /app ./

# FIXME: enable below when we start using standalone builds
# # Copy public assets
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# # Set the correct permission for prerender cache
# RUN mkdir .next && chown nextjs:nodejs .next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG BUILD_ID
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE=${SENTRY_RELEASE} BUILD_ID=${BUILD_ID}
LABEL nextjs_build_id="${BUILD_ID}"

COPY ./docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
