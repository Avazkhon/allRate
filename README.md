# allRate
### Сервис для ставок

## install
### clone

`git clone git@github.com:Avazkhon/allRate.git`

###  client

`cd client`
`npm install`
`npm start`
Зайти по адресу http://localhost:3000/

###  server

  Вам нужно получить доступ - получить файл password.js и положить в дериктори. /server/password.js
  
`cd server`
`npm install`
`npm start`

сервер работает по адресу http://localhost:8080/api/

## use docker-compose
#### Вам нужно получить доступ - получить файл password.js и положить в дериктори. /server/password.js
#### Положить сертификат 
#### /etc/ssl/facebetting.ru.crt
#### /etc/ssl/facebetting.ru.key

`docker-compose build`
`docker-compose up -d`
