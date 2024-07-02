FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 3003