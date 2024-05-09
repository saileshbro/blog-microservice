FROM node:21.7.3-alpine3.18
ENV CI=true
WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn","start"]
