# 依存関係のインストール用ステージ
FROM node:22-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ビルド用ステージ
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build

# 本番環境用ステージ
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]