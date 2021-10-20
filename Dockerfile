# syntax=docker/dockerfile:1

FROM node:14.0.0

COPY ["package.json", "package-lock.json*", "./"]

WORKDIR /POLKADOT-API-server-Hapi-B

COPY . .

RUN npm install

CMD [ "node", "server.js" ]