FROM node:12.16.3-alpine

RUN mkdir -p /home/node/app/node_modules /home/node/app/logs && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
