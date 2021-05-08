FROM node:14

WORKDIR /usr/src/app

#COPY package*.json ./
COPY . ./

RUN npm install
RUN npm run build
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production


EXPOSE 3000:3000
EXPOSE 3001:3001
CMD [ "npm", "run", "start:prod" ]
