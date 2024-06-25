FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install

COPY next.config.js ./next.config.js

COPY pages ./pages
COPY public ./public
COPY styles ./styles

CMD [ "npm", "dev" ]