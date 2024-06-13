FROM node:20.11.0

ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json yarn.lock /app/
COPY package-lock.json ./

RUN npm install

COPY . /app

RUN npm run build

CMD ["npm", "dev", "-p", "4000"]