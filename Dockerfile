FROM node:lts-slim

ARG PORT

WORKDIR /app

COPY package.json /app

RUN yarn

EXPOSE $PORT

COPY . /app

ENTRYPOINT : ['/bin/sh', '-c', 'yarn build && yarn start:prod']

