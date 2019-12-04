from node:10

WORKDIR /the/workdir/path

COPY packqge*.json ./

run npm install

copy . .

EXPOSE 3000

cmd ["node","app.js"]