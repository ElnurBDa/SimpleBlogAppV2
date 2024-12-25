# Stage 1
FROM docker.io/node:23-alpine AS builder

WORKDIR /app

ARG REACT_APP_BACK_API  

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "{\"apiUrl\": \"${REACT_APP_BACK_API}\"}" > public/config.json

RUN npm run build

# Stage 2
FROM docker.io/nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

