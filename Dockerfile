FROM node:21-alpine AS BUILD_IMAGE
RUN apk add --no-cache python3 g++ make

WORKDIR ./

COPY package.json yarn.lock ./
COPY . .
RUN apk --no-cache --virtual build-dependencies add \
  python3 \
  make \
  g++

RUN yarn install
EXPOSE 6000
CMD yarn serve
