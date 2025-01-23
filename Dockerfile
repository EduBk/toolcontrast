ARG NODE_VERSION=22.12.0

# Etapa de construcción
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
# Copiar archivos de configuración
COPY package*.json ./

# Etapa de desarrollo
FROM base AS dev
# Instalar dependencias
RUN npm install
# Copiar código fuente
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Etapa de construcción para producción
FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

# Etapa final de producción
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]