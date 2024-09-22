FROM node:16.15-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm install

COPY . ./

RUN cp .env_example .env

EXPOSE 3000

CMD ["npm", "run", "dev"]
