FROM node:16-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD ["./vendor/bin/sail", "up"]
