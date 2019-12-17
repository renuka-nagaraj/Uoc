FROM node:alpine as builder

RUN apk update && apk add --no-cache

WORKDIR /app

COPY package.json package-lock.json /app/
RUN cd /app && npm set progress=false && npm install -g @angular/cli && npm install

COPY .  /app

RUN cd /app && ng build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]