FROM node:current-alpine

WORKDIR /app
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python2
COPY package*.json ./
RUN yarn install
COPY . .

RUN yarn build

EXPOSE 3000
ENTRYPOINT ["/app/docker/entrypoint.sh"]
