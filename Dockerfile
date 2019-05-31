FROM node:latest AS build-env
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN cd /app && npm run build 
RUN ls

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/build ./

RUN cat /etc/nginx/conf.d/default.conf
EXPOSE 80