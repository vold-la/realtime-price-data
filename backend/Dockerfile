FROM node:16.14.0-slim

WORKDIR /home/node/www

RUN chown -R node:node /home/node/www

RUN apt-get install -y apt-transport-https
RUN apt-get -y update
RUN apt-get -y install git curl unzip build-essential

WORKDIR /opt/www

ENV DB_URI "mongodb+srv://voldla:Qwerty%401@tst.ouvw5.mongodb.net/test?retryWrites=true&w=majority"
ENV API_KEY_1 "0ba5c05f-aec5-4146-b18e-bd41a2e51235"
ENV PORT 4005

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4005

CMD ["node", "dist/index.js"]