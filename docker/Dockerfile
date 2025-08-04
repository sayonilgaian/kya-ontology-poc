FROM --platform=linux/amd64 node:20.18.1-alpine 


WORKDIR /app

RUN npm install -g pnpm

COPY package.json /app/

RUN pnpm install

COPY . .

RUN pnpm run build

ENV PORT=8080
ENV VITE_PORT=8080

EXPOSE 8080

CMD ["pnpm", "preview", "--port", "8080", "--host"]
