FROM node:slim
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY ./package*.json ./
COPY ./helpers ./helpers
COPY ./data ./data

RUN npm ci --only=production

COPY ./*.js ./

CMD [ "npm", "start" ]