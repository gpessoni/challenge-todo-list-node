FROM node:16.15-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm install

COPY . ./

RUN cp .env_example .env

RUN npx prisma migrate dev

EXPOSE 8080

CMD ["npm", "run", "dev"]
