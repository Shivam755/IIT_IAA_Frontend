FROM node:24-alpine3.21 

WORKDIR /frontend

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY entrypoint.sh /frontend/entrypoint.sh

RUN chmod +x /frontend/entrypoint.sh

COPY . .

EXPOSE 3000

ENTRYPOINT [ "/frontend/entrypoint.sh" ]