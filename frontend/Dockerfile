FROM node:lts
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci
RUN npm install -g serve
RUN npm run build
CMD "serve" "-s" "build"