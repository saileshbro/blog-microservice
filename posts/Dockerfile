FROM node:21.6-alpine3.18
WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn","start"]
