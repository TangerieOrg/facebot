FROM node:18.3.0 AS build-env

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:18.3.0 AS run-env

WORKDIR /app

COPY --from=build-env /app/dist .
COPY --from=build-env /app/node_modules ./node_modules

ENTRYPOINT [ "node", "index.js" ]