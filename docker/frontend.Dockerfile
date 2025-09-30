# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /frontend

# Install dependencies.
COPY frontend/package*.json ./
RUN npm ci

# Copy application source and build the production bundle.
COPY frontend .
RUN npm run build

FROM nginx:1.25-alpine AS runtime

# Copy the static build output into the Nginx html directory.
COPY --from=build /frontend/dist /usr/share/nginx/html

# Provide a default Nginx configuration suitable for SPAs.
COPY <<'NGINX_CONF' /etc/nginx/conf.d/default.conf
server {
    listen       80;
    server_name  _;

    root   /usr/share/nginx/html;
    index  index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    access_log /var/log/nginx/frontend_access.log;
    error_log  /var/log/nginx/frontend_error.log warn;
}
NGINX_CONF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
