FROM node:21.6-alpine3.18
ENV CI=true
WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn","start"]
