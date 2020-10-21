FROM node:12

WORKDIR /usr/src/app
VOLUME /usr/src/app/var/log
VOLUME /usr/src/app/var/image

COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

COPY . .

# EXPOSE 8080:8080
CMD [ "node", "./src/index.js" ]
