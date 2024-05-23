FROM node:16-alpine as angular
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build -c production

FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/dist/todo-front .