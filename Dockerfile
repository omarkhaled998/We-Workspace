FROM node:10

WORKDIR /the/workdir/path

COPY packqge*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","app.js"]