FROM node:latest
WORKDIR /usr/src/app


COPY ./importer/package*.json ./
COPY ./helpers ./

RUN npm ci --only=production

COPY ./importer/*.js ./

CMD [ "npm", "start" ]