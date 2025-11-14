FROM node:24.11-alpine AS base

# Устанавливаем pnpm
RUN npm install -g pnpm

FROM base AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Устанавливаем ВСЕ зависимости (нужны dev для сборки)
RUN pnpm install

# Генерируем Prisma Client
RUN pnpm prisma generate

# Копируем и собираем приложение
COPY . .
RUN pnpm run build

# Финальный образ
FROM base AS runner

WORKDIR /app

# Копируем только production зависимости
COPY package.json ./
RUN pnpm install --prod

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["pnpm", "start"]