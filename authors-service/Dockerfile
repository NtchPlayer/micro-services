FROM node:lts-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY bdd.js bdd.js
COPY index.js index.js
CMD npm run start