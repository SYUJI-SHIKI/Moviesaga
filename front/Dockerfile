FROM node:20.11.0

ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm run build

CMD ["npm", "run", "dev", "-p", "4000"]