FROM alpine

RUN apk update && apk add python g++ make nodejs 

COPY . /app/

COPY package.json /app/

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
