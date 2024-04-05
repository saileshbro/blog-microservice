FROM node:21.7.2-alpine3.18
ENV CI=true
WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./
CMD ["yarn","start"]
