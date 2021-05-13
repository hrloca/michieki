ARG BUILDER_BASE_PATH=/tmp/app

# --------------------------------------------------
FROM node:16.0.0-alpine as builder
ARG BUILDER_BASE_PATH

WORKDIR $BUILDER_BASE_PATH

COPY package.json package-lock.json ./
COPY ./bin ./bin

RUN npm install

COPY ./src ./src
COPY tsconfig.json ./

RUN npm run build

RUN npm install --only=prod

# --------------------------------------------------
FROM node:16.0.0-alpine as base
ARG BUILDER_BASE_PATH

WORKDIR /opt/app

COPY package.json package-lock.json ./
COPY ./bin ./bin
COPY --from=builder $BUILDER_BASE_PATH/node_modules ./node_modules
COPY --from=builder $BUILDER_BASE_PATH/dist ./dist

CMD ["npm", "run", "start"]
