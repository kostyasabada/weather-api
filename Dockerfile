FROM node:20.15.1-alpine3.19

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .