FROM node:latest
WORKDIR /usr/src/app


COPY ./package*.json ./
COPY ./helpers ./helpers

RUN npm ci --only=production

COPY ./*.js ./

CMD [ "npm", "start" ]