# --------------------------------------------------
FROM node:16.0.0-alpine as module

WORKDIR /opt/app

COPY package.json package-lock.json .

RUN npm install --prod

# --------------------------------------------------
FROM node:16.0.0-alpine as builder

WORKDIR /opt/app

COPY package.json package-lock.json .
COPY --from=module /opt/app/node_modules ./node_modules

RUN npm install

COPY bin ./bin
COPY src ./src
COPY .apirc .eslintignore .eslintrc.js .prettierrc.js jest.config.js package.json tsconfig.json .

RUN npm run build

# --------------------------------------------------
FROM node:16.0.0-alpine

WORKDIR /opt/app

COPY package.json package-lock.json .
COPY --from=module /opt/app/node_modules ./node_modules
COPY bin ./bin
COPY dist ./dist

CMD ["npm", "run", "start"]
