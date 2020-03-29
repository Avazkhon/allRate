FROM node:10

WORKDIR /usr/src/app
VOLUME /usr/src/app/var/log

COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

COPY . .

# EXPOSE 3000:3000
CMD [ "npm", "start" ]
