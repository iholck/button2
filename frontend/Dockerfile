FROM node:slim
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY ./package*.json ./
COPY ./_helpers ./_helpers
COPY ./data ./data
COPY ./users ./users
COPY ./*.js ./
RUN npm ci --only=production

CMD [ "npm", "start" ]