FROM node:20-alpine as builder

ENV NODE_ENV build

WORKDIR /app/backend

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

# ---

FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app/backend

COPY --from=builder --chown=node:node /app/backend/package*.json ./
COPY --from=builder --chown=node:node /app/backend/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/backend/dist/ ./dist/

CMD ["node", "dist/server.js"]
