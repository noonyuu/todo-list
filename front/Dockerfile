FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

CMD ["pnpm", "dev"]
