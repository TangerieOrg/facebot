FROM node:18.3.0 AS build-env

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:18.3.0 AS run-env

WORKDIR /app

COPY --from=build-env /app/dist .

ENTRYPOINT [ "node", "index.js" ]