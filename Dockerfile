# stage 1

FROM node:alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run-script build

# stage 2

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=my-app-build /app/dist/website /usr/share/nginx/html/website
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
