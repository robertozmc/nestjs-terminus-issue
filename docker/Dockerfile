# syntax = docker/dockerfile:1.0-experimental

##########
#        #
#  test  #
#        #
##########

FROM node:16-alpine AS test

ENV NODE_ENV=test

RUN npm config set update-notifier false

COPY app/package.json /app/package.json

WORKDIR /app
RUN npm i

COPY app /app

ENTRYPOINT [ "npm", "run", "test" ]
