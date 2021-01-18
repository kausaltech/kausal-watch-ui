FROM node:current-alpine as base

WORKDIR /app
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python2
COPY package*.json ./
RUN yarn install
COPY . .

FROM base as bundle
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["/app/docker/entrypoint.sh"]
