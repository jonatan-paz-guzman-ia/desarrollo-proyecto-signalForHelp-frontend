# --------------------------
# STAGE 1: Build
# --------------------------
FROM node:20-alpine AS build

# Definir directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero (para cache de dependencias)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del frontend
COPY . .

# Compilar la app para producción
RUN npm run build


# --------------------------
# STAGE 2: Run
# --------------------------
FROM nginx:alpine

# Eliminar configuración default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar el build generado al directorio que sirve Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar archivo de configuración de Nginx (opcional, si quieres rutas SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]